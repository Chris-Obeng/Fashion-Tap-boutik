"use client";
import { useSyncExternalStore } from "react";
import { Drawer } from "@heroui/react";
import { cn } from "@/lib/utils";

const subscribe = (callback: () => void) => {
  const media = window.matchMedia("(min-width: 768px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

/**
 * Shared overlay surface: bottom sheet on mobile, right drawer on desktop.
 * Built directly on HeroUI's Drawer.
 */
export function ResponsivePanel({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
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
          <Drawer.Dialog className={cn("gap-0 p-0", desktop ? "w-full sm:w-[460px]" : "max-h-[90dvh]")}>
            {!desktop && <Drawer.Handle className="mx-auto mt-2 mb-1" />}
            <Drawer.CloseTrigger className="absolute end-3 top-3 z-20" />
            <Drawer.Header className="flex shrink-0 flex-col gap-1 border-b px-5 py-5 text-left md:px-6">
              <Drawer.Heading className="text-[22px] font-semibold tracking-[-0.01em]">{title}</Drawer.Heading>
              <p className="text-sm text-muted">{description}</p>
            </Drawer.Header>
            <Drawer.Body className="flex min-h-0 flex-1 flex-col p-0">{children}</Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
