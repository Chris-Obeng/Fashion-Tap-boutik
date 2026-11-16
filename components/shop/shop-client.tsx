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

  const title = category === "all" ? "Shop all" : shopSections.find(s => s.id === category)?.name ?? "Shop all";

  return (
    <>
      <header className="container-shell pt-10 sm:pt-16">
        <h1 className="display text-[36px] text-ink sm:text-[48px]">{title}</h1>
        <nav aria-label="Categories" className="hide-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
          {shopSections.map(section => (
            <Link
              key={section.id}
              href={categoryHref(section.id)}
              aria-current={section.id === category ? "page" : undefined}
              className={cn(
                "flex h-11 shrink-0 items-center rounded-full px-4 text-[13px] font-medium",
                section.id === category ? "bg-ink text-white" : "bg-soft text-ink hover:bg-[#e8e8ed]"
              )}
            >
              {section.name}
            </Link>
          ))}
        </nav>
      </header>

      <div className="container-shell mt-8 flex items-center justify-between border-b border-line pb-3">
        <p className="text-sm text-ink-soft" aria-live="polite">
          {visible.length} {visible.length === 1 ? "piece" : "pieces"}
        </p>
        <Select
          aria-label="Sort products"
          selectedKey={sort}
          onSelectionChange={key => setSort((key as Sort) ?? "featured")}
        >
          <Select.Trigger className="h-11 w-fit border-0 bg-transparent px-2 text-[13px] shadow-none">
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

      <div className="container-shell py-8">
        <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-11">
          {visible.map((product, i) => (
            <ProductCard key={product.id} product={product} preload={i < 4} />
          ))}
        </div>
      </div>
    </>
  );
}
