"use client";
import Link from "next/link";
import { Lock, Truck } from "lucide-react";
import { toast } from "sonner";
import { useBagUI, useCart, cartSubtotal, cartCount } from "@/store/cart";
import { ResponsivePanel } from "@/components/shared/responsive-panel";
import { EmptyBag } from "@/components/shared/empty-bag";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { ProductThumb } from "@/components/shared/product-thumb";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { buttonClass } from "@/lib/button-class";
import { formatPrice } from "@/lib/format";
import { minDeliveryFee, whatsappHref } from "@/lib/config";
import type { CartItem } from "@/types";

function variantLine(item: CartItem) {
  return [item.color, item.size !== "One size" ? `Size ${item.size}` : null].filter(Boolean).join(" · ");
}

function whatsappOrder(items: CartItem[]) {
  const lines = items.map(i => `• ${i.name} (${variantLine(i)}) × ${i.quantity}: ${formatPrice(i.price * i.quantity)}`);
  return whatsappHref(`Hi Fashion Tap Boutik, I'd like to order:\n${lines.join("\n")}\nSubtotal: ${formatPrice(cartSubtotal(items))}`);
}

export function CartPanel() {
  const open = useBagUI(s => s.open);
  const setOpen = useBagUI(s => s.setOpen);
  const items = useCart(s => s.items);
  const remove = useCart(s => s.remove);
  const restore = useCart(s => s.restore);
  const updateQuantity = useCart(s => s.updateQuantity);
  const count = cartCount(items);
  const subtotal = cartSubtotal(items);

  function onRemove(item: CartItem) {
    const index = items.findIndex(i => i.key === item.key);
    remove(item.key);
    toast(`Removed ${item.name}`, { action: { label: "Undo", onClick: () => restore(item, index) } });
  }

  const footer = items.length ? (
    <div className="safe-bottom shrink-0 border-t border-line bg-white px-5 pt-4 md:px-6">
      <div className="flex items-baseline justify-between">
        <span className="text-[15px] text-ink-soft">Subtotal</span>
        <span className="text-[20px] font-semibold tracking-[-0.01em] tabular-nums text-ink">{formatPrice(subtotal)}</span>
      </div>
      <p className="mt-1 text-[13px] text-ink-soft">Delivery from {formatPrice(minDeliveryFee)}, calculated at checkout.</p>
      <Link href="/checkout" onClick={() => setOpen(false)} className={buttonClass({ size: "lg", caps: true, className: "mt-4 w-full" })}>
        <Lock className="size-4" aria-hidden /> Checkout
      </Link>
      <a
        href={whatsappOrder(items)}
        target="_blank"
        rel="noreferrer"
        className={buttonClass({ variant: "outline", className: "mt-2.5 w-full" })}
      >
        <WhatsAppIcon className="size-[18px] text-[#25d366]" /> Order on WhatsApp
      </a>
    </div>
  ) : null;

  return (
    <ResponsivePanel
      open={open}
      onOpenChange={setOpen}
      title="Your bag"
      meta={count ? `${count} ${count === 1 ? "item" : "items"}` : undefined}
      footer={footer}
    >
      {items.length === 0 ? (
        <EmptyBag onBrowse={() => setOpen(false)} />
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 md:px-6">
          <p className="flex items-center gap-2 rounded-2xl bg-mist px-4 py-3 text-[13px] text-ink">
            <Truck className="size-4 shrink-0" aria-hidden />
            Delivered nationwide. Same or next day in Accra.
          </p>
          <ul role="list" className="mt-1">
            {items.map(item => (
              <li key={item.key} className="flex gap-4 border-b border-line py-5 last:border-0">
                <Link href={`/product/${item.slug}`} onClick={() => setOpen(false)} aria-label={`View ${item.name}`} className="press">
                  <ProductThumb src={item.image} tint={item.tint} cutout={item.cutout} alt={item.name} sizes="96px" className="size-24 rounded-2xl" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-[15px] font-semibold leading-5 text-ink hover:opacity-70"
                    >
                      {item.name}
                    </Link>
                    <p className="shrink-0 text-[15px] font-medium tabular-nums text-ink">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <p className="mt-1 text-[13px] text-ink-soft">{variantLine(item)}</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <QuantityStepper
                      value={item.quantity}
                      max={item.maxStock}
                      onChange={n => updateQuantity(item.key, n)}
                      label={item.name}
                    />
                    <button
                      type="button"
                      onClick={() => onRemove(item)}
                      className="press min-h-11 px-1 text-[13px] font-medium text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ResponsivePanel>
  );
}
