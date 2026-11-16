import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({ title, href, action }: { title: string; href?: string; action?: string }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-5 sm:mb-8">
      <h2 className="display text-[30px] text-ink sm:text-[40px] lg:text-[48px]">{title}</h2>
      {href && (
        <Link
          href={href}
          className="press group inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[15px] font-semibold text-ink"
        >
          {action ?? "Shop all"}
          <ArrowRight
            className="size-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      )}
    </div>
  );
}
