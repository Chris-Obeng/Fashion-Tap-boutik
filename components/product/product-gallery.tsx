"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  }

  return (
    <div className="min-w-0">
      {/* Mobile: swipeable carousel with progress dots */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-contain rounded-2xl bg-soft md:hidden"
        aria-label={`${name} image gallery`}
      >
        {images.map((src, i) => (
          <div key={src} className="relative aspect-[4/5] w-full shrink-0 snap-center">
            <Image
              src={src}
              alt={`${name}, view ${i + 1}`}
              fill
              preload={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5 md:hidden" aria-hidden="true">
          {images.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 rounded-full transition-[width,background-color] duration-200",
                active === i ? "w-5 bg-ink" : "w-1.5 bg-ink/20"
              )}
            />
          ))}
        </div>
      )}

      {/* Desktop: thumbnail rail + main image */}
      <div className="hidden gap-3 md:flex">
        <div className="flex w-16 shrink-0 flex-col gap-3 lg:w-20">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={active === i}
              className={cn(
                "relative aspect-[4/5] overflow-hidden rounded-xl bg-soft transition-opacity",
                active === i ? "opacity-100 ring-1 ring-ink ring-offset-2 ring-offset-canvas" : "opacity-60 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill preload={false} sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
        <div className="relative aspect-[4/5] min-w-0 flex-1 overflow-hidden rounded-2xl bg-soft">
          <Image
            src={images[active]}
            alt={`${name}, view ${active + 1}`}
            fill
            preload
            sizes="(max-width: 1024px) 55vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
