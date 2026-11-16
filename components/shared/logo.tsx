import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Fashion Tap Boutik home"
      className={cn("inline-flex items-center text-[15px] font-semibold tracking-[-0.01em] text-ink", className)}
    >
      Fashion Tap Boutik
    </Link>
  );
}
