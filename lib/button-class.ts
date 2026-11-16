import { cn } from "@/lib/utils";

/**
 * Class-only button styles (Beats-style pills, defined in globals.css as .btn-*), so
 * server components and next/link can look exactly like buttons. Framework-free.
 */
export type ButtonVariant = "primary" | "outline" | "soft" | "light" | "ghost-light";
export type ButtonSize = "sm" | "md" | "lg";

export function buttonClass({
  variant = "primary",
  size = "md",
  caps = false,
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; caps?: boolean; className?: string } = {}) {
  return cn("btn", `btn-${variant}`, size === "sm" && "btn-sm", size === "lg" && "btn-lg", caps && "btn-caps", className);
}
