"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { Check, ChevronDown, Truck } from "lucide-react";
import { toast } from "sonner";
import { useBagUI, useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";
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

/** One accordion row: native button trigger + grid-rows panel animation. */
function AccordionRow({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
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
        <ChevronDown
          className={cn("size-5 shrink-0 text-ink-soft transition-transform duration-200 ease-[var(--ease-out)]", open && "rotate-180")}
          aria-hidden
        />
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

const oneSize = (p: Product) => p.sizes.length === 1;

export function ProductInfo({ product }: { product: Product }) {
  const firstAvailableSize = product.sizes.find(s => s.stock > 0)?.name ?? product.sizes[0]?.name ?? "";
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(firstAvailableSize);
  const [added, setAdded] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(["details"]);
  const toggleSection = (id: string) =>
    setOpenSections(prev => (prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]));
  const add = useCart(s => s.add);
  const openBag = useBagUI(s => s.setOpen);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const selectedSize = product.sizes.find(s => s.name === size);
  const soldOut = !selectedSize || selectedSize.stock === 0;
  const isNew = product.tags.includes("new");
  const garment = product.category === "women" || product.category === "men";

  function addToBag() {
    if (soldOut) return;
    if (!add(product, color, size, 1)) {
      toast.error("That's all we have", { description: "You've added the last ones in this size." });
      return;
    }
    setAdded(true);
    toast.success(`${product.name} is in your bag`, {
      description: [color, oneSize(product) ? null : size].filter(Boolean).join(" · "),
      action: { label: "View bag", onClick: () => openBag(true) },
    });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  }

  const buttonLabel = soldOut ? "Sold out" : added ? (
    <span className="flex items-center gap-2"><Check className="size-5" /> Added</span>
  ) : "Add to bag";

  const ask = whatsappHref(`Hi Fashion Tap Boutik, I'm interested in the ${product.name} (${color}${oneSize(product) ? "" : `, ${size}`}).`);

  return (
    <>
      <div className="min-w-0 md:sticky md:top-24 md:self-start">
        <p className="text-[14px] font-semibold">
          {isNew && <span className="text-brand">New</span>}
          {isNew && <span className="text-ink-faint"> · </span>}
          <span className="text-ink-soft">{categoryName(product.category)}</span>
        </p>
        <h1 className="display mt-2 text-[34px] text-ink sm:text-[44px]">{product.name}</h1>
        <div className="mt-3 flex items-baseline gap-2.5">
          <p className={cn("text-[20px] font-semibold tabular-nums", product.compareAtPrice ? "text-sale" : "text-ink")}>
            {formatPrice(product.price)}
          </p>
          {product.compareAtPrice && (
            <s className="text-[15px] tabular-nums text-ink-faint">{formatPrice(product.compareAtPrice)}</s>
          )}
        </div>
        {product.description && <p className="mt-4 max-w-[52ch] text-[16px] leading-7 text-ink-soft">{product.description}</p>}

        <div className="mt-8">
          <p className="text-[14px]">
            <span className="font-semibold text-ink">Colour</span>
            <span className="ml-2 text-ink-soft">{color}</span>
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
                  "press flex size-11 items-center justify-center rounded-full",
                  color === c.name ? "ring-2 ring-ink ring-offset-2" : "ring-1 ring-line hover:ring-ink/40"
                )}
              >
                <span className="flex size-9 items-center justify-center rounded-full ring-1 ring-black/5" style={{ backgroundColor: c.hex }}>
                  {color === c.name && <Check className="size-4" style={{ color: swatchTextColor(c.hex) }} />}
                </span>
              </button>
            ))}
          </div>
        </div>

        {!oneSize(product) && (
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <p className="text-[14px]">
                <span className="font-semibold text-ink">Size</span>
                <span className="ml-2 text-ink-soft">{size}</span>
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
            <div className="mt-2 grid grid-cols-5 gap-2">
              {product.sizes.map(s => (
                <button
                  key={s.name}
                  type="button"
                  disabled={s.stock === 0}
                  onClick={() => setSize(s.name)}
                  aria-pressed={size === s.name}
                  aria-label={s.stock === 0 ? `${s.name}, sold out` : s.name}
                  className={cn(
                    "press h-12 rounded-2xl border text-[15px] font-semibold tabular-nums",
                    size === s.name ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink",
                    s.stock === 0 && "cursor-not-allowed border-dashed bg-soft text-ink-faint line-through decoration-ink-faint/60 hover:border-line"
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
            {soldOut && <p className="mt-3 text-[13px] text-danger">This size is sold out. Pick another size.</p>}
          </div>
        )}

        <Button onPress={addToBag} isDisabled={soldOut} className="mt-8 hidden h-14 w-full text-[16px] md:flex">
          {buttonLabel}
        </Button>
        <a
          href={ask}
          target="_blank"
          rel="noreferrer"
          className="press mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line text-[15px] font-semibold text-ink hover:border-ink"
        >
          <WhatsAppIcon className="size-[18px] text-[#25d366]" /> Ask about this piece
        </a>
        <p className="mt-4 flex items-center gap-2 text-[14px] text-ink-soft">
          <Truck className="size-4 shrink-0" aria-hidden /> Delivery across Accra in 1–2 days, or free pickup in Osu.
        </p>

        <div className="mt-8 border-t border-line">
          <AccordionRow id="details" title="Details" open={openSections.includes("details")} onToggle={() => toggleSection("details")}>
            {product.story && <p>{product.story}</p>}
            {product.details.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {product.details.map(detail => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-[11px] size-1 shrink-0 rounded-full bg-ink-soft" />
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </AccordionRow>
          <AccordionRow
            id="fit"
            title={garment || !oneSize(product) ? "Size & fit" : "Care"}
            open={openSections.includes("fit")}
            onToggle={() => toggleSection("fit")}
          >
            {garment ? (
              <p>True to size. Between sizes? Size up for an easier fit, or send us your measurements on WhatsApp and we’ll help.</p>
            ) : product.category === "shoes" ? (
              <p>EU sizing, true to size. Between sizes? Go half a size up, or message us on WhatsApp.</p>
            ) : (
              <p>Store in its box or pouch, away from direct sunlight. Wipe gently with a soft, dry cloth.</p>
            )}
          </AccordionRow>
          <AccordionRow id="delivery" title="Delivery & returns" open={openSections.includes("delivery")} onToggle={() => toggleSection("delivery")}>
            <p>Delivery across Accra from GH₵ 25, usually within 1–2 working days. Pickup in Osu is free.</p>
            <p className="mt-2">Unworn pieces with tags can be returned within 7 days. Message us and we’ll arrange it.</p>
          </AccordionRow>
        </div>
      </div>

      {/* Mobile: sticky add-to-bag bar */}
      <div data-sticky-cta className="translucent safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line/70 bg-white/90 px-4 pt-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] text-ink-soft">{product.name}</p>
            <p className={cn("text-[17px] font-semibold tabular-nums", product.compareAtPrice ? "text-sale" : "text-ink")}>
              {formatPrice(product.price)}
            </p>
          </div>
          <Button onPress={addToBag} isDisabled={soldOut} className="h-12 min-w-[164px] px-6 text-[16px]">
            {buttonLabel}
          </Button>
        </div>
      </div>
    </>
  );
}
