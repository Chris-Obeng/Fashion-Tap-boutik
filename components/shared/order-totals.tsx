import { formatPrice } from "@/lib/format";

/** Subtotal / delivery / total rows, shared by checkout and order confirmation. */
export function OrderTotals({
  subtotal,
  feeLabel = "Delivery",
  fee,
  feeNote,
  total,
}: {
  subtotal: number;
  feeLabel?: string;
  fee: number;
  /** Shown instead of the fee amount when a fee can't be computed yet. */
  feeNote?: string;
  total: number;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex justify-between text-sm">
        <span className="text-ink-soft">Subtotal</span>
        <span className="tabular-nums">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-ink-soft">{feeLabel}</span>
        <span className="tabular-nums">{feeNote ?? (fee ? formatPrice(fee) : "Free")}</span>
      </div>
      <div className="flex justify-between border-t border-line pt-3 text-[15px] font-medium">
        <span>Total</span>
        <span className="tabular-nums">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
