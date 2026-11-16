import { Minus, Plus } from "lucide-react";
export function QuantityStepper({ value, max, onChange, label }: { value: number; max: number; onChange: (value: number) => void; label: string }) {
  return (
    <div className="inline-flex h-11 items-center rounded-full border border-line" role="group" aria-label={`Quantity for ${label}`}>
      <button
        className="press flex size-10 items-center justify-center text-ink transition-colors disabled:opacity-30"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-6 text-center text-xs tabular-nums" aria-live="polite">{value}</span>
      <button
        className="press flex size-10 items-center justify-center text-ink transition-colors disabled:opacity-30"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
