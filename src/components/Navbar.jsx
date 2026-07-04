import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

/* ─────────────────────────────────────────
   NAVBAR
   Same pill-style navbar on every page.
   - Highlights the active page (route based)
   - On Home, still tracks scroll position (activeSection)
   - "Say hi" opens WhatsApp chat pre-filled with "hi"
───────────────────────────────────────── */

// WhatsApp number: +91 8148771210
const WHATSAPP_LINK = "https://wa.me/918148771210?text=hi";

export const NAV_LINKS = [
  { label: "Home", to: "/", key: "home" },
  { label: "About", to: "/about", key: "about" },
  { label: "Resume", to: "/resume", key: "resume" },
  { label: "Projects", to: "/projects", key: "projects" },
  { label: "Contact", to: "/contact", key: "contact" },
];

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On "/" the active pill follows scroll position (activeSection prop).
  // On any other route, the active pill just follows the URL.
  const isHome = location.pathname === "/";
  const activeKey = isHome ? activeSection : location.pathname.replace("/", "");

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      display: "flex", justifyContent: "center", padding: "16px 16px 0",
    }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        borderRadius: 9999, border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(20,20,20,0.8)", backdropFilter: "blur(12px)",
        padding: "6px 6px", flexWrap: "wrap", justifyContent: "center",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.4)" : "none",
        transition: "box-shadow 0.3s",
      }}>
        {/* Logo */}
        <Link to="/" style={{ position: "relative", cursor: "pointer" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 1.5, transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{
              width: "100%", height: "100%", borderRadius: "50%",
              background: "var(--bg)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span className="font-display" style={{ fontSize: 13, color: "var(--text)" }}>MS</span>
            </div>
          </div>
        </Link>

        <div style={{ width: 1, height: 20, background: "var(--stroke)", margin: "0 2px" }} />

        {/* Links */}
        {NAV_LINKS.map(link => {
          const isActive = activeKey === link.key;
          return (
            <Link key={link.label} to={link.to}
              style={{
                fontSize: 13, borderRadius: 9999, padding: "6px 14px",
                color: isActive ? "var(--text)" : "var(--muted)",
                background: isActive ? "rgba(31,31,31,0.6)" : "transparent",
                textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap",
                transform: "scale(1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                if (!isActive) e.currentTarget.style.color = "var(--text)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                if (!isActive) e.currentTarget.style.color = "var(--muted)";
              }}
            >
              {link.label}
            </Link>
          );
        })}

        <div style={{ width: 1, height: 20, background: "var(--stroke)", margin: "0 2px" }} />

        {/* Say hi -> WhatsApp */}
        <div className="accent-border-wrap" style={{ position: "relative" }}>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 13, borderRadius: 9999, padding: "6px 14px",
              color: "var(--text)", textDecoration: "none",
              background: "var(--surface)", backdropFilter: "blur(8px)",
              position: "relative", zIndex: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.04)";
              e.currentTarget.style.boxShadow = "0 0 16px rgba(94,210,156,0.35)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Say hi ↗
          </a>
        </div>
      </div>
    </div>
  );
}
