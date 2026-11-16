"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@heroui/react";
import { useBagUI, useCart, cartSubtotal, cartCount } from "@/store/cart";
import { ResponsivePanel } from "@/components/shared/responsive-panel";
import { EmptyBag } from "@/components/shared/empty-bag";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { buttonClass } from "@/lib/button-class";
import { formatPrice } from "@/lib/format";

export function CartPanel() {
  const open = useBagUI(s => s.open);
  const setOpen = useBagUI(s => s.setOpen);
  const items = useCart(s => s.items);
  const remove = useCart(s => s.remove);
  const updateQuantity = useCart(s => s.updateQuantity);

  return (
    <ResponsivePanel
      open={open}
      onOpenChange={setOpen}
      title="Your bag"
      description={items.length ? `${cartCount(items)} ${cartCount(items) === 1 ? "item" : "items"}` : "Nothing here yet"}
    >
      {items.length === 0 ? (
        <EmptyBag onBrowse={() => setOpen(false)} />
      ) : (
        <>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 md:px-6">
            {items.map(item => (
              <article key={item.key} className="flex gap-4 border-b border-line py-5 last:border-0">
                <Link
                  href={`/product/${item.slug}`}
                  onClick={() => setOpen(false)}
                  className="tint-media relative size-24 shrink-0 overflow-hidden rounded-2xl"
                  style={{ "--tint": item.tint } as React.CSSProperties}
                  aria-label={`View ${item.name}`}
                >
                  <Image src={item.image} alt={item.name} data-studio fill preload={false} sizes="96px" className="object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-[15px] font-medium leading-6 text-ink transition-opacity hover:opacity-70"
                    >
                      {item.name}
                    </Link>
                    <p className="shrink-0 text-[15px] tabular-nums text-ink">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <p className="mt-1 text-[13px] text-ink-soft">{item.color} · {item.size}</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <QuantityStepper
                      value={item.quantity}
                      max={item.maxStock}
                      onChange={n => updateQuantity(item.key, n)}
                      label={item.name}
                    />
                    <Button
                      variant="ghost"
                      isIconOnly
                      className="text-ink-soft"
                      onPress={() => remove(item.key)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="safe-bottom shrink-0 border-t border-line bg-white px-5 pt-4 md:px-6">
            <div className="flex justify-between text-[15px] font-medium">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatPrice(cartSubtotal(items))}</span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">Delivery calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className={buttonClass({ className: "mt-4 w-full justify-between px-5" })}
            >
              Check out <ArrowRight className="size-4" />
            </Link>
          </div>
        </>
      )}
    </ResponsivePanel>
  );
}
