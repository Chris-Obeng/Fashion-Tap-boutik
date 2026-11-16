import type { Product, CategoryId } from "@/types";

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;
const palette = {
  Sand: "#c8b89e", Ivory: "#f0ede5", Black: "#292825", Olive: "#77765c", Blue: "#859bab", Tan: "#9b7050",
};
type Seed = [string, string, number, CategoryId, string, string, (keyof typeof palette)[], string];
const seeds: Seed[] = [
  ["linen-everyday-shirt", "The Everyday Linen Shirt", 280, "women", "photo-1598554747436-c9293d6a588f", "photo-1602810318383-e386cc2a3ccf", ["Ivory", "Sand"], "An airy linen blend, an easy silhouette. The shirt you’ll reach for from slow mornings to evenings in Osu."],
  ["relaxed-linen-trousers", "Relaxed Linen Trousers", 320, "women", "photo-1594633312681-425c7b97ccd1", "photo-1506629082955-511b1aa562c8", ["Sand", "Black"], "A softly tailored wide leg with room to move. Made for warm Accra afternoons and wherever the day takes you."],
  ["essential-cotton-tee", "The Essential Cotton Tee", 160, "men", "photo-1521572163474-6864f9cf17ab", "photo-1586790170083-2f9ceadc732d", ["Ivory", "Black", "Olive"], "A better kind of basic. Substantial, breathable cotton with a relaxed shape and a neat ribbed neckline."],
  ["everyday-shoulder-bag", "Everyday Shoulder Bag", 380, "accessories", "photo-1548036328-c9fa89d128fa", "photo-1559563458-527698bf5295", ["Tan", "Black"], "Clean lines, a comfortable strap, and just enough space. Your everyday essentials, beautifully carried."],
  ["weekend-cotton-shirt", "Weekend Cotton Shirt", 290, "men", "photo-1596755094514-f87e34085b2c", "photo-1562157873-818bc0726f68", ["Blue", "Ivory"], "Crisp cotton meets an easy fit. Wear it open over a tee or buttoned up for an unhurried evening out."],
  ["soft-rib-tank", "Soft Rib Tank", 140, "women", "photo-1618354691373-d851c5c3a990", "photo-1524504388940-b1c1722653e1", ["Black", "Ivory"], "A close, comfortable fit in soft ribbed cotton. Simple enough to layer, considered enough to wear alone."],
  ["city-crossbody", "City Crossbody", 340, "accessories", "photo-1584917865442-de89df76afd3", "photo-1594223274512-ad4803739b7c", ["Black", "Tan"], "Light on your shoulder, generous on the inside. A hands-free companion for days around the city."],
  ["straight-leg-denim", "Straight Leg Denim", 360, "men", "photo-1542272604-787c3835535d", "photo-1541099649105-f69ad21f3246", ["Blue", "Black"], "An honest straight leg in durable denim. A timeless wash that only gets better with wear."],
  ["weekend-midi-dress", "Weekend Midi Dress", 420, "women", "photo-1515372039744-b8f02a3ae446", "photo-1496747611176-843222e1e57c", ["Sand", "Olive"], "An easy midi with gentle movement and a flattering waist. From a coffee date to Sunday lunch, effortlessly."],
  ["minimal-leather-slides", "Minimal Leather Slides", 240, "accessories", "photo-1543163521-1bf539c55dd2", "photo-1560343090-f0409e92791a", ["Tan", "Black"], "Understated slides with a softly cushioned footbed. Slip on, step out, slow down."],
  ["oversized-poplin-shirt", "Oversized Poplin Shirt", 310, "women", "photo-1523381210434-271e8be1f52b", "photo-1490481651871-ab68de25d43d", ["Ivory", "Blue"], "A generous cut with a crisp finish. Tuck it, layer it, or let it fall naturally."],
  ["tailored-chino", "The Tailored Chino", 350, "men", "photo-1473966968600-fa801b869a1a", "photo-1520975954732-35dd22299614", ["Sand", "Olive", "Black"], "A clean, tapered leg and a touch of stretch. Smart enough for work, comfortable enough for the weekend."],
  ["woven-market-tote", "Woven Market Tote", 260, "accessories", "photo-1590874103328-eac38a683ce7", "photo-1566150905458-1bf1fc113f0d", ["Sand", "Tan"], "Natural texture with everyday purpose. A roomy tote for market finds, beach days, and everything between."],
  ["easy-cotton-shorts", "Easy Cotton Shorts", 210, "men", "photo-1520367445093-50dc08a59d9d", "photo-1591195853828-11db59a44f6b", ["Sand", "Olive"], "Breathable cotton and a relaxed cut. Your warm-weather uniform, sorted."],
  ["soft-knit-cardigan", "Soft Knit Cardigan", 390, "women", "photo-1434389677669-e08b4cac3105", "photo-1556905055-8f358a7a47b2", ["Ivory", "Sand"], "A light layer for cool offices and breezy evenings. Soft to the touch, with simple tonal buttons."],
  ["classic-cotton-cap", "Classic Cotton Cap", 120, "accessories", "photo-1588850561407-ed78c282e89b", "photo-1622445275576-721325763afe", ["Sand", "Black", "Olive"], "A low-profile cap in washed cotton. An adjustable fit and nothing more than you need."],
  ["relaxed-overshirt", "Relaxed Overshirt", 450, "men", "photo-1611312449408-fcece27cdbb7", "photo-1445205170230-053b83016050", ["Black", "Olive"], "Structured but never stiff. A versatile overshirt to throw over the essentials you already love."],
  ["satin-evening-skirt", "Satin Evening Skirt", 330, "women", "photo-1583496661160-fb5886a0aaaa", "photo-1483985988355-763728e1935b", ["Black", "Sand"], "A fluid midi skirt with a subtle sheen. Pair with a simple tank and let the fabric do the talking."],
  ["canvas-everyday-tote", "Canvas Everyday Tote", 180, "accessories", "photo-1548863227-3af567fc3b27", "photo-1553062407-98eeb64c6a62", ["Ivory", "Black"], "Strong cotton canvas, comfortable handles, and space for your day. A little less disposable, a lot more useful."],
  ["textured-polo", "Textured Cotton Polo", 270, "men", "photo-1552374196-c4e7ffc6e126", "photo-1620799140408-edc6dcb6d633", ["Ivory", "Olive", "Black"], "A refined knit texture and an open collar. An effortless step up from your favourite tee."],
];
export const products: Product[] = seeds.map(([slug, name, price, category, first, second, colors, description], index) => ({
  id: `ft-${String(index + 1).padStart(3, "0")}`, slug, name, price: price * 100,
  ...(index === 8 ? { compareAtPrice: 48000 } : {}), description,
  images: [image(first), image(second)], category,
  colors: colors.map(name => ({ name, hex: palette[name] })),
  sizes: (category === "accessories" ? (slug.includes("slides") ? ["37", "38", "39", "40", "41"] : ["One size"]) : ["XS", "S", "M", "L", "XL"]).map((name, sizeIndex) => ({ name, stock: index === 16 ? 0 : sizeIndex === 0 && index % 3 === 0 && category !== "accessories" ? 0 : 5 + (index % 4) })),
  tags: [...(index < 8 ? ["new" as const] : []), ...(index < 4 || index === 8 || index === 11 ? ["featured" as const] : [])],
  details: category === "accessories" ? ["Considered construction and a clean, minimal finish.", "Wipe clean with a soft, dry cloth.", "Keep away from prolonged direct sunlight."] : ["Lightweight, breathable fabric selected for warm days.", "Relaxed, true-to-size fit. Size up for a looser silhouette.", "Gentle cold wash with similar colours. Air dry in the shade."],
}));
