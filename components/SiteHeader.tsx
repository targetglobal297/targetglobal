// components/SiteHeader.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

const RED = "#dc2626";
const SLATE = "#44403c";
const MERCHANT_APP_URL = "https://targetglobal-usa.vercel.app";

const NAV_LINKS = [
  { href: "/", label: "Shop" },
  { href: "/about", label: "Who We Are" },
  { href: "/contact", label: "Contact Us" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round">
      {open
        ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>
        : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
      <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function AuthSection({ user, mobile = false }: { user: User | null | undefined; mobile?: boolean }) {
  if (user === undefined) return null; // still checking — avoids a flash on load

  if (mobile) {
    if (user) {
      return (
        <div>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
            Hi, {user.displayName?.split(" ")[0] ?? "there"}
          </div>
          <button
            onClick={() => signOut(auth)}
            style={{ width: "100%", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", color: "#fff", fontSize: 14, fontWeight: 700, padding: "13px", borderRadius: 10, cursor: "pointer" }}
          >
            Sign Out
          </button>
        </div>
      );
    }
    return (
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
        <a href={`${MERCHANT_APP_URL}/signup`} style={{ display: "block", width: "100%", boxSizing: "border-box" as const, textAlign: "center" as const, background: RED, color: "#fff", fontSize: 14, fontWeight: 700, padding: "13px", borderRadius: 10 }}>
          Register
        </a>
        <a href={`${MERCHANT_APP_URL}/login`} style={{ display: "block", width: "100%", boxSizing: "border-box" as const, textAlign: "center" as const, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", color: "#fff", fontSize: 14, fontWeight: 700, padding: "13px", borderRadius: 10 }}>
          Sign In
        </a>
      </div>
    );
  }

  if (user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" as const }}>
          Hi, {user.displayName?.split(" ")[0] ?? "there"}
        </span>
        <button
          onClick={() => signOut(auth)}
          style={{ background: "rgba(255,255,255,.1)", border: "none", color: "#fff", fontSize: 12, fontWeight: 700, padding: "7px 14px", borderRadius: 8, cursor: "pointer", whiteSpace: "nowrap" as const }}
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" as const }}>
      <a href={`${MERCHANT_APP_URL}/login`} style={{ color: "rgba(255,255,255,.75)", fontSize: 13, fontWeight: 600 }}>Sign In</a>
      <a href={`${MERCHANT_APP_URL}/signup`} style={{ background: RED, color: "#fff", fontSize: 12, fontWeight: 700, padding: "8px 16px", borderRadius: 8 }}>
        Register
      </a>
    </div>
  );
}

function SearchBox({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    router.push(trimmed ? `/?search=${encodeURIComponent(trimmed)}#products` : "/");
  }

  return (
    <form onSubmit={handleSubmit} style={{ position: "relative", width: compact ? "100%" : 190 }}>
      <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.4)", display: "flex" }}>
        <SearchIcon />
      </span>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search..."
        style={{
          width: "100%", boxSizing: "border-box" as const, padding: "8px 10px 8px 30px", borderRadius: 8, border: "1px solid rgba(255,255,255,.15)",
          background: "rgba(255,255,255,.08)", color: "#fff", fontSize: 13, outline: "none",
        }}
      />
    </form>
  );
}

export default function SiteHeader() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);
  useEffect(() => { setMenuOpen(false); }, [user, pathname]); // close mobile menu on nav or auth change

  return (
    <header style={{ background: SLATE, padding: "12px 20px", position: "sticky", top: 0, zIndex: 30, boxShadow: "0 1px 0 rgba(255,255,255,.06)" }}>
      <div className="sh-row" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: RED, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 13 }}>TG</span>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: "-.3px", lineHeight: 1.1 }}>TargetGlobal</div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: 9, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" as const }}>Shop</div>
          </div>
        </Link>

        {/* Everything below hidden on narrow screens, replaced by the hamburger */}
        <div className="sh-desktop" style={{ alignItems: "center", gap: 18, flex: 1, justifyContent: "flex-end" }}>
          <SearchBox />
          <nav style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {NAV_LINKS.map(l => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link key={l.href} href={l.href} style={{
                  color: active ? "#fff" : "rgba(255,255,255,.75)", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" as const,
                  paddingBottom: 3, borderBottom: active ? `2px solid ${RED}` : "2px solid transparent",
                }}>
                  {l.label}
                </Link>
              );
            })}
            <a href={`${MERCHANT_APP_URL}/signup`} style={{ color: "rgba(255,255,255,.75)", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" as const }}>
              Sell With Us
            </a>
          </nav>
          <AuthSection user={user} />
        </div>

        {/* Hamburger — only visible on narrow screens */}
        <button
          className="sh-burger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer", flexShrink: 0 }}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="sh-mobile-panel" style={{ background: "#292524", borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 20px 24px" }}>
            <div style={{ marginBottom: 18 }}><SearchBox compact /></div>

            <div style={{ display: "flex", flexDirection: "column" as const, gap: 2, marginBottom: 18 }}>
              {NAV_LINKS.map(l => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
                    color: active ? "#fff" : "rgba(255,255,255,.8)", fontSize: 15, fontWeight: active ? 800 : 600,
                    padding: "13px 12px", borderRadius: 10,
                    background: active ? "rgba(220,38,38,.15)" : "transparent",
                  }}>
                    {l.label}
                  </Link>
                );
              })}
              <a href={`${MERCHANT_APP_URL}/signup`} style={{ color: "rgba(255,255,255,.8)", fontSize: 15, fontWeight: 600, padding: "13px 12px", borderRadius: 10 }}>
                Sell With Us
              </a>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 18 }}>
              <AuthSection user={user} mobile />
            </div>
          </div>
        </div>
      )}

      {/* Responsive rules live here, inside the component — no separate CSS file to keep in sync */}
      <style>{`
        .sh-desktop { display: flex; }
        .sh-burger { display: none; }
        .sh-mobile-panel { display: none; }
        @media (max-width: 860px) {
          .sh-desktop { display: none !important; }
          .sh-burger { display: flex !important; align-items: center; justify-content: center; }
          .sh-mobile-panel { display: block !important; }
        }
      `}</style>
    </header>
  );
}
