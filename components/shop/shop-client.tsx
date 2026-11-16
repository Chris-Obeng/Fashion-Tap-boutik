"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ListBox, Select } from "@heroui/react";
import { shopSections, categoryHref } from "@/data/categories";
import type { Product } from "@/types";
import { ProductCard } from "@/components/shared/product-card";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc";

export function ShopClient({ products, category }: { products: Product[]; category: string }) {
  const [sort, setSort] = useState<Sort>("featured");
  const visible = useMemo(() => {
    if (sort === "featured") return products;
    return [...products].sort((a, b) => (sort === "price-asc" ? a.price - b.price : b.price - a.price));
  }, [products, sort]);

  const title = category === "all" ? "Shop everything" : shopSections.find(s => s.id === category)?.name ?? "Shop everything";

  return (
    <>
      <header className="container-shell pt-8 sm:pt-14">
        <h1 className="display text-[40px] text-ink sm:text-[56px]">{title}</h1>
        <nav aria-label="Categories" className="hide-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
          {shopSections.map(section => (
            <Link
              key={section.id}
              href={categoryHref(section.id)}
              aria-current={section.id === category ? "page" : undefined}
              className={cn(
                "press flex h-11 shrink-0 items-center rounded-full px-5 text-[14px] font-semibold",
                section.id === category ? "bg-ink text-white" : "bg-mist text-ink hover:bg-[#e6e6e6]"
              )}
            >
              {section.name}
            </Link>
          ))}
        </nav>
      </header>

      <div className="container-shell mt-6 flex items-center justify-between">
        <p className="text-[14px] text-ink-soft" aria-live="polite">
          {visible.length} {visible.length === 1 ? "piece" : "pieces"}
        </p>
        <Select
          aria-label="Sort products"
          selectedKey={sort}
          onSelectionChange={key => setSort((key as Sort) ?? "featured")}
        >
          <Select.Trigger className="h-11 w-fit gap-2 rounded-full border-0 bg-transparent pl-3 pr-9 text-[14px] font-semibold shadow-none">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="featured" textValue="Featured">
                Featured
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="price-asc" textValue="Price: low to high">
                Price: low to high
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="price-desc" textValue="Price: high to low">
                Price: high to low
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <div className="container-shell pb-16 pt-4 sm:pb-24">
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-12">
          {visible.map((product, i) => (
            <ProductCard key={product.id} product={product} preload={i < 4} />
          ))}
        </div>
      </div>
    </>
  );
}
