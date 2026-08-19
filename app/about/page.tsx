// app/about/page.tsx

const RED = "#dc2626";
const SLATE = "#44403c";

export const metadata = {
  title: "Who We Are — TargetGlobal",
  description: "Learn about TargetGlobal — connecting independent merchants with shoppers worldwide.",
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100dvh", background: "#fafaf9" }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 20px 60px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: RED, textTransform: "uppercase" as const, letterSpacing: "1.5px", marginBottom: 10 }}>
          Who We Are
        </div>
        <h1 style={{ fontSize: "clamp(24px, 5.5vw, 32px)", fontWeight: 800, color: "#1c1917", margin: "0 0 20px", letterSpacing: "-.5px" }}>
          A global marketplace built on independent merchants
        </h1>
        <p style={{ fontSize: 15, color: "#57534e", lineHeight: 1.8, marginBottom: 20 }}>
          TargetGlobal connects shoppers with a growing network of independent merchants selling
          premium products worldwide — from electronics and fashion to home and lifestyle goods.
          Every listing on this site comes from a real merchant running their own store on our platform,
          not a single centralized warehouse.
        </p>
        <p style={{ fontSize: 15, color: "#57534e", lineHeight: 1.8, marginBottom: 20 }}>
          Our merchants source and manage their own catalogs, and we handle the technology, payments
          infrastructure, and logistics coordination that let them sell to customers anywhere —
          without needing to hold inventory themselves. That's the dropshipping model, and it's the
          foundation this whole platform is built on. Here's exactly how it works.
        </p>

        <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 16, padding: 28, marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#a8a29e", textTransform: "uppercase" as const, letterSpacing: ".5px", marginBottom: 8 }}>
            Company
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#1c1917", marginBottom: 4 }}>
            {new Date().getFullYear()}
          </div>
          <div style={{ fontSize: 11, color: "#a8a29e", textTransform: "uppercase" as const, letterSpacing: ".5px" }}>Active platform</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 16, padding: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 20 }}>
          {[
            { label: "Merchants", value: "Growing daily" },
            { label: "Categories", value: "12+" },
            { label: "Reach", value: "Worldwide" },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: "center" as const }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: RED, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "#a8a29e", textTransform: "uppercase" as const, letterSpacing: ".5px" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── How Dropshipping Works ── */}
        <div style={{ marginTop: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: RED, textTransform: "uppercase" as const, letterSpacing: "1.5px", marginBottom: 10 }}>
            How It Works
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1c1917", margin: "0 0 16px", letterSpacing: "-.4px" }}>
            What is dropshipping, exactly?
          </h2>
          <p style={{ fontSize: 15, color: "#57534e", lineHeight: 1.8, marginBottom: 32 }}>
            Dropshipping is a retail model where a merchant sells products without physically stocking
            them. Instead of buying inventory upfront and storing it in a warehouse, the merchant lists
            a product, and only when a customer actually buys it does the merchant arrange for that
            specific item to be sourced and shipped — often directly from a supplier to the customer's
            door. It's how independent sellers on this platform can offer a wide range of products
            without the upfront cost or risk of traditional retail.
          </p>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: 14, marginBottom: 8 }}>
            {[
              ["1", "You place an order", "You browse and buy a product from a merchant's store on TargetGlobal, just like any online purchase."],
              ["2", "The merchant fulfills it", "The merchant sources that specific item and arranges delivery — they don't need to have it sitting in a warehouse ahead of time."],
              ["3", "It ships to you", "Your order is tracked through processing, shipping, and delivery, same as a traditional online order."],
              ["4", "The merchant earns their margin", "The merchant's profit comes from the difference between what they paid to source the item and what you paid for it."],
            ].map(([num, title, body]) => (
              <div key={num} style={{ display: "flex", gap: 16, background: "#fff", border: "1px solid #e7e5e4", borderRadius: 14, padding: "18px 20px" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 9, background: SLATE, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 13, flexShrink: 0,
                }}>
                  {num}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1c1917", marginBottom: 3 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "#78716c", lineHeight: 1.6 }}>{body}</div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13, color: "#a8a29e", lineHeight: 1.8, marginTop: 20 }}>
            Because merchants aren't carrying large amounts of pre-purchased inventory, this model lets
            them offer a wider catalog and pass on the flexibility to shoppers — while TargetGlobal
            handles the platform, payments coordination, and order tracking that ties it all together.
          </p>
        </div>

        {/* ── Benefits — two columns ── */}
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 16, padding: 26 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1c1917", margin: "0 0 14px" }}>What this means for shoppers</h3>
            {[
              ["Wider selection", "Merchants aren't limited by warehouse space, so catalogs can span far more categories and styles than a traditional single-inventory store."],
              ["Prices reflect real sourcing costs", "Without the overhead of holding unsold stock, merchants can often price more competitively."],
              ["Every store is independently run", "You're buying from a specific merchant with their own reputation to protect — not an anonymous fulfillment center."],
            ].map(([t, b]) => (
              <div key={t} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#44403c", marginBottom: 3 }}>{t}</div>
                <div style={{ fontSize: 13, color: "#78716c", lineHeight: 1.6 }}>{b}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 16, padding: 26 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1c1917", margin: "0 0 14px" }}>What this means for merchants</h3>
            {[
              ["No upfront inventory risk", "List a product without first buying and storing hundreds of units — you only source what's actually been ordered."],
              ["Lower barrier to starting", "Launching a store doesn't require warehouse space, staff, or large capital tied up in stock."],
              ["Focus on running the business", "TargetGlobal handles the platform, payment coordination, and order tracking — merchants focus on their catalog and customers."],
            ].map(([t, b]) => (
              <div key={t} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#44403c", marginBottom: 3 }}>{t}</div>
                <div style={{ fontSize: 13, color: "#78716c", lineHeight: 1.6 }}>{b}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginTop: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1c1917", margin: "0 0 18px", letterSpacing: "-.3px" }}>
            Common questions about how this works
          </h2>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
            {[
              ["Why might delivery take longer than a big-box retailer?", "Because items are sourced per order rather than pulled from a local warehouse, delivery timelines depend on the individual merchant and product. Each merchant sets and communicates their own expected delivery window."],
              ["Who do I contact if there's an issue with my order?", "The merchant who fulfilled your order is your first point of contact for order-specific questions — they know the specifics of your purchase. For anything you can't resolve with them, TargetGlobal support is available too."],
              ["Are merchants on this platform vetted?", "Yes — every merchant goes through an identity verification process before their store goes live and becomes visible to shoppers."],
              ["Why does pricing vary between similar products?", "Each merchant sets their own pricing based on their own sourcing costs and margins, since they're running independent stores rather than a single centralized catalog."],
            ].map(([q, a]) => (
              <div key={q} style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1c1917", marginBottom: 6 }}>{q}</div>
                <div style={{ fontSize: 13, color: "#78716c", lineHeight: 1.7 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
