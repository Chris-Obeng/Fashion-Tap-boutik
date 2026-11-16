"use client";

import { useEffect } from "react";
import { buttonClass } from "@/lib/button-class";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <h1 className="display text-[32px] text-ink sm:text-[40px]">Something went wrong</h1>
      <p className="mt-3 max-w-sm text-[15px] leading-7 text-ink-soft">
        Please try again. If it keeps happening, come back in a little while.
      </p>
      <button onClick={retry} className={buttonClass({ className: "mt-7 px-6" })}>
        Try again
      </button>
    </div>
  );
}
