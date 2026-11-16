"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FieldError, Input, Label, ListBox, Select, Skeleton, TextArea, TextField } from "@heroui/react";
import { Loader2, Lock, MapPin, Truck } from "lucide-react";
import { toast } from "sonner";
import { checkoutSchema, type CheckoutValues } from "@/lib/checkout-schema";
import { deliveryAreas } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { initiatePayment } from "@/lib/payments";
import { saveOrder } from "@/lib/orders";
import { useCart, cartSubtotal } from "@/store/cart";
import { useCartHydrated } from "@/components/cart/use-cart-hydrated";
import { EmptyBag } from "@/components/shared/empty-bag";
import { OrderTotals } from "@/components/shared/order-totals";
import { Radio, RadioGroup } from "@heroui/react";
import { cn } from "@/lib/utils";
import type { CartItem, Order } from "@/types";

function SummaryItems({ items }: { items: CartItem[] }) {
  return (
    <div className="divide-y divide-line">
      {items.map(item => (
        <div key={item.key} className="flex items-center gap-4 py-4 first:pt-0">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-soft">
            <Image src={item.image} alt={item.name} fill preload={false} sizes="56px" className="object-cover" />
            <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-white">
              {item.quantity}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{item.name}</p>
            <p className="mt-0.5 text-xs text-ink-soft">{item.color} · {item.size}</p>
          </div>
          <p className="text-sm tabular-nums text-ink">{formatPrice(item.price * item.quantity)}</p>
        </div>
      ))}
    </div>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const hydrated = useCartHydrated();
  const items = useCart(s => s.items);
  const clear = useCart(s => s.clear);
  const [processing, setProcessing] = useState(false);
  const subtotal = cartSubtotal(items);

  const { register, handleSubmit, control, formState: { errors } } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { fullName: "", phone: "", email: "", method: "delivery", address: "", area: "", notes: "" },
    mode: "onTouched",
    shouldFocusError: true,
  });
  const [method = "delivery", area] = useWatch({ control, name: ["method", "area"] });

  const areaFee = deliveryAreas.find(a => a.name === area)?.fee ?? 0;
  const fee = method === "pickup" ? 0 : areaFee;
  const total = subtotal + fee;
  const needsArea = method === "delivery" && !area;

  async function onSubmit(values: CheckoutValues) {
    setProcessing(true);
    const order: Order = {
      id: "pending",
      items,
      subtotal,
      deliveryFee: fee,
      total,
      customer: {
        name: values.fullName.trim(),
        phone: values.phone.replace(/[\s-]/g, ""),
        email: values.email?.trim() || undefined,
      },
      delivery: {
        method: values.method,
        ...(values.method === "delivery"
          ? { address: values.address?.trim(), area: values.area, notes: values.notes?.trim() || undefined }
          : {}),
      },
    };
    try {
      // The mock payment boundary lives in lib/payments.ts. Replace it with Paystack there.
      const result = await initiatePayment(order);
      if (!result.success) throw new Error("Payment could not be started.");
      const confirmed = { ...order, id: result.reference };
      saveOrder(confirmed);
      // Navigate first, then clear — clearing before the route change would
      // flash the empty-bag state while the confirmation page loads.
      await router.push(`/orders/${confirmed.id}?placed=1`);
      clear();
    } catch {
      setProcessing(false);
      toast.error("We couldn’t start the payment", {
        description: "Please check your connection and try again.",
      });
    }
  }

  if (!hydrated) {
    return (
      <div className="container-shell flex-1 pb-20 pt-10 sm:pt-14">
        <div className="mx-auto max-w-[680px]">
          <Skeleton className="h-10 w-44 rounded-xl bg-soft" />
          <Skeleton className="mt-8 h-44 w-full rounded-2xl bg-soft" />
          <Skeleton className="mt-10 h-7 w-28 rounded-xl bg-soft" />
          <Skeleton className="mt-5 h-12 w-full rounded-xl bg-soft" />
          <Skeleton className="mt-4 h-12 w-full rounded-xl bg-soft" />
          <Skeleton className="mt-4 h-12 w-full rounded-xl bg-soft" />
        </div>
      </div>
    );
  }

  if (!items.length) {
    // Mid-submit: the cart was just cleared and the confirmation page is
    // loading — show progress, never an empty-bag state.
    if (processing) {
      return (
        <div className="container-shell flex flex-1 flex-col items-center justify-center py-24">
          <Loader2 className="size-6 animate-spin text-ink-faint" aria-hidden />
          <p className="mt-4 text-sm text-ink-soft">Placing your order…</p>
        </div>
      );
    }
    return (
      <div className="container-shell flex flex-1 flex-col py-16">
        <h1 className="sr-only">Checkout</h1>
        <div className="rounded-2xl border border-line bg-white">
          <EmptyBag />
        </div>
      </div>
    );
  }

  return (
    <div className="container-shell flex-1 pb-20 pt-10 sm:pt-14">
      <div className="mx-auto max-w-[680px]">
        <h1 className="display text-[32px] text-ink sm:text-[40px]">Checkout</h1>

        <section aria-label="Order summary" className="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-6">
          <SummaryItems items={items} />
          <div className="mt-1 border-t border-line pt-4">
            <OrderTotals
              subtotal={subtotal}
              fee={fee}
              feeNote={needsArea ? "Choose your area" : undefined}
              total={total}
            />
          </div>
        </section>

        <form
          id="checkout-form"
          onSubmit={handleSubmit(onSubmit, () =>
            toast.error("A few details need attention", { description: "Please check the highlighted fields." })
          )}
          noValidate
          aria-busy={processing}
        >
          <section aria-labelledby="contact-heading" className="mt-12">
            <h2 id="contact-heading" className="text-[19px] font-semibold tracking-[-0.01em] text-ink">Contact</h2>
            <div className="mt-5 grid gap-x-4 gap-y-5 sm:grid-cols-2">
              <TextField isInvalid={!!errors.fullName} className="grid gap-1.5">
                <Label className="text-[13px] font-medium text-ink">Full name</Label>
                <Input id="fullName" autoComplete="name" placeholder="Ama Mensah" {...register("fullName")} />
                <FieldError className="text-xs text-danger">{errors.fullName?.message}</FieldError>
              </TextField>
              <TextField isInvalid={!!errors.phone} className="grid gap-1.5">
                <Label className="text-[13px] font-medium text-ink">Phone</Label>
                <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="024 123 4567" {...register("phone")} />
                <FieldError className="text-xs text-danger">{errors.phone?.message}</FieldError>
              </TextField>
              <TextField isInvalid={!!errors.email} className="grid gap-1.5 sm:col-span-2">
                <Label className="text-[13px] font-medium text-ink">
                  Email <span className="font-normal text-ink-faint">(optional)</span>
                </Label>
                <Input id="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" {...register("email")} />
                <FieldError className="text-xs text-danger">{errors.email?.message}</FieldError>
              </TextField>
            </div>
          </section>

          <section aria-labelledby="delivery-heading" className="mt-12">
            <h2 id="delivery-heading" className="text-[19px] font-semibold tracking-[-0.01em] text-ink">Delivery</h2>
            <Controller
              control={control}
              name="method"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onChange={field.onChange}
                  aria-label="Choose delivery method"
                  className="mt-5 grid gap-3"
                >
                  <Radio
                    value="delivery"
                    className={cn(
                      "block rounded-2xl border bg-white transition-colors",
                      field.value === "delivery" ? "border-ink" : "border-line hover:border-ink/40"
                    )}
                  >
                    <Radio.Content className="relative flex w-full items-center p-4 pr-12">
                      <span className="flex items-center gap-3">
                        <Truck className="size-[18px] shrink-0 stroke-[1.5] text-ink-soft" aria-hidden />
                        <span>
                          <span className="block text-sm font-medium text-ink">Deliver to me</span>
                          <span className="block text-xs text-ink-soft">Accra · 1–2 working days · GH₵ 25–50</span>
                        </span>
                      </span>
                      <Radio.Control className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Radio.Indicator />
                      </Radio.Control>
                    </Radio.Content>
                  </Radio>
                  <Radio
                    value="pickup"
                    className={cn(
                      "block rounded-2xl border bg-white transition-colors",
                      field.value === "pickup" ? "border-ink" : "border-line hover:border-ink/40"
                    )}
                  >
                    <Radio.Content className="relative flex w-full items-center p-4 pr-12">
                      <span className="flex items-center gap-3">
                        <MapPin className="size-[18px] shrink-0 stroke-[1.5] text-ink-soft" aria-hidden />
                        <span>
                          <span className="block text-sm font-medium text-ink">Pick up in Osu</span>
                          <span className="block text-xs text-ink-soft">Free · by arrangement</span>
                        </span>
                      </span>
                      <Radio.Control className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Radio.Indicator />
                      </Radio.Control>
                    </Radio.Content>
                  </Radio>
                </RadioGroup>
              )}
            />

            {method === "delivery" ? (
              <div className="mt-5 grid gap-x-4 gap-y-5">
                <TextField isInvalid={!!errors.address} className="grid gap-1.5">
                  <Label className="text-[13px] font-medium text-ink">Delivery address</Label>
                  <Input
                    id="address"
                    autoComplete="street-address"
                    placeholder="Street, building, apartment"
                    {...register("address")}
                  />
                  <FieldError className="text-xs text-danger">{errors.address?.message}</FieldError>
                </TextField>
                <div className="grid gap-1.5">
                  <Label htmlFor="area" className="text-[13px] font-medium text-ink">Area / neighbourhood</Label>
                  <Controller
                    control={control}
                    name="area"
                    render={({ field }) => (
                      <Select
                        isInvalid={!!errors.area}
                        aria-label="Area / neighbourhood"
                        selectedKey={field.value || null}
                        onSelectionChange={key => field.onChange(key == null ? "" : String(key))}
                        placeholder="Choose your area"
                      >
                        <Select.Trigger id="area" className="h-12 w-full">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {deliveryAreas.map(a => (
                              <ListBox.Item key={a.name} id={a.name} textValue={`${a.name} · ${formatPrice(a.fee)}`}>
                                {a.name} · {formatPrice(a.fee)}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    )}
                  />
                  {errors.area && <FieldError className="text-xs text-danger">{errors.area.message}</FieldError>}
                </div>
                <TextField isInvalid={!!errors.notes} className="grid gap-1.5">
                  <Label className="text-[13px] font-medium text-ink">
                    Landmark or notes <span className="font-normal text-ink-faint">(optional)</span>
                  </Label>
                  <TextArea
                    id="notes"
                    rows={2}
                    autoComplete="off"
                    placeholder="Near the blue kiosk, opposite the pharmacy…"
                    {...register("notes")}
                  />
                  <p className="text-xs text-ink-faint">A landmark helps our rider find you faster.</p>
                  <FieldError className="text-xs text-danger">{errors.notes?.message}</FieldError>
                </TextField>
              </div>
            ) : (
              <div className="mt-5 flex gap-3 rounded-2xl border border-line bg-white p-4">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ink-soft" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-ink">Pickup in Osu</p>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">
                    We’ll message you after checkout to arrange a time and share the exact location.
                  </p>
                </div>
              </div>
            )}
          </section>

          <Button
            type="submit"
            form="checkout-form"
            isDisabled={processing}
            className="mt-12 h-12 w-full text-[15px]"
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" /> Processing…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="size-4" /> Pay {formatPrice(total)}
              </span>
            )}
          </Button>
          <p className="mt-3 text-center text-xs text-ink-faint">
            Paystack · Card or Mobile Money · Demo checkout, no charge
          </p>
        </form>
      </div>
    </div>
  );
}
