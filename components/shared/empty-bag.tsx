import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { buttonClass } from "@/lib/button-class";

/** Shared empty-bag state for the cart drawer and checkout. */
export function EmptyBag({ onBrowse }: { onBrowse?: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <ShoppingBag className="size-10 stroke-[1.25] text-ink-faint" aria-hidden />
      <h2 className="display mt-5 text-[22px] text-ink">Your bag is empty</h2>
      <p className="mt-2 max-w-[260px] text-sm leading-6 text-ink-soft">Pieces you add will show up here.</p>
      <Link href="/shop" onClick={onBrowse} className={buttonClass({ className: "mt-6 px-6" })}>
        Continue shopping
      </Link>
    </div>
  );
}
