import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HlsVideo, HLS_SRC } from "./components/HlsVideo.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/About.jsx";
import Resume from "./components/Resume.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";

/* ─────────────────────────────────────────
   FONT + GSAP + HLS LOADER
───────────────────────────────────────── */
function useExternalScripts() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@1&display=swap";
    document.head.appendChild(fontLink);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        --bg: #0a0a0a;
        --surface: #141414;
        --text: #f5f5f5;
        --muted: #888;
        --stroke: #1f1f1f;
        --accent-from: #89AACC;
        --accent-to: #4E85BF;
      }
      html { scroll-behavior: smooth; }
      body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; overflow-x: hidden; }
      .font-display { font-family: 'Instrument Serif', serif; font-style: italic; }
      .accent-gradient { background: linear-gradient(90deg, #89AACC 0%, #4E85BF 100%); }
      .accent-border-wrap {
        position: relative;
        border-radius: 9999px;
      }
      .accent-border-wrap::before {
        content: '';
        position: absolute;
        inset: -1.5px;
        border-radius: 9999px;
        background: linear-gradient(90deg, #89AACC 0%, #4E85BF 100%);
        z-index: -1;
        opacity: 0;
        transition: opacity 0.2s;
      }
      .accent-border-wrap:hover::before { opacity: 1; }

      @keyframes scroll-down {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(200%); }
      }
      @keyframes role-fade-in {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes gradient-shift {
        0%,100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes pulse-green {
        0%,100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .animate-scroll-down { animation: scroll-down 1.5s ease-in-out infinite; }
      .animate-role { animation: role-fade-in 0.4s ease-out forwards; }
      .animate-marquee { animation: marquee 40s linear infinite; }
      .animate-pulse-green { animation: pulse-green 2s ease-in-out infinite; }

      /* scrollbar */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: var(--stroke); border-radius: 2px; }
    `;
    document.head.appendChild(style);

    const hlsScript = document.createElement("script");
    hlsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.7/hls.min.js";

    const gsapScript = document.createElement("script");
    gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";

    const stScript = document.createElement("script");
    stScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";

    let c = 0;
    const done = () => { c++; if (c >= 3) setReady(true); };
    hlsScript.onload = done;
    gsapScript.onload = () => {
      done();
      document.head.appendChild(stScript);
      stScript.onload = done;
    };

    document.head.appendChild(hlsScript);
    document.head.appendChild(gsapScript);

    return () => {};
  }, []);

  return ready;
}

/* ─────────────────────────────────────────
   LOADING SCREEN — shown once on first load only
───────────────────────────────────────── */
const WORDS = ["Design", "Create", "Inspire"];

function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    const DURATION = 2700;
    let raf;
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "var(--bg)", display: "flex", flexDirection: "column",
        padding: "32px 40px",
      }}
    >
      <motion.span
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase" }}
      >
        Portfolio
      </motion.span>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIdx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-display"
            style={{ fontSize: "clamp(48px, 10vw, 96px)", color: "rgba(245,245,245,0.8)" }}
          >
            {WORDS[wordIdx]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <span
          className="font-display"
          style={{ fontSize: "clamp(72px, 12vw, 128px)", color: "var(--text)", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}
        >
          {String(count).padStart(3, "0")}
        </span>
      </div>

      <div style={{ height: 3, background: "rgba(31,31,31,0.5)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          className="accent-gradient"
          style={{ height: "100%", originX: 0, boxShadow: "0 0 8px rgba(137,170,204,0.35)" }}
          animate={{ scaleX: count / 100 }}
          transition={{ ease: "linear", duration: 0.05 }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
const ROLES = ["Creative", "Fullstack", "Dveloper", "Scholar"];

function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const nameRef = useRef(null);
  const blurRefs = useRef([]);
  const gsapInit = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (gsapInit.current) return;
    const tryGsap = () => {
      if (!window.gsap) { setTimeout(tryGsap, 100); return; }
      gsapInit.current = true;
      const gsap = window.gsap;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (nameRef.current) {
        tl.fromTo(nameRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 }, 0.1);
      }
      blurRefs.current.forEach((el, i) => {
        if (el) tl.fromTo(el,
          { opacity: 0, filter: "blur(10px)", y: 20 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 },
          0.3 + i * 0.1
        );
      });
    };
    tryGsap();
  }, []);

  return (
    <section id="home" style={{
      position: "relative", height: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <HlsVideo
          src={HLS_SRC}
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "100%", minHeight: "100%",
            objectFit: "cover",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
          background: "linear-gradient(to top, var(--bg), transparent)",
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 900,
      }}>
        <div ref={el => blurRefs.current[0] = el}
          style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 32 }}>
          COLLECTION '26
        </div>

        <h1 ref={nameRef}
          className="font-display"
          style={{
            fontSize: "clamp(56px, 10vw, 120px)", lineHeight: 0.9,
            letterSpacing: "-0.02em", color: "var(--text)", marginBottom: 24, opacity: 0,
          }}>
          Mohamed Sameer
        </h1>

        <div ref={el => blurRefs.current[1] = el}
          style={{ fontSize: 16, color: "var(--muted)", marginBottom: 12, display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
          A{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display"
              style={{ color: "var(--text)", display: "inline-block" }}
            >
              {ROLES[roleIdx]}
            </motion.span>
          </AnimatePresence>
          {" "}lives in Chennai.
        </div>

        <p ref={el => blurRefs.current[2] = el}
          style={{ fontSize: 14, color: "var(--muted)", maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        <div ref={el => blurRefs.current[3] = el}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <div className="accent-border-wrap">
            <a href="#work" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              borderRadius: 9999, padding: "14px 28px", fontSize: 14, fontWeight: 600,
              background: "var(--text)", color: "var(--bg)", textDecoration: "none",
              position: "relative", zIndex: 1, transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--text)"; e.currentTarget.style.color = "var(--bg)"; }}
            >
              See Projects..!
            </a>
          </div>
          <div className="accent-border-wrap">
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              borderRadius: 9999, padding: "14px 28px", fontSize: 14, fontWeight: 600,
              border: "2px solid var(--stroke)", background: "var(--bg)", color: "var(--text)",
              textDecoration: "none", position: "relative", zIndex: 1, transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.border = "2px solid transparent"; }}
              onMouseLeave={e => { e.currentTarget.style.border = "2px solid var(--stroke)"; }}
            >
              Reach out...
            </a>
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 10,
      }}>
        <span style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: "var(--stroke)", position: "relative", overflow: "hidden" }}>
          <div className="animate-scroll-down accent-gradient" style={{ position: "absolute", inset: 0 }} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SELECTED WORKS
───────────────────────────────────────── */
const HOME_PROJECTS = [
  { title: "Automotive Motion", span: 7, img: "/public/prj2.png", tag: "Motion Design" },
  { title: "Urban Architecture", span: 5, img: "/public/prj4.png", tag: "Architecture" },
  { title: "Human Perspective", span: 5, img: "/public/prj3.png", tag: "Photography" },
  { title: "Brand Identity", span: 7, img: "/public/prj1.png", tag: "Branding" },
];

function SectionHeader({ eyebrow, heading, italicWord, sub, showBtn }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 32, height: 1, background: "var(--stroke)" }} />
          <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase" }}>{eyebrow}</span>
        </div>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 600, color: "var(--text)", lineHeight: 1.1, marginBottom: 8 }}>
          {heading}{" "}<em className="font-display">{italicWord}</em>
        </h2>
        <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 480, lineHeight: 1.6 }}>{sub}</p>
      </div>
      {showBtn && (
        <div className="accent-border-wrap" style={{ display: "none" }} id="view-all-work-btn">
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            borderRadius: 9999, padding: "10px 24px", fontSize: 13,
            background: "var(--surface)", color: "var(--text)", textDecoration: "none",
            position: "relative", zIndex: 1,
          }}>
            View all work →
          </a>
          <style>{`@media(min-width:768px){#view-all-work-btn{display:inline-flex!important}}`}</style>
        </div>
      )}
    </motion.div>
  );
}

function HomeProjectCard({ project, idx }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        gridColumn: `span ${project.span}`,
        borderRadius: 24, overflow: "hidden", position: "relative",
        background: "var(--surface)", border: "1px solid var(--stroke)",
        aspectRatio: project.span === 7 ? "16/10" : "4/5",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={project.img}
        alt={project.title}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transition: "transform 0.5s ease",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
        backgroundSize: "4px 4px",
        opacity: 0.2, mixBlendMode: "multiply", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)",
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
        display: "flex", alignItems: "flex-end", padding: 24,
      }}>
        <div className="accent-border-wrap" style={{ display: "inline-block" }}>
          <div style={{
            background: "white", color: "#0a0a0a",
            borderRadius: 9999, padding: "8px 18px", fontSize: 14,
            fontWeight: 600, position: "relative", zIndex: 1,
            display: "flex", gap: 6,
          }}>
            View — <em className="font-display" style={{ color: "#333" }}>{project.title}</em>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WorksSection() {
  return (
    <section id="work" style={{ background: "var(--bg)", padding: "64px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeader
          eyebrow="Selected Work"
          heading="Featured"
          italicWord="projects"
          sub="A selection of projects I've worked on, from concept to launch."
          showBtn
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 20 }}>
          {HOME_PROJECTS.map((p, i) => <HomeProjectCard key={p.title} project={p} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   JOURNAL
───────────────────────────────────────── */
const JOURNAL = [
  { title: "The Future of Interaction Design", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80", time: "5 min read", date: "Jan 2026" },
  { title: "Building Design Systems That Scale", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200&q=80", time: "8 min read", date: "Dec 2025" },
  { title: "On Typography & Readability", img: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=200&q=80", time: "4 min read", date: "Nov 2025" },
  { title: "Motion as Communication", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&q=80", time: "6 min read", date: "Oct 2025" },
];

function JournalEntry({ entry, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      style={{
        display: "flex", alignItems: "center", gap: 20,
        padding: "16px 20px", borderRadius: 40,
        background: "rgba(20,20,20,0.3)", border: "1px solid var(--stroke)",
        cursor: "pointer", transition: "background 0.2s",
      }}
    >
      <img src={entry.img} alt={entry.title}
        style={{ width: 48, height: 48, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: "var(--text)" }}>{entry.title}</span>
      <span style={{ fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap" }}>{entry.time}</span>
      <span style={{ fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap" }}>{entry.date}</span>
    </motion.div>
  );
}

function JournalSection() {
  return (
    <section style={{ background: "var(--bg)", padding: "64px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeader
          eyebrow="Journal"
          heading="Recent"
          italicWord="thoughts"
          sub="Reflections on design, craft, and building in public."
          showBtn={false}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {JOURNAL.map((entry, i) => <JournalEntry key={entry.title} entry={entry} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   STATS
───────────────────────────────────────── */
const STATS = [
  { value: "6+", label: "Months Experience" },
  { value: "4", label: "Projects Done" },
  { value: "100%", label: "Interested" },
];

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section style={{ background: "var(--bg)", padding: "64px 0", borderTop: "1px solid var(--stroke)" }}>
      <div ref={ref} style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40,
      }}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.7 }}
            style={{ textAlign: "center" }}
          >
            <div className="font-display" style={{ fontSize: "clamp(48px,8vw,80px)", color: "var(--text)", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 8, letterSpacing: "0.05em" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   EXPLORATIONS
───────────────────────────────────────── */
// const EXPLORE_IMGS = [
//   "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&q=80",
//   "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
//   "https://images.unsplash.com/photo-1495726569656-8b8886143e6a?w=400&q=80",
//   "https://images.unsplash.com/photo-1605460375648-278bcbd579a6?w=400&q=80",
//   "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=80",
//   "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80",
// ];

// function ExplorationsSection() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <section ref={ref} style={{ background: "var(--bg)", padding: "80px 0", overflow: "hidden" }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.9 }}
//           style={{ textAlign: "center", marginBottom: 56 }}
//         >
//           <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Explorations</div>
//           <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 600, color: "var(--text)" }}>
//             Visual <em className="font-display">playground</em>
//           </h2>
//           <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 12, maxWidth: 400, margin: "12px auto 0" }}>
//             Experimental work, studies, and visual experiments.
//           </p>
//         </motion.div>

//         <div style={{
//           display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//           gap: 16,
//         }}>
//           {/* {EXPLORE_IMGS.map((img, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: i * 0.07, duration: 0.7 }}
//               style={{
//                 aspectRatio: "1/1", borderRadius: 20, overflow: "hidden",
//                 border: "1px solid var(--stroke)", cursor: "zoom-in",
//               }}
//             >
//               <img src={img} alt={`Exploration ${i + 1}`}
//                 style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
//                 onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
//                 onMouseLeave={e => e.target.style.transform = "scale(1)"}
//               />
//             </motion.div>
//           ))} */}
//         </div>
//       </div>
//     </section>
//   );
// }

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  useExternalScripts();

  // Loading screen only ever plays once, on first load — not on route changes.
  useEffect(() => {
    const sections = ["home", "work", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.4 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [isLoading]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <BrowserRouter>
          <Navbar activeSection={activeSection} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <WorksSection />
                  <JournalSection />
                  {/* <ExplorationsSection /> */}
                  <StatsSection />
                  <Footer />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}
