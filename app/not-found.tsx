import Link from "next/link";
import { buttonClass } from "@/lib/button-class";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <h1 className="display text-[32px] text-ink sm:text-[40px]">Page not found</h1>
      <p className="mt-3 max-w-sm text-[15px] leading-7 text-ink-soft">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link href="/" className={buttonClass({ className: "mt-7 px-6" })}>
        Back to home
      </Link>
    </div>
  );
}
