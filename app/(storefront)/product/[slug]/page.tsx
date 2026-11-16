import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts, getRelated } from "@/lib/products";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductRail } from "@/components/shared/product-rail";
import { SectionHeading } from "@/components/shared/section-heading";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: [{ url: product.images[0], width: 1000, height: 1250, alt: product.name }],
    },
    alternates: { canonical: `/product/${product.slug}` },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelated(product);

  return (
    <div className="pb-28 md:pb-0">
      <div className="container-shell grid gap-10 pt-6 sm:pt-10 md:grid-cols-[1.1fr_.9fr] md:gap-12 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>
      <section className="container-shell pt-16 sm:pt-24">
        <SectionHeading title="You may also like" href="/shop" action="Shop all" />
        <ProductRail products={related} />
      </section>
    </div>
  );
}
