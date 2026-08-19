// lib/marketplace.ts
// Server-side data fetching for the public, unified shopping site.
// Unlike a per-store storefront, this pulls visible products across
// EVERY active store into one catalog, joining in product details and
// which store each item belongs to.

import { collection, query, where, limit, getDocs, documentId } from "firebase/firestore";
import { db } from "./firebase/client";

export interface MarketplaceProductVariant {
  size?: string;
  color?: string;
  stock?: number;
  basePrice?: number;
  retailPrice?: number;
}

export interface MarketplaceProduct {
  storeProductId: string;
  productId: string;
  storeId: string;
  storeName: string;
  vendorName: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  retailPrice: number;
  sku: string;
  stock: number;
  basePrice: number;
  variants: MarketplaceProductVariant[];
}

export const PAGE_SIZE = 24;
const MAX_LISTINGS = 240; // overall cap across all pages — keeps read costs sane

function buildProduct(sp: any, product: any, store: any): MarketplaceProduct {
  return {
    storeProductId: sp.id,
    productId: sp.productId,
    storeId: sp.storeId,
    storeName: store.storeName ?? "Store",
    vendorName: product.vendorName ?? "",
    name: product.name ?? "Unnamed product",
    description: product.description ?? "",
    images: Array.isArray(product.images) ? product.images : [],
    category: sp.category ?? product.category ?? "",
    tags: Array.isArray(product.tags) ? product.tags : [],
    retailPrice: sp.retailPrice ?? product.retailPrice ?? 0,
    sku: product.sku ?? "",
    stock: product.stock ?? 0,
    basePrice: product.basePrice ?? 0,
    variants: Array.isArray(product.variants) ? product.variants : [],
  };
}

/** Fetch every visible product across active stores (up to MAX_LISTINGS), unpaginated. */
async function fetchAllMarketplaceProducts(categoryFilter?: string): Promise<MarketplaceProduct[]> {
  // 1. Get active stores first — inactive/blocked/pending stores never show publicly
  const storesSnap = await getDocs(
    query(collection(db, "stores"), where("status", "==", "active"))
  );
  if (storesSnap.empty) return [];

  const storeMap = new Map<string, any>();
  storesSnap.docs.forEach(d => storeMap.set(d.id, d.data()));
  const activeStoreIds = new Set(storeMap.keys());

  // 2. Get visible store_products (optionally filtered by category)
  const constraints: any[] = [where("isVisible", "==", true)];
  if (categoryFilter) constraints.push(where("category", "==", categoryFilter));
  const spSnap = await getDocs(query(collection(db, "store_products"), ...constraints, limit(MAX_LISTINGS)));
  if (spSnap.empty) return [];

  const storeProducts = spSnap.docs
    .map(d => ({ id: d.id, ...d.data() } as any))
    .filter(sp => activeStoreIds.has(sp.storeId)); // drop listings from inactive stores

  if (storeProducts.length === 0) return [];

  // 3. Batch-fetch product details
  const productIds = [...new Set(storeProducts.map(sp => sp.productId).filter(Boolean))];
  const productMap = new Map<string, any>();
  for (let i = 0; i < productIds.length; i += 30) {
    const chunk = productIds.slice(i, i + 30);
    const pSnap = await getDocs(query(collection(db, "products"), where(documentId(), "in", chunk)));
    pSnap.docs.forEach(d => productMap.set(d.id, d.data()));
  }

  // 4. Assemble — skip listings whose product or store data is missing
  return storeProducts
    .map(sp => {
      const product = productMap.get(sp.productId);
      const store = storeMap.get(sp.storeId);
      if (!product || !store) return null;
      return buildProduct(sp, product, store);
    })
    .filter((p): p is MarketplaceProduct => p !== null);
}

/** Paginated product fetch for the homepage grid. Page numbers are 1-indexed. */
export async function getMarketplaceProductsPage(
  page: number,
  categoryFilter?: string,
  searchQuery?: string
): Promise<{ products: MarketplaceProduct[]; totalCount: number; totalPages: number; page: number }> {
  let all = await fetchAllMarketplaceProducts(categoryFilter);

  // Firestore has no native text search — filter the already-fetched set
  // by name/description/tags instead. Fine at this catalog size; a real
  // search index (Algolia/Typesense) would be the next step if the
  // catalog grows large enough for this to matter.
  if (searchQuery?.trim()) {
    const q = searchQuery.trim().toLowerCase();
    all = all.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  const totalCount = all.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const products = all.slice(start, start + PAGE_SIZE);
  return { products, totalCount, totalPages, page: safePage };
}

/** Fetch a single product listing by its store_products doc id, for the product detail page. */
export async function getMarketplaceProductById(storeProductId: string): Promise<MarketplaceProduct | null> {
  const spSnap = await getDocs(
    query(collection(db, "store_products"), where(documentId(), "==", storeProductId), limit(1))
  );
  if (spSnap.empty) return null;
  const sp = { id: spSnap.docs[0].id, ...spSnap.docs[0].data() } as any;
  if (!sp.isVisible) return null;

  const [productSnap, storeSnap] = await Promise.all([
    getDocs(query(collection(db, "products"), where(documentId(), "==", sp.productId), limit(1))),
    getDocs(query(collection(db, "stores"), where(documentId(), "==", sp.storeId), limit(1))),
  ]);
  if (productSnap.empty || storeSnap.empty) return null;
  const product = productSnap.docs[0].data();
  const store = storeSnap.docs[0].data();
  if (store.status !== "active") return null;

  return buildProduct(sp, product, store);
}

/** The canonical category list — matches admin's product-creation dropdown exactly. */
export const CATEGORIES = [
  "Electronics & Accessories", "Women's Shoes", "Men's Shoes",
  "Women's Clothing", "Men's Clothing", "Women's Bags", "Men's Bags",
  "Fitness & Sports", "Kitchen & Home", "Kids & Baby", "Beauty & Skincare", "General & Lifestyle",
];
