// app/page.tsx
import Link from "next/link";
import { getMarketplaceProductsPage, CATEGORIES } from "@/lib/marketplace";
import HeroCarousel from "@/components/HeroCarousel";

const RED = "#dc2626";
const SLATE = "#44403c";

export const revalidate = 120; // refresh catalog at most every 2 minutes

// Small custom line icons — drawn here directly rather than sourced from
// anywhere, so there's no licensing question and they match the brand exactly.
function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IconPackage() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8M12 13v8" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

const TRUST_ITEMS = [
  { Icon: IconGlobe, title: "Worldwide Reach", body: "Merchants and shoppers connect across borders." },
  { Icon: IconShield, title: "Verified Merchants", body: "Every store goes through identity verification before going live." },
  { Icon: IconPackage, title: "Order Tracking", body: "Follow your order from placed to delivered." },
  { Icon: IconChat, title: "Real Support", body: "Reach merchants and our team directly with questions." },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; page?: string; search?: string };
}) {
  const activeCategory = searchParams.category;
  const activeSearch = searchParams.search;
  const pageNum = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
  const { products, totalCount, totalPages, page } = await getMarketplaceProductsPage(pageNum, activeCategory, activeSearch);

  // Preserve the active category/search when building page links
  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (activeCategory) params.set("category", activeCategory);
    if (activeSearch) params.set("search", activeSearch);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/${qs ? `?${qs}` : ""}#products`;
  }

  return (
    <div style={{ minHeight: "100dvh", background: "#fafaf9" }}>
      <HeroCarousel />

      {/* Why Shop With Us — trust signals */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "28px 20px",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20,
        }}>
          {TRUST_ITEMS.map(({ Icon, title, body }) => (
            <div key={title}>
              <div style={{ marginBottom: 10 }}><Icon /></div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1c1917", marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#78716c", lineHeight: 1.6 }}>{body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works — brief teaser, full explanation lives on /about */}
      <div style={{ background: "#fafaf9", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1c1917", margin: "0 0 6px" }}>How TargetGlobal works</h2>
          <p style={{ fontSize: 13, color: "#78716c", marginBottom: 18, maxWidth: 560, lineHeight: 1.6 }}>
            Every product here is sold by an independent merchant who sources it specifically for your order — not pulled from a shared warehouse.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 16 }}>
            {[
              ["1", "You order from a merchant's store"],
              ["2", "They source and ship it to you"],
              ["3", "You track it to delivery"],
            ].map(([num, label]) => (
              <div key={num} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, background: SLATE, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                  {num}
                </div>
                <span style={{ fontSize: 13, color: "#44403c", fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
          <Link href="/about" style={{ fontSize: 13, fontWeight: 700, color: RED }}>Read the full explanation →</Link>
        </div>
      </div>

      {/* Shop by Category — visual tiles */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px 8px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1c1917", margin: "0 0 16px" }}>Shop by Category</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
          {CATEGORIES.map(cat => (
            <Link key={cat} href={`/?category=${encodeURIComponent(cat)}#products`} style={{
              background: "#fff", border: "1px solid #e7e5e4", borderRadius: 12, padding: "16px 12px",
              textAlign: "center" as const,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#44403c" }}>{cat}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Category filter bar */}
      <div id="products" style={{ background: "#fff", borderBottom: "1px solid #e7e5e4", position: "sticky", top: 0, zIndex: 10, marginTop: 24, scrollMarginTop: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 20px", display: "flex", gap: 8, overflowX: "auto" }}>
          <Link href="/" style={{
            flexShrink: 0, padding: "7px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700,
            background: !activeCategory ? RED : "#f5f5f4",
            color: !activeCategory ? "#fff" : "#57534e",
            whiteSpace: "nowrap" as const,
          }}>
            All
          </Link>
          {CATEGORIES.map(cat => (
            <Link key={cat} href={`/?category=${encodeURIComponent(cat)}`} style={{
              flexShrink: 0, padding: "7px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700,
              background: activeCategory === cat ? RED : "#f5f5f4",
              color: activeCategory === cat ? "#fff" : "#57534e",
              whiteSpace: "nowrap" as const,
            }}>
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 60px" }}>
        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#78716c" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🛍️</div>
            <p style={{ fontSize: 14 }}>
              {activeSearch ? `No products match "${activeSearch}".` : activeCategory ? "No products in this category yet." : "No products listed yet."}
            </p>
          </div>
        ) : (
          <>
            {activeSearch && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#1c1917" }}>Results for "{activeSearch}"</span>
                <Link href={activeCategory ? `/?category=${encodeURIComponent(activeCategory)}` : "/"} style={{ fontSize: 12, color: RED, fontWeight: 700 }}>Clear search</Link>
              </div>
            )}
            <div style={{ fontSize: 13, color: "#78716c", marginBottom: 16 }}>
              Showing {products.length} of {totalCount} product{totalCount === 1 ? "" : "s"}
              {totalPages > 1 && <> — page {page} of {totalPages}</>}
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 18,
            }}>
              {products.map(p => (
                <Link key={p.storeProductId} href={`/product/${p.storeProductId}`} className="fu" style={{
                  background: "#fff", borderRadius: 14, overflow: "hidden",
                  border: "1px solid #e7e5e4", display: "flex", flexDirection: "column",
                }}>
                  <div style={{ aspectRatio: "1/1", background: "#f5f5f4", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {p.images[0]
                      ? <img src={p.images[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span style={{ fontSize: 28 }}>📦</span>}
                  </div>
                  <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1c1917", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 10, color: "#a8a29e", marginBottom: 8 }}>
                      {p.storeName}
                    </div>
                    <div style={{ marginTop: "auto", fontWeight: 800, fontSize: 15, color: RED }}>
                      ${p.retailPrice.toFixed(2)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Page number controls */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 36, flexWrap: "wrap" as const }}>
                <Link
                  href={pageHref(page - 1)}
                  aria-disabled={page <= 1}
                  style={{
                    padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                    background: "#fff", border: "1px solid #e7e5e4",
                    color: page <= 1 ? "#d6d3d1" : "#44403c",
                    pointerEvents: page <= 1 ? "none" : "auto",
                  }}
                >
                  ← Prev
                </Link>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .map((p, i, arr) => (
                    <span key={p} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {i > 0 && arr[i - 1] !== p - 1 && <span style={{ color: "#d6d3d1", fontSize: 13 }}>…</span>}
                      <Link href={pageHref(p)} style={{
                        width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 700,
                        background: p === page ? RED : "#fff",
                        color: p === page ? "#fff" : "#44403c",
                        border: p === page ? "none" : "1px solid #e7e5e4",
                      }}>
                        {p}
                      </Link>
                    </span>
                  ))}

                <Link
                  href={pageHref(page + 1)}
                  aria-disabled={page >= totalPages}
                  style={{
                    padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                    background: "#fff", border: "1px solid #e7e5e4",
                    color: page >= totalPages ? "#d6d3d1" : "#44403c",
                    pointerEvents: page >= totalPages ? "none" : "auto",
                  }}
                >
                  Next →
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
