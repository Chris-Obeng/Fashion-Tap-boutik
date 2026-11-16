import { Logo } from "@/components/shared/logo";

/** Minimal sticky chrome for checkout and order confirmation pages. */
export function ChromeHeader({ trailing }: { trailing?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="container-shell flex h-14 items-center justify-between">
        <Logo />
        {trailing}
      </div>
    </header>
  );
}
