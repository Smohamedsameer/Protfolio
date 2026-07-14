import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HlsVideo, HLS_SRC } from "./HlsVideo.jsx";
import { GithubIcon } from "./BrandIcons.jsx";
import Footer from "./Footer.jsx";

/* Replace these placeholder GitHub links with your real repo links */
const PROJECTS = [
  {
    title: "Protfolio-Mohd",
    img: "/prj1.png",
    github: "https://github.com/Smohamedsameer/Protfolio.git",
    lines: [
      "A full stack web application built to solve a real everyday problem.",
      "Designed the front end for a clean, responsive user experience.",
      "Built the back end logic with Java and connected it to a database.",
      "Handled authentication, validation, and error states carefully.",
      "Deployed and tested the app end to end before final submission.",
    ],
  },
  {
    title: "Yass - Real Estate",
    img: "/prj2.png",
    github: "https://github.com/Smohamedsameer/Yass-Groups.git",
    lines: [
       "A capstone style project combining everything learned so far.",
      "Structured the project using proper folder and file organization.",
      "Applied Java full stack concepts from front end to database layer.",
      "Practiced version control by committing progress step by step.",
      "Refined the project based on feedback and self code review.",
      
    ],
  },
  {
    title: "E - Commerce",
    img: "/prj3.png",
    github: "https://github.com/Smohamedsameer/E-Commerce.git",
    lines: [
      "A dashboard style project focused on presenting data clearly.",
      "Practiced component based thinking to keep the UI modular.",
      "Connected dynamic data to the interface using state management.",
      "Improved my debugging skills while fixing real runtime errors.",
      "Learned how small design choices affect overall usability.",
    ],
  },
  {
    title: "Staff Management Portal",
    img: "/prj4.png",
    github: "https://github.com/Smohamedsameer/staff-management1.git",
    lines: [
       "A CRUD based application to manage and organize records efficiently.",
      "Implemented REST APIs to connect the front end and back end cleanly.",
      "Used structured queries to keep data operations fast and reliable.",
      "Focused on writing readable, maintainable, and reusable code.",
      "Tested each feature individually before integrating the full flow.",
     
    ],
  },
   {
    title: "Fund-Raiser",
    img: "/proj.png",
    github: "https://github.com/Smohamedsameer/K25-Funds.git",
    lines: [
       "Developed a secure full-stack fundraising management application with role-based authentication.",
  "Implemented member registration, contribution tracking, payment verification, and expense management.",
  "Built REST APIs with Spring Boot and integrated MySQL using Spring Data JPA.",
  "Designed responsive dashboards for users and administrators with real-time financial summaries.",
  "Implemented file upload functionality for payment proof and expense documentation.",
  "Deployed the frontend on Vercel and backend on Railway.,"
     
    ],
  },
];

function ProjectCard({ project, idx }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: idx * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24, overflow: "hidden", border: "1px solid var(--stroke)",
        background: "var(--surface)", transition: "transform 0.3s, border-color 0.3s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        borderColor: hovered ? "#4E85BF" : "var(--stroke)",
      }}
    >
      <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
        <img
          src={project.img}
          alt={project.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.5s", transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      </div>
      <div style={{ padding: 24 }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>{project.title}</h3>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
          {project.lines.map((line, i) => (
            <li key={i} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, display: "flex", gap: 8 }}>
              <span style={{ color: "#89AACC" }}>—</span>{line}
            </li>
          ))}
        </ul>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 13, fontWeight: 600, color: "var(--text)",
            textDecoration: "none", borderRadius: 9999, padding: "10px 20px",
            border: "1px solid var(--stroke)", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--text)"; e.currentTarget.style.color = "var(--bg)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text)"; }}
        >
          <GithubIcon size={16} /> View on GitHub
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header with video background */}
      <section style={{
        position: "relative", minHeight: "55vh", display: "flex",
        alignItems: "center", justifyContent: "center", overflow: "hidden",
        paddingTop: 140, paddingBottom: 40,
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <HlsVideo
            src={HLS_SRC}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "100%", minHeight: "100%", objectFit: "cover",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.75)" }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 160,
            background: "linear-gradient(to top, var(--bg), transparent)",
          }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 720, padding: "0 24px" }}
        >
          <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14 }}>
            Projects
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(36px,6vw,64px)", color: "var(--text)", marginBottom: 20 }}>
            Things I've <em>built</em>
          </h1>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8 }}>
            These projects were built during my Java Full Stack training to apply what I learned in real code
            rather than just theory. Each one pushed me to identify and fix errors on my own, which sharpened
            my debugging and problem solving skills a lot. Together they gave me hands-on knowledge of the
            full development flow — from planning and building to testing and deployment.
          </p>
        </motion.div>
      </section>

      {/* Project grid */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 28 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} idx={i} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
}