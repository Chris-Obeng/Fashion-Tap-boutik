"use client";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, CreditCard, MapPin, RotateCcw, Truck } from "lucide-react";
import { toast } from "sonner";
import { useBagUI, useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { haptic } from "@/lib/haptics";
import { whatsappHref } from "@/lib/config";
import { categoryName } from "@/data/categories";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import type { Product } from "@/types";

/** Check-icon contrast derived from swatch luminance. */
function swatchTextColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.6 ? "#ffffff" : "#111111";
}

function AccordionRow({ id, title, open, onToggle, children }: { id: string; title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div id={id} className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="flex min-h-14 w-full items-center justify-between gap-3 py-4 text-left text-[16px] font-semibold text-ink"
      >
        {title}
        <ChevronDown className={cn("size-5 shrink-0 text-ink-soft transition-transform duration-200 ease-[var(--ease-out)]", open && "rotate-180")} aria-hidden />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={id}
        className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className={cn("pb-5 text-[15px] leading-7 text-ink-soft", !open && "invisible")}>{children}</div>
        </div>
      </div>
    </div>
  );
}

const perks = [
  { icon: Truck, title: "Delivery nationwide", text: "Same or next day in Accra. 2–4 working days across Ghana." },
  { icon: MapPin, title: "Free pickup in store", text: "Ready within 24 hours of your order." },
  { icon: CreditCard, title: "Mobile Money or card", text: "MTN, Telecel, AirtelTigo or any card, secured by Paystack." },
  { icon: RotateCcw, title: "7-day returns", text: "Unworn with tags? Message us and we’ll arrange it." },
];

const oneSize = (p: Product) => p.sizes.length === 1;

/** Title block. Rendered above the gallery on phones (as Beats does), beside it on desktop. */
export function ProductTitle({ product, className }: { product: Product; className?: string }) {
  const isNew = product.tags.includes("new");
  return (
    <div className={className}>
      <p className="text-[13px]">
        {isNew && <span className="font-bold uppercase tracking-[0.04em] text-brand">New</span>}
        {isNew && <span className="text-ink-faint"> · </span>}
        <span className="text-ink-soft">{categoryName(product.category)}</span>
      </p>
      <h1 className="display mt-1 text-[32px] text-ink sm:text-[40px]">{product.name}</h1>
    </div>
  );
}

