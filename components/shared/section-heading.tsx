import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function SectionHeading({
  title,
  href,
  action,
}: {
  title: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-5 sm:mb-8">
      <h2 className="display text-[28px] leading-tight text-ink sm:text-[36px]">{title}</h2>
      {href && (
        <Link
          href={href}
          className="inline-flex min-h-11 items-center gap-0.5 text-sm font-medium text-ink transition-opacity hover:opacity-70"
        >
          {action ?? "View all"}
          <ChevronRight className="size-4 text-ink-faint" aria-hidden />
        </Link>
      )}
    </div>
  );
}
