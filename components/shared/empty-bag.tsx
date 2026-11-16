import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { buttonClass } from "@/lib/button-class";

/** Shared empty-bag state for the bag drawer and checkout. */
export function EmptyBag({ onBrowse }: { onBrowse?: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex size-20 items-center justify-center rounded-full bg-brand-soft">
        <ShoppingBag className="size-8 stroke-[1.5] text-brand" aria-hidden />
      </span>
      <h2 className="display mt-6 text-[26px] text-ink">Your bag is empty</h2>
      <p className="mt-2 max-w-[260px] text-[15px] leading-6 text-ink-soft">Find something you love. It will wait here for you.</p>
      <Link href="/shop" onClick={onBrowse} className={buttonClass({ className: "mt-7 min-w-[200px]" })}>
        Start shopping
      </Link>
    </div>
  );
}
