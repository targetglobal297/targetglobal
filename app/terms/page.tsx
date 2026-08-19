// app/terms/page.tsx

export const metadata = {
  title: "Terms of Service — TargetGlobal",
};

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100dvh", background: "#fafaf9" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 60px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1c1917", margin: "0 0 8px" }}>Terms of Service</h1>
        <p style={{ fontSize: 13, color: "#a8a29e", marginBottom: 32 }}>Last updated: placeholder — replace with your actual effective date</p>

        <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: "16px 20px", marginBottom: 32, fontSize: 13, color: "#9a3412", lineHeight: 1.7 }}>
          <strong>Note for the site owner:</strong> this is placeholder content, not real legal terms.
          Have this reviewed and completed by a lawyer before relying on it — it covers marketplace
          basics but hasn't been drafted for your specific jurisdiction, liability needs, or dispute
          process.
        </div>

        {[
          ["1. About TargetGlobal", "TargetGlobal is a marketplace connecting independent merchants with shoppers. Products listed on this site are sold by individual merchants operating their own stores on our platform, not by TargetGlobal directly."],
          ["2. Orders & Payment", "When you place an order, you are entering into a transaction with the merchant selling that product. Payment terms, delivery timelines, and order fulfillment are coordinated through the TargetGlobal platform on the merchant's behalf."],
          ["3. Returns & Disputes", "Return and refund policies may vary by merchant. Contact the merchant directly for order-specific issues, or reach out to TargetGlobal support if you're unable to resolve an issue with a merchant."],
          ["4. Merchant Responsibilities", "Merchants are responsible for the accuracy of their product listings, the quality of goods sold, and timely fulfillment of orders placed through their store."],
          ["5. Account Terms", "You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials."],
          ["6. Changes to These Terms", "TargetGlobal may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms."],
        ].map(([title, body]) => (
          <div key={title} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1c1917", marginBottom: 6 }}>{title}</h2>
            <p style={{ fontSize: 14, color: "#57534e", lineHeight: 1.8 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
