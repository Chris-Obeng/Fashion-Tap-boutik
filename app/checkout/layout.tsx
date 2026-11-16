import Link from "next/link";
import { Lock } from "lucide-react";
import { ChromeHeader } from "@/components/shared/chrome-header";

export default function CheckoutLayout({ children }: LayoutProps<"/checkout">) {
  return (
    <div className="flex min-h-svh flex-col">
      <ChromeHeader
        trailing={
          <p className="flex items-center gap-1.5 text-xs text-ink-soft">
            <Lock className="size-3.5" aria-hidden />
            Secure checkout
          </p>
        }
      />
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="container-shell safe-bottom flex flex-wrap items-center justify-between gap-2 py-6 text-xs text-ink-faint">
        <p>© {new Date().getFullYear()} Fashion Tap Boutik · Accra</p>
        <Link href="/shop" className="transition-colors hover:text-ink">Continue shopping</Link>
      </footer>
    </div>
  );
}
