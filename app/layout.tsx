// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import { CATEGORIES } from "@/lib/marketplace";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TargetGlobal — Shop",
  description: "Shop premium products from independent merchants worldwide.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#44403c",
};

const MERCHANT_APP_URL = "https://targetglobal-usa.vercel.app";
const SLATE = "#44403c";

const FOOTER_COLUMNS = [
  {
    heading: "Shop",
    links: CATEGORIES.slice(0, 5).map(c => ({ label: c, href: `/?category=${encodeURIComponent(c)}` })),
  },
  {
    heading: "Company",
    links: [
      { label: "Who We Are", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "For Merchants",
    links: [
      { label: "Sell With Us", href: `${MERCHANT_APP_URL}/signup` },
      { label: "Merchant Login", href: `${MERCHANT_APP_URL}/login` },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <SiteHeader />

        <main>{children}</main>

        {/* Site-wide footer */}
        <footer style={{ background: SLATE, padding: "44px 20px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 28,
              paddingBottom: 32,
              marginBottom: 24,
              borderBottom: "1px solid rgba(255,255,255,.1)",
            }}>
              {/* Brand blurb column */}
              <div style={{ gridColumn: "span 1" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "#fff", fontWeight: 900, fontSize: 11 }}>TG</span>
                  </div>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>TargetGlobal</span>
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.45)", lineHeight: 1.7 }}>
                  A global marketplace connecting independent merchants with shoppers worldwide.
                </p>
              </div>

              {FOOTER_COLUMNS.map(col => (
                <div key={col.heading}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.4)", textTransform: "uppercase" as const, letterSpacing: "1px", marginBottom: 14 }}>
                    {col.heading}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                    {col.links.map(l => (
                      <Link key={l.href} href={l.href} style={{ fontSize: 13, color: "rgba(255,255,255,.65)" }}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", textAlign: "center" as const }}>
              © {new Date().getFullYear()} TargetGlobal. All rights reserved.
            </div>
          </div>
        </footer>

        <style>{`
          *, *::before, *::after { box-sizing:border-box; }
          html, body { overflow-x:hidden; max-width:100vw; -webkit-text-size-adjust:100%; margin:0; padding:0; }
          body { font-family: var(--font-jakarta), "Plus Jakarta Sans", system-ui, -apple-system, sans-serif; }
          img, svg, video { max-width:100%; height:auto; }
          a { text-decoration:none; color:inherit; }
        `}</style>
      </body>
    </html>
  );
}
