# Product

<!-- impeccable:product-schema 1 -->

## Platform

web (mobile first; most shoppers arrive from TikTok on a phone)

## Users

Shoppers in Accra and across Ghana who follow Fashion Tap Boutik on TikTok and want to buy a piece they saw, quickly, on their phone. They know the store, trust it, and want a fast path from "I like that" to "it's in my bag".

## Product Purpose

The online storefront for Fashion Tap Boutik, an Accra boutique selling shoes, bags, clothes, purses, clutches and accessories. Success: a shopper finds a piece, picks a size or colour and checks out (delivery in Accra or pickup) with as few taps as possible.

## Positioning

A small, personal Accra boutique with a 54K-follower TikTok audience, presented with the polish of a global luxury retailer. The store wants its catalogue shown as luxury product (owner direction).

## Capabilities and Constraints

- Frontend only for now. Supabase backend and an admin dashboard come later; `lib/products.ts` and `lib/payments.ts` are the seams to swap.
- Products are placeholder data from SceneSKU (`data/curation.json` + `data/scenesku.json`, synced by `pnpm sync:products`). Prices are illustrative GH₵ values, not real store prices.
- Guest checkout only: delivery across Accra areas or pickup, Paystack (card / Mobile Money) mocked.
- Keep it simple: no accounts, wishlists, reviews or other extra features unless asked.

## Brand Commitments

- Name: Fashion Tap Boutik, Accra, Ghana.
- Verified channels: TikTok [@fashiontapboutik](https://www.tiktok.com/@fashiontapboutik), WhatsApp 024 944 6921 (from the TikTok bio). No verified Instagram or Facebook account was found; do not link guesses.
- Visual reference pinned by the owner: beatsbydre.com and apple.com (clean, image-led, generous, very little text).

## Evidence on Hand

No real product photography, testimonials, reviews or press yet. Do not invent them.

## Product Principles

1. Fewer words, bigger pictures. Every line of copy must earn its place.
2. One obvious next action per screen.
3. Thumb-first: every primary control is reachable and at least 44px on a phone.
4. Trust through clarity: prices, delivery fees and returns are plain and visible before payment.