export function ProductInfo({ product }: { product: Product }) {
  const single = oneSize(product);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  // Garments and shoes start unselected: a wrong default size is worse than one extra tap.
  const [size, setSize] = useState(single ? product.sizes[0]?.name ?? "" : "");
  const [needSize, setNeedSize] = useState(false);
  const [nudge, setNudge] = useState(0);
  const [added, setAdded] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(["details"]);
  const toggleSection = (id: string) => setOpenSections(prev => (prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]));
  const add = useCart(s => s.add);
  const showAdded = useBagUI(s => s.showAdded);
  const sizesRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const allSoldOut = product.sizes.every(s => s.stock === 0);
  const selectedSize = product.sizes.find(s => s.name === size);
  const garment = product.category === "women" || product.category === "men";

  function addToBag() {
    if (allSoldOut) return;
    if (!selectedSize) {
      setNeedSize(true);
      setNudge(n => n + 1);
      sizesRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    const line = add(product, color, size, 1);
    if (!line) {
      toast.error("That’s the last one", { description: "You already have all we have in this size." });
      return;
    }
    haptic("tap");
    showAdded({ ...line, quantity: 1 });
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  }

  const label = allSoldOut ? "Sold out" : added ? (
    <span className="flex items-center gap-2"><Check className="size-5" /> Added</span>
  ) : !selectedSize ? "Select a size" : "Add to bag";

  const ask = whatsappHref(`Hi Fashion Tap Boutik, I'm interested in the ${product.name} (${color}${single || !size ? "" : `, size ${size}`}).`);

  return (
    <>
      <div className="min-w-0 md:sticky md:top-24 md:self-start">
        <ProductTitle product={product} className="hidden md:block" />
        <div className="flex items-baseline gap-2.5 md:mt-3">
          <p className={cn("text-[22px] tabular-nums", product.compareAtPrice ? "text-sale" : "text-ink")}>
            {formatPrice(product.price)}
          </p>
          {product.compareAtPrice && <s className="text-[15px] tabular-nums text-ink-faint">{formatPrice(product.compareAtPrice)}</s>}
        </div>
        {product.description && <p className="mt-3 max-w-[52ch] text-[16px] leading-7 text-ink-soft">{product.description}</p>}

        <div className="mt-7">
          <p className="text-[14px]">
            <span className="text-ink-soft">Colour:</span> <span className="font-semibold text-ink">{color}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {product.colors.map(c => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                aria-pressed={color === c.name}
                className={cn(
                  "press flex size-12 items-center justify-center rounded-full",
                  color === c.name ? "ring-2 ring-ink ring-offset-2" : "ring-1 ring-line hover:ring-ink/40"
                )}
              >
                <span className="flex size-10 items-center justify-center rounded-full ring-1 ring-black/5" style={{ backgroundColor: c.hex }}>
                  {color === c.name && <Check className="size-4" style={{ color: swatchTextColor(c.hex) }} />}
                </span>
              </button>
            ))}
          </div>
        </div>

        {!single && (
          <div ref={sizesRef} className="mt-7 scroll-mt-24">
            <div className="flex items-center justify-between">
              <p className="text-[14px]" id="size-label">
                <span className="text-ink-soft">Size:</span>{" "}
                <span className={cn("font-semibold", needSize ? "text-brand" : "text-ink")}>{size || (needSize ? "Choose your size" : "Choose")}</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setOpenSections(prev => (prev.includes("fit") ? prev : [...prev, "fit"]));
                  requestAnimationFrame(() => document.getElementById("fit")?.scrollIntoView({ block: "center", behavior: "smooth" }));
                }}
                className="min-h-11 text-[14px] font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
              >
                Size &amp; fit
              </button>
            </div>
            <div
              key={nudge}
              role="radiogroup"
              aria-labelledby="size-label"
              className={cn("mt-2 grid grid-cols-5 gap-2", nudge > 0 && needSize && "size-nudge")}
            >
              {product.sizes.map(s => (
                <button
                  key={s.name}
                  type="button"
                  role="radio"
                  aria-checked={size === s.name}
                  disabled={s.stock === 0}
                  onClick={() => { setSize(s.name); setNeedSize(false); }}
                  aria-label={s.stock === 0 ? `${s.name}, sold out` : s.name}
                  className={cn(
                    "press relative h-12 rounded-2xl border text-[15px] font-medium tabular-nums",
                    size === s.name ? "border-ink bg-ink text-white" : needSize ? "border-brand/50 bg-white text-ink" : "border-line bg-white text-ink hover:border-ink",
                    s.stock === 0 && "cursor-not-allowed border-dashed bg-soft text-ink-faint line-through decoration-ink-faint/60 hover:border-line"
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
            {selectedSize && selectedSize.stock > 0 && selectedSize.stock <= 3 && (
              <p className="mt-3 text-[13px] font-medium text-brand">Only {selectedSize.stock} left in {selectedSize.name}</p>
            )}
          </div>
        )}

        <div className="mt-8 hidden gap-2.5 md:grid">
          <button type="button" onClick={addToBag} disabled={allSoldOut} className="btn btn-primary btn-caps w-full">
            {label}
          </button>
          <a href={ask} target="_blank" rel="noreferrer" className="btn btn-outline w-full">
            <WhatsAppIcon className="size-[18px] text-[#25d366]" /> Ask about this piece
          </a>
        </div>
        <a href={ask} target="_blank" rel="noreferrer" className="btn btn-outline mt-7 w-full md:hidden">
          <WhatsAppIcon className="size-[18px] text-[#25d366]" /> Ask about this piece
        </a>

        <ul role="list" className="mt-8 divide-y divide-line border-y border-line">
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 py-4">
              <Icon className="mt-0.5 size-[22px] shrink-0 stroke-[1.5] text-ink" aria-hidden />
              <div>
                <p className="text-[15px] font-semibold text-ink">{title}</p>
                <p className="mt-0.5 text-[14px] leading-6 text-ink-soft">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-2">
          <AccordionRow id="details" title="Details" open={openSections.includes("details")} onToggle={() => toggleSection("details")}>
            {product.story && <p>{product.story}</p>}
            {product.details.length > 0 && (
              <ul className={cn("space-y-1.5", product.story && "mt-3")}>
                {product.details.map(detail => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-[11px] size-1 shrink-0 rounded-full bg-ink-soft" />
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </AccordionRow>
          <AccordionRow id="fit" title={garment || product.category === "shoes" ? "Size & fit" : "Care"} open={openSections.includes("fit")} onToggle={() => toggleSection("fit")}>
            {garment ? (
              <p>True to size. Between sizes? Size up for an easier fit, or send us your measurements on WhatsApp and we’ll help.</p>
            ) : product.category === "shoes" ? (
              <p>EU sizing, true to size. Between sizes? Go half a size up, or message us on WhatsApp.</p>
            ) : (
              <p>Keep it in its box or pouch, away from direct sun and moisture. Wipe gently with a soft, dry cloth.</p>
            )}
          </AccordionRow>
        </div>
      </div>

      {/* Phones: Beats-style floating buy bar */}
      <div data-sticky-cta className="translucent safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line/70 bg-white/90 px-4 pt-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] text-ink-soft">{[color, !single && size ? `Size ${size}` : null].filter(Boolean).join(" · ") || product.name}</p>
            <p className={cn("text-[18px] tabular-nums", product.compareAtPrice ? "text-sale" : "text-ink")}>{formatPrice(product.price)}</p>
          </div>
          <button type="button" onClick={addToBag} disabled={allSoldOut} className="btn btn-primary btn-caps min-w-[176px]">
            {label}
          </button>
        </div>
      </div>
    </>
  );
}
