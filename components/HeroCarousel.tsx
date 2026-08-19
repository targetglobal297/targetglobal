// components/HeroCarousel.tsx
"use client";
import { useEffect, useState } from "react";

const RED = "#dc2626";
const SLATE = "#44403c";

const SLIDES = [
  {
    eyebrow: "New arrivals weekly",
    title: "Shop premium products from merchants worldwide",
    body: "Every listing comes from an independent merchant running their own store — no middleman warehouse.",
    ctaLabel: "Start Shopping",
    ctaHref: "#products",
    image: "/hero-1.jpg", // ⚠️ add your own licensed image at public/hero-1.jpg — falls back to a plain gradient if missing
  },
  {
    eyebrow: "For merchants",
    title: "Turn your products into a global storefront",
    body: "No inventory to hold, no shipping to manage yourself — just list, sell, and earn.",
    ctaLabel: "Sell With Us",
    ctaHref: "https://targetglobal-usa.vercel.app/signup",
    image: "/hero-2.jpg", // ⚠️ add your own licensed image at public/hero-2.jpg
  },
  {
    eyebrow: "12+ categories",
    title: "From electronics to everyday essentials",
    body: "Browse a growing catalog across fashion, home, fitness, beauty, and more.",
    ctaLabel: "Browse Categories",
    ctaHref: "#products",
    image: "/hero-3.jpg", // ⚠️ add your own licensed image at public/hero-3.jpg
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive(i => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[active];

  return (
    <div style={{
      background: `linear-gradient(135deg, ${SLATE} 0%, #292524 100%)`,
      padding: "clamp(36px, 8vw, 56px) 20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background image — hides itself automatically if the file doesn't exist yet, revealing the gradient beneath */}
      <img
        key={slide.image}
        src={slide.image}
        alt=""
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Dark overlay so text stays readable over any image */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(28,25,23,.55)" }} />

      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" as const, position: "relative", zIndex: 1 }} className="fu" key={active}>
        <div style={{ display: "inline-block", background: "rgba(220,38,38,.15)", border: "1px solid rgba(220,38,38,.3)", borderRadius: 99, padding: "6px 16px", marginBottom: 18 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#f87171", letterSpacing: "1.5px", textTransform: "uppercase" as const }}>
            {slide.eyebrow}
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(24px, 5.5vw, 34px)", fontWeight: 800, color: "#fff", margin: "0 0 14px", lineHeight: 1.25, letterSpacing: "-.5px" }}>
          {slide.title}
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 28, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          {slide.body}
        </p>
        <a href={slide.ctaHref} style={{
          display: "inline-block", background: RED, color: "#fff", fontWeight: 700, fontSize: 14,
          padding: "13px 28px", borderRadius: 10,
        }}>
          {slide.ctaLabel} →
        </a>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 36, position: "relative", zIndex: 1 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === active ? 22 : 8, height: 8, borderRadius: 99, border: "none",
              background: i === active ? RED : "rgba(255,255,255,.25)", cursor: "pointer",
              transition: "all .25s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
