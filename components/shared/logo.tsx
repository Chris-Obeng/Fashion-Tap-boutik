import Link from "next/link";
import { cn } from "@/lib/utils";

/** The "ft" monogram, also used as the favicon (app/icon.svg). */
export function Monogram({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-7 shrink-0", className)}>
      <circle cx="32" cy="32" r="32" fill={inverted ? "#fff" : "#111"} />
      <path
        d="M21 46V24.5C21 19.8 23.9 17 28.6 17H32v5.6h-2.6c-1.6 0-2.3.8-2.3 2.4V29H32v5.4h-4.9V46H21Zm19.6.4c-4.6 0-7.1-2.5-7.1-7.2V34.4h-2.9V29h2.9v-6.2h6.1V29h4.6v5.4h-4.6v4.3c0 1.6.8 2.3 2.3 2.3h2.3v5.4h-3.6Z"
        fill={inverted ? "#111" : "#fff"}
      />
      <circle cx="47.5" cy="19" r="3.5" fill="#1fb98a" />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Fashion Tap Boutik home"
      className={cn("press inline-flex items-center gap-2", inverted ? "text-white" : "text-ink", className)}
    >
      <Monogram inverted={inverted} />
      <span className="text-[16px] leading-none tracking-[-0.02em]">
        <span className="font-extrabold">Fashion Tap</span> <span className="font-medium">Boutik</span>
      </span>
    </Link>
  );
}
