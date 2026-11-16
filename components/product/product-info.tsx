"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/** Check-icon contrast derived from swatch luminance, not hardcoded colour names. */
function swatchTextColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.55 ? "#ffffff" : "#1d1d1f";
}

/** One accordion row: native trigger (keyboard-free wiring) + grid-rows panel animation. */
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
        className="flex min-h-12 w-full items-center justify-between gap-3 py-4 text-left text-[15px] font-medium text-ink"
      >
        {title}
        <ChevronDown
          className={cn("size-4 shrink-0 text-ink-soft transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className={cn("pb-5 text-sm leading-6 text-ink-soft", !open && "invisible")}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ProductInfo({ product }: { product: Product }) {
  const firstAvailableSize = product.sizes.find(s => s.stock > 0)?.name ?? product.sizes[0]?.name ?? "";
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(firstAvailableSize);
  const [added, setAdded] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(["details"]);
  const toggleSection = (id: string) =>
    setOpenSections(prev => (prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]));
  const add = useCart(s => s.add);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const selectedSize = product.sizes.find(s => s.name === size);
  const soldOut = !selectedSize || selectedSize.stock === 0;

  function addToBag() {
    if (soldOut) return;
    if (!add(product, color, size, 1)) {
      toast.error("That's everything we have", {
        description: "You've reached the available stock for this piece.",
      });
      return;
    }
    // Success feedback stays at the point of interaction: the button morphs
    // to "Added" and the bag badge updates — no banner over the header.
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  }

  return (
    <>
      <div className="min-w-0 md:sticky md:top-16 md:self-start">
        <p className="text-[13px] capitalize text-ink-soft">{product.category}</p>
        <h1 className="display mt-1.5 text-[32px] text-ink sm:text-[40px]">{product.name}</h1>
        <div className="mt-3 flex items-baseline gap-2.5">
          <p className={cn("text-[17px] font-medium tabular-nums", product.compareAtPrice ? "text-sale" : "text-ink")}>
            {formatPrice(product.price)}
          </p>
          {product.compareAtPrice && (
            <s className="text-sm tabular-nums text-ink-faint">{formatPrice(product.compareAtPrice)}</s>
          )}
        </div>
        <p className="mt-4 text-[15px] leading-7 text-ink-soft">{product.description}</p>

        <div className="mt-8">
          <p className="text-[13px]">
            <span className="text-ink-soft">Colour</span>
            <span className="ml-2 font-medium text-ink">{color}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {product.colors.map(c => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                aria-pressed={color === c.name}
                className={cn(
                  "flex size-9 items-center justify-center rounded-full",
                  color === c.name ? "ring-2 ring-ink ring-offset-2 ring-offset-canvas" : "ring-1 ring-line"
                )}
              >
                <span className="flex size-7 items-center justify-center rounded-full" style={{ backgroundColor: c.hex }}>
                  {color === c.name && <Check className="size-3.5" style={{ color: swatchTextColor(c.hex) }} />}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between">
            <p className="text-[13px]">
              <span className="text-ink-soft">Size</span>
              <span className="ml-2 font-medium text-ink">{size}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                // Expand the section, then scroll its heading into view.
                setOpenSections(prev => (prev.includes("size-guide") ? prev : [...prev, "size-guide"]));
                requestAnimationFrame(() => {
                  document.getElementById("size-guide")?.scrollIntoView({ block: "center" });
                });
              }}
              className="text-[13px] text-ink-soft underline underline-offset-2 transition-colors hover:text-ink"
            >
              Size guide
            </button>          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map(s => (
              <button
                key={s.name}
                disabled={s.stock === 0}
                onClick={() => setSize(s.name)}
                aria-pressed={size === s.name}
                className={cn(
                  "h-11 min-w-12 rounded-full border px-4 text-[13px] font-medium transition-colors",
                  size === s.name ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink",
                  s.stock === 0 && "text-ink-faint/60 line-through decoration-ink-faint/40"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
          {soldOut && <p className="mt-3 text-xs text-danger">This size is sold out.</p>}
        </div>

        <Button
          onPress={addToBag}
          isDisabled={soldOut}
          className="relative mt-8 hidden h-12 w-full text-[15px] md:flex"
        >
          <span className={cn("flex items-center justify-center gap-2 transition-opacity duration-150", added && "opacity-0")}>
            Add to bag
            {!soldOut && <span className="text-white/50">·</span>}
            {!soldOut && formatPrice(product.price)}
          </span>
          {added && (
            <span className="absolute inset-0 flex items-center justify-center gap-2">
              <Check className="size-4" /> Added
            </span>
          )}
        </Button>
        <p className="mt-3 hidden text-center text-xs text-ink-soft md:block">Delivery across Accra · 7-day returns</p>

        <div className="mt-8 border-t border-line" data-testid="product-accordion">
          <AccordionRow
            id="details"
            title="Details"
            open={openSections.includes("details")}
            onToggle={() => toggleSection("details")}
          >
            <ul className="space-y-2">
              {product.details.map(detail => (
                <li key={detail} className="flex gap-2.5">
                  <span className="mt-2.5 size-1 shrink-0 rounded-full bg-ink-faint" />
                  {detail}
                </li>
              ))}
            </ul>
          </AccordionRow>
          <AccordionRow
            id="size-guide"
            title="Size guide"
            open={openSections.includes("size-guide")}
            onToggle={() => toggleSection("size-guide")}
          >
            <p>Our pieces are cut for a relaxed, comfortable fit. If you’re between sizes and prefer a closer fit, size down; for an easier silhouette, size up.</p>
            <p className="mt-2">Not sure? Send us a message on TikTok — we’re happy to help.</p>
          </AccordionRow>
          <AccordionRow
            id="delivery"
            title="Delivery & returns"
            open={openSections.includes("delivery")}
            onToggle={() => toggleSection("delivery")}
          >
            <p>We deliver across Accra, with fees from GH₵ 25 depending on your area. Orders are usually prepared within one working day.</p>
            <p className="mt-2">Unworn pieces can be returned within 7 days. Get in touch and we’ll help arrange it.</p>
          </AccordionRow>
        </div>
      </div>

      {/* Mobile: sticky add-to-bag bar */}
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/90 px-4 pt-3 backdrop-blur-xl md:hidden">
        <Button onPress={addToBag} isDisabled={soldOut} className="h-12 w-full text-[15px]">
          {soldOut ? (
            "Sold out"
          ) : added ? (
            <span className="flex items-center gap-2">
              <Check className="size-4" /> Added
            </span>
          ) : (
            "Add to bag"
          )}
        </Button>
      </div>
    </>
  );
}
