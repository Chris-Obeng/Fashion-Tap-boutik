import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The store's own logo (from its TikTok profile), with white made transparent.
 * `light` swaps in the version whose black ink is white, for dark surfaces.
 * Aspect ratio 600 × 331.
 */
export function Logo({ className, light = false, priority = false }: { className?: string; light?: boolean; priority?: boolean }) {
  return (
    <Link href="/" aria-label="Fashion Tap Boutik home" className={cn("press inline-flex shrink-0 items-center", className)}>
      <Image
        src={light ? "/brand/logo-light.png" : "/brand/logo.png"}
        alt="Fashion Tap Boutique"
        width={600}
        height={331}
        preload={priority}
        sizes="120px"
        className="h-full w-auto"
      />
    </Link>
  );
}
