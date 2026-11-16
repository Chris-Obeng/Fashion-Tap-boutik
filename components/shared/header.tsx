"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { ChevronRight, Menu, Search, ShoppingBag } from "lucide-react";
import { Button, Drawer } from "@heroui/react";
import { SearchDialog, useSearchShortcut } from "@/components/shared/search-dialog";
import { Logo } from "@/components/shared/logo";
import { TikTokIcon, WhatsAppIcon } from "@/components/shared/social-icons";
import { categories, categoryHref } from "@/data/categories";
import { useBagUI, useCart, cartCount } from "@/store/cart";
import { site, whatsappHref } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { SearchItem } from "@/types";

const navLinks = categories.map(c => ({ id: c.id, name: c.name, href: categoryHref(c.id) }));

function DesktopNav() {
  const pathname = usePathname();
  const params = useSearchParams();
  const active = pathname === "/shop" ? params.get("category") : null;
  return (
    <nav aria-label="Main" className="hidden items-center justify-center gap-7 lg:flex">
      {navLinks.map(link => (
        <Link
          key={link.id}
          href={link.href}
          aria-current={active === link.id ? "page" : undefined}
          className={cn(
            "relative py-2 text-[14px] font-medium transition-colors hover:text-ink",
            active === link.id ? "text-ink" : "text-ink-soft"
          )}
        >
          {link.name}
          {active === link.id && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-ink" />}
        </Link>
      ))}
    </nav>
  );
}

export function Header({ searchItems }: { searchItems: SearchItem[] }) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const count = useCart(s => cartCount(s.items));
  const openBag = useBagUI(s => s.setOpen);

  useSearchShortcut(useCallback(() => setSearch(true), []));

  return (
    <>
      <header className="translucent sticky top-0 z-40 bg-white/85 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto grid h-14 w-full max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-2 sm:px-6 lg:h-16 lg:grid-cols-[auto_1fr_auto] lg:gap-8 lg:px-10">
          <div className="flex items-center">
            <Button
              variant="ghost"
              isIconOnly
              className="size-11 lg:hidden"
              aria-label="Open menu"
              onPress={() => setMenu(true)}
            >
              <Menu className="size-[22px] stroke-[1.75]" />
            </Button>
            <Logo className="hidden lg:inline-flex" />
          </div>
          <Logo className="lg:hidden" />
          <Suspense fallback={<div className="hidden lg:block" />}>
            <DesktopNav />
          </Suspense>
          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              isIconOnly
              className="size-11"
              aria-label="Search products"
              onPress={() => setSearch(true)}
            >
              <Search className="size-[21px] stroke-[1.75]" />
            </Button>
            <Button
              variant="ghost"
              isIconOnly
              className="relative size-11"
              aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
              onPress={() => openBag(true)}
            >
              <ShoppingBag className="size-[21px] stroke-[1.75]" />
              {count > 0 && (
                <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold leading-none text-white tabular-nums">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </div>
        <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      </header>

      <Drawer isOpen={menu} onOpenChange={setMenu}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="w-full gap-0 p-0 sm:w-[400px]">
              <Drawer.CloseTrigger className="absolute end-3 top-3 z-20" />
              <Drawer.Body className="flex min-h-0 flex-1 flex-col overflow-y-auto p-0">
                <Drawer.Heading className="sr-only">Menu</Drawer.Heading>
                <div className="flex h-14 items-center px-5">
                  <Logo />
                </div>
                <nav aria-label="Mobile" className="mt-2 flex flex-col px-3">
                  {categories.map(c => (
                    <Link
                      key={c.id}
                      href={categoryHref(c.id)}
                      onClick={() => setMenu(false)}
                      className="press group flex min-h-[68px] items-center gap-4 rounded-2xl px-2 active:bg-mist"
                    >
                      <span
                        className="tint-media relative size-12 shrink-0 overflow-hidden rounded-full"
                        style={{ "--tint": c.tint } as React.CSSProperties}
                      >
                        <Image src={c.image} alt="" data-studio fill sizes="48px" className="object-cover" />
                      </span>
                      <span className="flex-1 text-[22px] font-semibold tracking-[-0.02em] text-ink">{c.name}</span>
                      <ChevronRight className="size-5 text-ink-faint" aria-hidden />
                    </Link>
                  ))}
                  <Link
                    href="/shop"
                    onClick={() => setMenu(false)}
                    className="mx-2 mt-3 flex min-h-12 items-center border-t border-line pt-3 text-[17px] font-medium text-ink"
                  >
                    Shop everything
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setMenu(false)}
                    className="mx-2 flex min-h-12 items-center text-[17px] font-medium text-ink"
                  >
                    Your orders
                  </Link>
                </nav>
                <div className="safe-bottom mt-auto grid grid-cols-2 gap-2 px-5 pt-8">
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="press flex h-12 items-center justify-center gap-2 rounded-full bg-mist text-[14px] font-semibold text-ink"
                  >
                    <WhatsAppIcon className="size-[18px] text-[#25d366]" /> WhatsApp
                  </a>
                  <a
                    href={site.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="press flex h-12 items-center justify-center gap-2 rounded-full bg-mist text-[14px] font-semibold text-ink"
                  >
                    <TikTokIcon className="size-[16px]" /> TikTok
                  </a>
                </div>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>

      <SearchDialog open={search} onOpenChange={setSearch} items={searchItems} />
    </>
  );
}
