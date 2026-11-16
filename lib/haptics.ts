/**
 * Tiny haptic tick for meaningful moments only (added to bag, order placed).
 *
 * - Android / Chrome: Vibration API.
 * - iOS 18+ Safari: no Vibration API, but toggling a native `<input switch>` plays the
 *   system "selection" haptic. Must run inside a user gesture (a tap handler).
 * - Desktop / unsupported: silently does nothing.
 */
type Pattern = "tap" | "success";

export function haptic(pattern: Pattern = "tap") {
  if (typeof window === "undefined") return;
  if (!window.matchMedia("(pointer: coarse)").matches) return;

  const nav = navigator as Navigator & { vibrate?: (p: number | number[]) => boolean };
  if (typeof nav.vibrate === "function") {
    nav.vibrate(pattern === "success" ? [10, 60, 14] : 9);
    return;
  }

  try {
    const label = document.createElement("label");
    label.ariaHidden = "true";
    label.style.display = "none";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("switch", "");
    label.appendChild(input);
    document.head.appendChild(label);
    label.click();
    if (pattern === "success") setTimeout(() => label.click(), 90);
    setTimeout(() => label.remove(), 200);
  } catch {
    // Haptics are a nicety; never let them break the action.
  }
}
