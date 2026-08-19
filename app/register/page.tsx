// app/register/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";

const RED = "#dc2626";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });

      // Customer profile — kept in its own collection, separate from the
      // merchant/admin "users" collection, so there's no role confusion
      // with the other two apps sharing this Firebase project.
      await setDoc(doc(db, "customers", cred.user.uid), {
        uid: cred.user.uid,
        name,
        email,
        createdAt: serverTimestamp(),
      });

      router.push("/");
    } catch (err: any) {
      setError(
        err.code === "auth/email-already-in-use" ? "An account with this email already exists." :
        err.code === "auth/weak-password" ? "Password is too weak." :
        `Registration failed: ${err.code ?? err.message}`
      );
    } finally {
      setLoading(false);
    }
  }

  const inp: React.CSSProperties = { width: "100%", padding: "12px 14px", border: "1.5px solid #e7e5e4", borderRadius: 10, fontSize: 15, outline: "none", marginBottom: 14, boxSizing: "border-box" as const };

  return (
    <div style={{ minHeight: "calc(100dvh - 140px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", background: "#fafaf9" }}>
      <div style={{ width: "100%", maxWidth: 380, background: "#fff", borderRadius: 16, border: "1px solid #e7e5e4", padding: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1c1917", margin: "0 0 6px" }}>Create Account</h1>
        <p style={{ fontSize: 13, color: "#78716c", marginBottom: 24 }}>Join TargetGlobal to start shopping.</p>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", borderRadius: 8, padding: "10px 12px", fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#57534e", marginBottom: 5 }}>Full Name</label>
          <input style={inp} required value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" />

          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#57534e", marginBottom: 5 }}>Email</label>
          <input style={inp} type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />

          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#57534e", marginBottom: 5 }}>Password</label>
          <input style={inp} type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" />

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "13px", borderRadius: 10, border: "none",
            background: loading ? "rgba(220,38,38,.5)" : RED, color: "#fff", fontWeight: 700, fontSize: 14,
            cursor: loading ? "not-allowed" : "pointer", marginTop: 4,
          }}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#78716c" }}>
          Already have an account? <Link href="/login" style={{ color: RED, fontWeight: 700 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
