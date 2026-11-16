"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ChevronRight, Menu, Search, ShoppingBag } from "lucide-react";
import { Button, Drawer } from "@heroui/react";
import { SearchDialog, useSearchShortcut } from "@/components/shared/search-dialog";
import { Logo } from "@/components/shared/logo";
import { categories, categoryHref } from "@/data/categories";
import { useBagUI, useCart, cartCount } from "@/store/cart";
import { site } from "@/lib/config";
import type { SearchItem } from "@/types";

const links = [
  { name: "Shop all", href: "/shop" },
  ...categories.map(c => ({ name: c.name, href: categoryHref(c.id) })),
];

export function Header({ searchItems }: { searchItems: SearchItem[] }) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const count = useCart(s => cartCount(s.items));
  const openBag = useBagUI(s => s.setOpen);

  useSearchShortcut(useCallback(() => setSearch(true), []));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="container-shell grid h-12 grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              isIconOnly
              className="-ml-2 size-11 lg:hidden"
              aria-label="Open menu"
              onPress={() => setMenu(true)}
            >
              <Menu className="size-[18px]" />
            </Button>
            <div className="hidden lg:block">
              <Logo />
            </div>
          </div>
          <div className="lg:hidden">
            <Logo />
          </div>
          <nav aria-label="Main" className="hidden items-center justify-center gap-8 lg:flex">
            {links.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-ink-soft transition-colors hover:text-ink"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex justify-end gap-0.5">
            <Button
              variant="ghost"
              isIconOnly
              className="size-11"
              aria-label="Search products"
              onPress={() => setSearch(true)}
            >
              <Search className="size-[18px]" />
            </Button>
            <Button
              variant="ghost"
              isIconOnly
              className="relative size-11"
              aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
              onPress={() => openBag(true)}
            >
              <ShoppingBag className="size-[18px]" />
              {count > 0 && (
                <span className="absolute right-0 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] font-medium leading-none text-white">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <Drawer isOpen={menu} onOpenChange={setMenu}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="w-full gap-0 p-0 sm:w-[380px]">
              <Drawer.CloseTrigger className="absolute end-3 top-3 z-20" />
              <Drawer.Body className="flex min-h-0 flex-1 flex-col p-0">
                <Drawer.Heading className="px-6 pt-6 text-[13px] font-normal text-ink-faint">Menu</Drawer.Heading>
                <nav aria-label="Mobile" className="mt-2 flex flex-col px-6">
                  {links.map(link => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMenu(false)}
                      className="flex min-h-14 items-center justify-between border-b border-line text-[17px] font-medium text-ink"
                    >
                      {link.name}
                      <ChevronRight className="size-4 text-ink-faint" aria-hidden />
                    </Link>
                  ))}
                  <Link
                    href="/orders"
                    onClick={() => setMenu(false)}
                    className="flex min-h-14 items-center justify-between text-[17px] font-medium text-ink"
                  >
                    Your orders
                    <ChevronRight className="size-4 text-ink-faint" aria-hidden />
                  </Link>
                </nav>
                <a
                  href={site.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto px-6 pb-8 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  Find us on TikTok
                </a>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>

      <SearchDialog open={search} onOpenChange={setSearch} items={searchItems} />
    </>
  );
}
