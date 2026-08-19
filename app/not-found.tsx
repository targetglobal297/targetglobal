// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100dvh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: 24,
      background: "#fafaf9", textAlign: "center",
    }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: "#292524", margin: "0 0 8px" }}>
        Not found
      </h1>
      <p style={{ fontSize: 14, color: "#78716c", marginBottom: 20 }}>
        This page or product doesn't exist, or isn't available anymore.
      </p>
      <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: "#dc2626" }}>← Back to shop</Link>
    </div>
  );
}
