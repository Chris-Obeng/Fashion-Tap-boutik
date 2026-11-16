# Product

<!-- impeccable:product-schema 1 -->

## Platform

web (mobile first; most shoppers arrive from TikTok on a phone)

## Users

Shoppers in Accra and across Ghana who follow Fashion Tap Boutik on TikTok and want to buy a piece they saw, quickly, on their phone. They know the store, trust it, and want a fast path from "I like that" to "it's in my bag".

## Product Purpose

The online storefront for Fashion Tap Boutik, an Accra boutique selling shoes, bags, clothes, purses, clutches, T-shirts and accessories (per its TikTok bio). It delivers nationwide across Ghana. Success: a shopper finds a piece, picks a size or colour and checks out (delivery anywhere in Ghana, or pickup in Osu) with as few taps as possible.

## Positioning

A small, personal Accra boutique with a 54K-follower TikTok audience, presented with the polish of a global luxury retailer. The store wants its catalogue shown as luxury product (owner direction).

## Capabilities and Constraints

- Frontend only for now. Supabase backend and an admin dashboard come later; `lib/products.ts` and `lib/payments.ts` are the seams to swap.
- Products are placeholder data from SceneSKU and DummyJSON (`data/curation.json` + `data/scenesku.json` + `data/dummyjson.json`, synced by `pnpm sync:products`). Prices, stock and delivery fees are illustrative, not real store values.
- Delivery is nationwide: Greater Accra by area (same or next day), other regions by courier (2–4 working days), plus free pickup in Osu.
- Some DummyJSON renders show third-party brand marks (e.g. on a watch dial and a tote). They are demo placeholders only and must be replaced with the store's own photos before launch.
- Guest checkout only: delivery across Accra areas or pickup, Paystack (card / Mobile Money) mocked.
- Keep it simple: no accounts, wishlists, reviews or other extra features unless asked.

## Brand Commitments

- Name: Fashion Tap Boutik, Accra, Ghana. The logo artwork reads "Fashion Tap BOUTIQUE" (figure in a polka-dot dress, pink script). Source: TikTok avatar, processed into `public/brand/logo.png`, `logo-light.png`, `app/icon.png`.
- Brand pink from the logo (#E5087F; #D4006F for text).
- Verified channels: TikTok [@fashiontapboutik](https://www.tiktok.com/@fashiontapboutik), WhatsApp 024 944 6921 (from the TikTok bio). Instagram [@fashion_tap_boutik](https://www.instagram.com/fashion_tap_boutik/) and [Facebook](https://www.facebook.com/p/Fashion-Tap-Boutique-100065018320292/) confirmed by the owner.
- Visual reference pinned by the owner: beatsbydre.com and apple.com (clean, image-led, generous, very little text).

## Evidence on Hand

No real product photography, testimonials, reviews or press yet. Do not invent them.

## Product Principles

1. Fewer words, bigger pictures. Every line of copy must earn its place.
2. One obvious next action per screen.
3. Thumb-first: every primary control is reachable and at least 44px on a phone.
4. Trust through clarity: prices, delivery fees and returns are plain and visible before payment.
