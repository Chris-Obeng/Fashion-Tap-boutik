"use client";
import { useSyncExternalStore } from "react";
import { Drawer } from "@heroui/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const subscribe = (callback: () => void) => {
  const media = window.matchMedia("(min-width: 768px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

/**
 * Shared overlay surface: bottom sheet on phones (drag the handle to dismiss),
 * right-hand drawer from tablet up. Title row and close button share one baseline.
 */
export function ResponsivePanel({
  open,
  onOpenChange,
  title,
  meta,
  children,
  footer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Small text beside the title, e.g. the item count. */
  meta?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const desktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false
  );

  return (
    <Drawer isOpen={open} onOpenChange={onOpenChange}>
      <Drawer.Backdrop>
        <Drawer.Content placement={desktop ? "right" : "bottom"}>
          <Drawer.Dialog
            className={cn(
              "gap-0 bg-white p-0",
              desktop ? "h-full w-full sm:w-[440px]" : "max-h-[92dvh] rounded-t-[28px]"
            )}
          >
            {!desktop && <Drawer.Handle className="pt-2.5 pb-0" />}
            <Drawer.Header className="flex shrink-0 flex-row items-center justify-between gap-3 px-5 pb-3 pt-3 md:px-6 md:pt-6">
              <div className="flex items-baseline gap-2.5">
                <Drawer.Heading className="text-[24px] font-semibold tracking-[-0.025em] text-ink">{title}</Drawer.Heading>
                {meta && <span className="text-[15px] text-ink-soft">{meta}</span>}
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close"
                className="press -mr-1.5 flex size-10 items-center justify-center rounded-full bg-mist text-ink hover:bg-[#e6e6e6]"
              >
                <X className="size-[18px]" />
              </button>
            </Drawer.Header>
            <Drawer.Body className="m-0 flex min-h-0 flex-1 flex-col p-0 text-ink">{children}</Drawer.Body>
            {footer}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
