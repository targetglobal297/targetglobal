// app/product/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMarketplaceProductById } from "@/lib/marketplace";

const RED = "#dc2626";

export const revalidate = 120;

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getMarketplaceProductById(params.id);
  if (!product) notFound();

  return (
    <div style={{ minHeight: "100dvh", background: "#fafaf9" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "16px 20px 0" }}>
        <Link href="/" style={{ color: "#78716c", fontSize: 13, fontWeight: 600 }}>← Back to shop</Link>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>

          {/* Image */}
          <div style={{ background: "#f5f5f4", borderRadius: 16, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {product.images[0]
              ? <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: 48 }}>📦</span>}
          </div>

          {/* Details */}
          <div>
            {product.category && (
              <div style={{ fontSize: 11, fontWeight: 700, color: RED, textTransform: "uppercase" as const, letterSpacing: ".5px", marginBottom: 8 }}>
                {product.category}
              </div>
            )}
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1c1917", margin: "0 0 10px", lineHeight: 1.3 }}>
              {product.name}
            </h1>
            <div style={{ fontSize: 13, color: "#78716c", marginBottom: 20 }}>
              Sold by <strong style={{ color: "#44403c" }}>{product.storeName}</strong>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: RED, marginBottom: 20 }}>
              ${product.retailPrice.toFixed(2)}
            </div>
            {product.description && (
              <p style={{ fontSize: 14, color: "#57534e", lineHeight: 1.7, marginBottom: 28 }}>
                {product.description}
              </p>
            )}

            {/* Checkout not built yet — placeholder */}
            <button disabled style={{
              width: "100%", padding: "14px", borderRadius: 12, border: "none",
              background: "#e7e5e4", color: "#a8a29e", fontWeight: 700, fontSize: 14, cursor: "not-allowed",
            }}>
              Checkout coming soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
