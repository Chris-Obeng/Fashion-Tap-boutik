"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Frame = { src: string; alt: string; position: string };
export type HeroSlide = { label: string; backdrop: string; frames: Frame[] };

const INTERVAL_MS = 6500;

/**
 * Beats-style hero. Phones: one portrait (static, fast LCP). Desktop: studio triptychs
 * that cross-fade between shoots. Pauses on hover, has a visible pause control
 * (WCAG 2.2.2), and never auto-advances under prefers-reduced-motion.
 */
export function Hero({ mobile, slides }: { mobile: Frame; slides: HeroSlide[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (reduce || !playing || hovered || slides.length < 2) return;
    const t = setTimeout(() => setIndex(i => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [index, playing, hovered, reduce, slides.length]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured looks"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative isolate h-[min(calc(100svh-96px),760px)] min-h-[540px] overflow-hidden bg-[#cfc9d6] lg:h-[min(calc(100svh-104px),720px)]"
    >
      {/* Phones */}
      <div className="hero-media absolute inset-0 -z-10 lg:hidden">
        <Image src={mobile.src} alt={mobile.alt} fill preload quality={85} sizes="100vw" className="object-cover" style={{ objectPosition: mobile.position }} />
      </div>

      {/* Desktop slides */}
      <div className="absolute inset-0 -z-10 hidden lg:block">
        {slides.map((slide, s) => (
          <div
            key={slide.label}
            role="group"
            aria-roledescription="slide"
            aria-label={`${s + 1} of ${slides.length}: ${slide.label}`}
            aria-hidden={s !== index}
            className={cn(
              "hero-slide absolute inset-0 grid grid-cols-[1fr_1.12fr_1fr]",
              s === index ? "is-active" : ""
            )}
            style={{ backgroundColor: slide.backdrop }}
          >
            {slide.frames.map((f, i) => (
              <div key={f.src} className="relative h-full overflow-hidden">
                <Image
                  src={f.src}
                  alt={i === 1 ? f.alt : ""}
                  fill
                  loading={s === 0 ? "eager" : "lazy"}
                  quality={85}
                  sizes="38vw"
                  className="hero-frame object-cover"
                  style={{ objectPosition: f.position }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/50 via-black/5 to-transparent lg:from-black/40" />

      <div className="hero-copy container-shell flex h-full flex-col items-center justify-end pb-11 text-center text-white sm:pb-14 lg:pb-16">
        <h1 className="display text-[44px] sm:text-[56px] lg:text-[64px]">Made to be noticed.</h1>
        <p className="mt-2 text-[17px] leading-6 text-white/90 sm:text-[20px] sm:leading-7">Luxury fashion, delivered across Ghana.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-light">Shop now</Link>
          <Link href="/shop?category=new" className="btn btn-ghost-light">New in</Link>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-3 lg:flex">
          <div className="flex gap-1.5">
            {slides.map((slide, s) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => setIndex(s)}
                aria-label={`Show ${slide.label}`}
                aria-current={s === index}
                className={cn(
                  "h-2 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out)]",
                  s === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPlaying(p => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="press flex size-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30"
          >
            {playing && !reduce ? <Pause className="size-3.5 fill-current" /> : <Play className="size-3.5 fill-current" />}
          </button>
        </div>
      )}
    </section>
  );
}
