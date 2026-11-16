import { Minus, Plus } from "lucide-react";

export function QuantityStepper({ value, max, onChange, label }: { value: number; max: number; onChange: (value: number) => void; label: string }) {
  return (
    <div className="inline-flex h-10 items-center rounded-full bg-mist" role="group" aria-label={`Quantity for ${label}`}>
      <button
        type="button"
        className="press flex size-10 items-center justify-center rounded-full text-ink disabled:opacity-30"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-7 text-center text-[14px] font-semibold tabular-nums" aria-live="polite">{value}</span>
      <button
        type="button"
        className="press flex size-10 items-center justify-center rounded-full text-ink disabled:opacity-30"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={value >= max ? "No more in stock" : "Increase quantity"}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
