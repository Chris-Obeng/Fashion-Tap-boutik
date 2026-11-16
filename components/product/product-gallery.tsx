"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name, tint }: { images: string[]; name: string; tint: string }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const style = { "--tint": tint } as React.CSSProperties;

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  }

  function goTo(i: number) {
    const track = trackRef.current;
    if (track) track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="min-w-0">
      {/* Mobile: edge-to-edge swipe gallery */}
      <div className="relative -mx-5 sm:-mx-8 md:hidden">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="tint-media hide-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          style={style}
          aria-label={`${name} images`}
        >
          {images.map((src, i) => (
            <div key={src} className="relative aspect-square w-full shrink-0 snap-center">
              <Image
                src={src}
                alt={`${name}, image ${i + 1} of ${images.length}`}
                data-studio={i === 0 ? "" : undefined}
                fill
                preload={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center">
            <div className="flex gap-1.5 rounded-full bg-black/25 px-2.5 py-2 backdrop-blur-md">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-current={active === i}
                  className={cn(
                    "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out)]",
                    active === i ? "w-5 bg-white" : "w-1.5 bg-white/55"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop: main image + thumbnail strip */}
      <div className="hidden md:block">
        <div className="tint-media relative aspect-square overflow-hidden rounded-[28px]" style={style}>
          <Image
            key={images[active]}
            src={images[active]}
            alt={`${name}, image ${active + 1} of ${images.length}`}
            data-studio={active === 0 ? "" : undefined}
            fill
            preload
            sizes="(max-width: 1280px) 55vw, 700px"
            className="object-cover"
          />
        </div>
        <div className="mt-3 grid grid-cols-8 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={active === i}
              className={cn(
                "tint-media press relative aspect-square overflow-hidden rounded-xl",
                active === i ? "ring-2 ring-ink ring-offset-2" : "opacity-70 hover:opacity-100"
              )}
              style={style}
            >
              <Image src={src} alt="" data-studio={i === 0 ? "" : undefined} fill sizes="90px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
