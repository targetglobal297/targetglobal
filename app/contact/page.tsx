// app/contact/page.tsx

const RED = "#dc2626";
const SUPPORT_EMAIL = "support@targetglobal.org";

export const metadata = {
  title: "Contact Us — TargetGlobal",
  description: "Get in touch with the TargetGlobal team.",
};

export default function ContactPage() {
  return (
    <div style={{ minHeight: "100dvh", background: "#fafaf9" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px 60px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: RED, textTransform: "uppercase" as const, letterSpacing: "1.5px", marginBottom: 10 }}>
          Contact Us
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1c1917", margin: "0 0 16px", letterSpacing: "-.5px" }}>
          We're here to help
        </h1>
        <p style={{ fontSize: 15, color: "#57534e", lineHeight: 1.8, marginBottom: 32 }}>
          Have a question about an order, a merchant, or the platform itself? Reach out and our team
          will get back to you.
        </p>

        <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#a8a29e", textTransform: "uppercase" as const, letterSpacing: ".5px", marginBottom: 8 }}>
            Email us
          </div>
          <a href={`mailto:${SUPPORT_EMAIL}`} style={{ fontSize: 18, fontWeight: 700, color: RED }}>
            {SUPPORT_EMAIL}
          </a>
          <p style={{ fontSize: 13, color: "#78716c", marginTop: 10, lineHeight: 1.7 }}>
            We typically respond within 1–2 business days.
          </p>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#a8a29e", textTransform: "uppercase" as const, letterSpacing: ".5px", marginBottom: 8 }}>
            Already have an order?
          </div>
          <p style={{ fontSize: 14, color: "#57534e", lineHeight: 1.7 }}>
            The merchant who fulfilled your order is your fastest point of contact for order-specific
            questions — shipping status, returns, and delivery details. For anything else, email us above.
          </p>
        </div>
      </div>
    </div>
  );
}
