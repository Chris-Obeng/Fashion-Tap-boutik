"use client"

import { toast, Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleAlert, CircleCheck, Info, Loader2, TriangleAlert } from "lucide-react"

/**
 * Small system notices (errors, undo). "Added to bag" has its own richer card
 * (components/cart/added-to-bag.tsx), so these stay compact and quiet.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      offset={{ top: 72 }}
      mobileOffset={{ top: 68, left: 12, right: 12 }}
      gap={8}
      icons={{
        success: <CircleCheck className="size-[18px] text-brand" />,
        info: <Info className="size-[18px] text-ink-soft" />,
        warning: <TriangleAlert className="size-[18px] text-[#b45309]" />,
        error: <CircleAlert className="size-[18px] text-sale" />,
        loading: <Loader2 className="size-[18px] animate-spin text-ink-soft" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-full items-center gap-3 rounded-[20px] bg-white/95 px-4 py-3.5 font-sans shadow-[0_14px_40px_-10px_rgb(17_17_17/0.25),0_2px_6px_rgb(17_17_17/0.06)] ring-1 ring-black/5 backdrop-blur-xl sm:w-[380px]",
          content: "flex min-w-0 flex-1 flex-col gap-0.5",
          title: "text-[14px] font-semibold text-ink",
          description: "text-[13px] leading-5 text-ink-soft",
          icon: "flex shrink-0 items-center",
          actionButton:
            "press shrink-0 rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white hover:bg-[#333]",
          cancelButton: "press shrink-0 rounded-full bg-mist px-4 py-2 text-[13px] font-medium text-ink",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
