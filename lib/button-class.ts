import { buttonVariants as heroButtonVariants } from "@heroui/styles"

import { cn } from "@/lib/utils"

/**
 * Button vocabulary shared by the storefront. Kept framework-free (no "use client")
 * so server components can style links with the same classes HeroUI's `<Button>` uses.
 */
export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "destructive"
  | "danger"
  | "danger-soft"

export type ButtonSize =
  | "default"
  | "sm"
  | "md"
  | "lg"
  | "icon"
  | "icon-sm"
  | "icon-lg"

const VARIANTS = {
  default: "primary",
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  outline: "outline",
  ghost: "ghost",
  destructive: "danger",
  danger: "danger",
  "danger-soft": "danger-soft",
} as const

const SIZES = {
  default: "md",
  sm: "sm",
  md: "md",
  lg: "lg",
  icon: "md",
  "icon-sm": "sm",
  "icon-lg": "lg",
} as const

export type ResolvedButton = {
  variant: (typeof VARIANTS)[ButtonVariant]
  size: (typeof SIZES)[ButtonSize]
  isIconOnly?: true
}

export function resolveButton(
  variant: ButtonVariant = "default",
  size: ButtonSize = "default",
): ResolvedButton {
  return {
    variant: VARIANTS[variant] ?? "primary",
    size: SIZES[size] ?? "md",
    isIconOnly: size.startsWith("icon") ? true : undefined,
  }
}

/** Class-only variant, for styling `next/link` elements as buttons. */
export function buttonClass({
  variant,
  size,
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  const resolved = resolveButton(variant, size)
  return cn(heroButtonVariants(resolved), "rounded-full press", resolved.isIconOnly && "px-0", className)
}
