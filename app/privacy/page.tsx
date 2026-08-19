// app/privacy/page.tsx

export const metadata = {
  title: "Privacy Policy — TargetGlobal",
};

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100dvh", background: "#fafaf9" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 60px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1c1917", margin: "0 0 8px" }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: "#a8a29e", marginBottom: 32 }}>Last updated: placeholder — replace with your actual effective date</p>

        <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: "16px 20px", marginBottom: 32, fontSize: 13, color: "#9a3412", lineHeight: 1.7 }}>
          <strong>Note for the site owner:</strong> this is placeholder content. A real privacy policy
          needs to accurately reflect what data you actually collect (this site currently collects
          name, email, and order/browsing activity via Firebase), how long it's retained, and comply
          with regulations relevant to where your customers are located (e.g. GDPR, CCPA). Have this
          reviewed by a lawyer before publishing.
        </div>

        {[
          ["1. Information We Collect", "When you create an account, we collect your name and email address. When you place an order, we collect delivery and contact information necessary to fulfill it."],
          ["2. How We Use Your Information", "Your information is used to process orders, communicate with you about your account or purchases, and improve the platform."],
          ["3. Sharing With Merchants", "When you place an order, the merchant fulfilling it receives the information necessary to complete delivery — such as your name, shipping address, and contact details."],
          ["4. Data Storage", "Account and order data is stored using Firebase (Google Cloud) infrastructure."],
          ["5. Your Rights", "You may request access to, correction of, or deletion of your personal data by contacting support."],
          ["6. Changes to This Policy", "This policy may be updated periodically. Material changes will be reflected on this page."],
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
