"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Search, ChevronRight, X } from "lucide-react";
import { categories, categoryHref } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { SearchItem } from "@/types";

const MAX_RESULTS = 8;

/**
 * Command-palette style product search. Hand-rolled over a portal so open /
 * close stays fully controlled (HeroUI's Modal ignores controlled updates),
 * with CSS-only entry animation via @starting-style.
 */
export function SearchDialog({
  open,
  onOpenChange,
  items,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: SearchItem[];
}) {
  // Lock body scroll while open — an external-system sync, not state setup.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Search products">
      <div
        className="search-backdrop absolute inset-0"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />
      <div className="absolute inset-x-4 top-[9vh] mx-auto sm:inset-x-0 sm:w-[min(92vw,560px)]">
        <SearchPanel items={items} onNavigate={() => onOpenChange(false)} />
      </div>
    </div>,
    document.body
  );
}

function SearchPanel({ items, onNavigate }: { items: SearchItem[]; onNavigate: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // autoFocus is unreliable for portal content remounting on open — focus directly.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items
      .filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, MAX_RESULTS);
  }, [items, query]);

  function onQueryChange(value: string) {
    setQuery(value);
    setActive(0);
  }

  function go(slug: string) {
    onNavigate();
    router.push(`/product/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onNavigate();
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(i => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(i => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[active];
      if (item) go(item.slug);
    }
  }

  return (
    <div className="search-panel overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]" onKeyDown={onKeyDown}>
      {/* Input row */}
      <div className="flex h-14 items-center gap-3 border-b border-line px-4">
        <Search className="size-[18px] shrink-0 text-ink-faint" aria-hidden />
        <input
          ref={inputRef}
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder="Search pieces…"
          aria-label="Search products"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
        />
        {query ? (
          <button
            onClick={() => onQueryChange("")}
            aria-label="Clear search"
            className="flex size-8 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-mist hover:text-ink"
          >
            <X className="size-4" aria-hidden />
          </button>
        ) : (
          <kbd className="hidden rounded-md border border-line bg-mist px-1.5 py-0.5 text-[10px] font-medium text-ink-faint sm:block">
            Esc
          </kbd>
        )}
      </div>

      {/* Body */}
      {query.trim() === "" ? (
        <nav aria-label="Browse categories" className="p-2">
          <p className="px-3 pb-1 pt-2 text-xs text-ink-faint">Browse</p>
          {categories.map(c => (
            <Link
              key={c.id}
              href={categoryHref(c.id)}
              onClick={onNavigate}
              className="flex min-h-11 items-center justify-between rounded-xl px-3 text-[15px] text-ink transition-colors hover:bg-mist"
            >
              {c.name}
              <ChevronRight className="size-4 text-ink-faint" aria-hidden />
            </Link>
          ))}
        </nav>
      ) : results.length ? (
        <ul role="listbox" aria-label="Search results" className="max-h-[46vh] overflow-y-auto p-2">
          {results.map((item, i) => (
            <li key={item.slug} role="option" aria-selected={i === active}>
              <button
                onClick={() => go(item.slug)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "flex min-h-14 w-full items-center gap-3 rounded-xl px-3 text-left transition-colors",
                  i === active && "bg-mist"
                )}
              >
                <span className="tint-media relative size-12 shrink-0 overflow-hidden rounded-xl" style={{ "--tint": item.tint } as React.CSSProperties}>
                  <Image src={item.image} alt="" data-studio fill preload={false} sizes="48px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1 truncate text-[15px] text-ink">{item.name}</span>
                <span className="shrink-0 text-[13px] tabular-nums text-ink-soft">
                  {item.soldOut ? "Sold out" : formatPrice(item.price)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-5 py-8 text-center">
          <p className="text-[15px] text-ink">
            No results for <span className="font-medium">“{query.trim()}”</span>
          </p>
          <p className="mt-1 text-[13px] text-ink-soft">Try another word, or browse the categories.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {categories.map(c => (
              <Link
                key={c.id}
                href={categoryHref(c.id)}
                onClick={onNavigate}
                className="flex h-9 items-center rounded-full bg-mist px-4 text-[13px] font-medium text-ink transition-colors hover:bg-[#e6e6e6]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Global ⌘K / Ctrl+K shortcut, bound next to the dialog that owns it. */
export function useSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onOpen]);
}
