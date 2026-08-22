"use client";

import {
  AppWindow,
  Bot,
  BrainCircuit,
  Calculator,
  CheckCircle2,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  FileCode2,
  Github,
  Globe2,
  GraduationCap,
  Layers3,
  Sparkles,
  Terminal,
  TerminalSquare,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SectionTitle from "./SectionTitle";
import TiltCard from "./TiltCard";
import Reveal, { RevealGroup, RevealItem } from "./motion/Reveal";
import { soundFx } from "@/utils/soundEffects";

// ==========================================
// 💡 SKILLS LIST WITH MASTERY LEVEL & TAGS
// ==========================================
interface SkillItem {
  icon: typeof Calculator;
  title: string;
  category: "all" | "core" | "web" | "cert" | "ai";
  categoryLabel: string;
  text: string;
  badge: string;
  mastery: number;
}

const skills: SkillItem[] = [
  {
    icon: Calculator,
    title: "Tally Prime & Financial ERP",
    category: "cert",
    categoryLabel: "Enterprise Accounting",
    text: "Advanced enterprise ledger, inventory management, GST compliance, balance sheets, and automated financial accounting systems.",
    badge: "Specialized ERP",
    mastery: 95,
  },
  {
    icon: GraduationCap,
    title: "DCA Certified Diploma",
    category: "cert",
    categoryLabel: "Computer Applications",
    text: "Comprehensive diploma covering IT fundamentals, MS Office automation, operating systems, computing architecture, and hardware logic.",
    badge: "Certified Diploma",
    mastery: 98,
  },
  {
    icon: TerminalSquare,
    title: "Python Development & Logic",
    category: "core",
    categoryLabel: "Backend & Automation",
    text: "Core Python, scripting, backend logic, RESTful APIs, data manipulation, algorithm design, and task automation pipelines.",
    badge: "Core Language",
    mastery: 92,
  },
  {
    icon: Cpu,
    title: "C++ High Performance",
    category: "core",
    categoryLabel: "Systems & OOP",
    text: "Object-oriented architecture, memory management, data structures, algorithm optimization, and high-performance computing.",
    badge: "Core Language",
    mastery: 88,
  },
  {
    icon: FileCode2,
    title: "HTML5 & Modern CSS3",
    category: "web",
    categoryLabel: "Frontend Architecture",
    text: "Semantic UI structure, CSS Grid & Flexbox, responsive layouts, smooth micro-interactions, and cross-browser precision.",
    badge: "Frontend Core",
    mastery: 96,
  },
  {
    icon: Bot,
    title: "AI Integration & Workflows",
    category: "ai",
    categoryLabel: "Modern AI Engineering",
    text: "Harnessing LLMs, prompt engineering, AI developer workflows, and integrating intelligent agentic features into web applications.",
    badge: "AI & Modern Tools",
    mastery: 90,
  },
  {
    icon: AppWindow,
    title: "Full-Stack Web Engineering",
    category: "web",
    categoryLabel: "Web & Software Engineering",
    text: "Building modern user interfaces, full-stack web applications, REST APIs, and scalable digital web products with React & Next.js.",
    badge: "Full-Stack",
    mastery: 94,
  },
  {
    icon: BrainCircuit,
    title: "Creative 3D & Web Design",
    category: "ai",
    categoryLabel: "Interactive Design",
    text: "Modern UI/UX design systems, Three.js 3D elements, Framer Motion animations, and sleek dark mode glassmorphism.",
    badge: "3D & Creative",
    mastery: 91,
  },
];

// =========================================================================
// 🚀 FEATURED PORTFOLIO PROJECTS
// =========================================================================
export interface ProjectItem {
  number: string;
  title: string;
  category: "all" | "web" | "ai" | "app";
  type: string;
  image: string;
  text: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  features: string[];
}

const projects: ProjectItem[] = [
  {
    number: "01",
    title: "Neon Mart Full-Stack E-Commerce",
    category: "web",
    type: "Production Web App",
    image: "/projects/ecommerce.jpg",
    text: "A high-performance modern e-commerce platform with futuristic UI, dynamic cart management, smooth checkout flow, product catalog, and responsive mobile-first design.",
    tags: ["Next.js", "React", "TailwindCSS", "TypeScript", "REST API"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/",
    features: [
      "Dynamic catalog with instant search & filter",
      "Interactive cart with local caching & instant updates",
      "Sleek futuristic neon dark theme design",
      "Optimized for 100% Core Web Vitals score",
    ],
  },
  {
    number: "02",
    title: "Neuralytics AI Analytics Dashboard",
    category: "ai",
    type: "AI & Data Command Center",
    image: "/projects/dashboard.jpg",
    text: "Interactive business and data visualization dashboard with real-time metric cards, interactive charts, AI data insights, and customizable dark interface widgets.",
    tags: ["Python", "React", "Data Charts", "Next.js", "AI APIs"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/",
    features: [
      "Modular dashboard with 12+ real-time analytics widgets",
      "Interactive time-series & breakdown charts",
      "AI-driven summary & trend detection",
      "Responsive layout for desktop, tablet, and mobile",
    ],
  },
  {
    number: "03",
    title: "TaskFlow Pro & Automation Suite",
    category: "app",
    type: "Productivity & Workflow System",
    image: "/projects/app.jpg",
    text: "Feature-packed productivity suite featuring Kanban boards, automated priority triggers, progress analytics, and seamless cloud synchronization.",
    tags: ["JavaScript", "React", "Full-Stack", "CSS Grid", "UI/UX"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/",
    features: [
      "Smooth interactive Kanban drag-and-drop workflow",
      "Automated reminders and priority sorting",
      "Local storage & cloud synchronization",
      "Modular and clean TypeScript architecture",
    ],
  },
];

// ==========================================
// 💡 JOURNEY & MILESTONES
// ==========================================
const journey = [
  {
    year: "Foundation & DCA Diploma",
    phase: "PHASE 01",
    title: "DCA Certification & Computer Science",
    text: "Mastered core computing fundamentals, data organization, operating systems, and automation software suites.",
  },
  {
    year: "Enterprise Financial Tech",
    phase: "PHASE 02",
    title: "Tally Prime & Accounting Specialization",
    text: "Gained expertise in advanced accounting structures, inventory systems, GST compliance, and enterprise ledger reporting.",
  },
  {
    year: "Core Programming Mastery",
    phase: "PHASE 03",
    title: "Python, C++ & System Architecture",
    text: "Built strong foundation in high-performance computing with C++, backend automation with Python, and algorithmic problem solving.",
  },
  {
    year: "Modern Web & Future Tech",
    phase: "PHASE 04",
    title: "Full-Stack Web Development & AI Tools",
    text: "Creating next-generation web applications, interactive 3D interfaces with React/Next.js, and integrating cutting-edge AI workflows.",
  },
];

export default function PortfolioSections() {
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<"all" | "web" | "ai" | "app">("all");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<"all" | "core" | "web" | "cert" | "ai">("all");
  const [activeAboutTab, setActiveAboutTab] = useState<"overview" | "stack" | "code" | "philosophy">("overview");

  const filteredProjects = projects.filter((project) => {
    if (selectedProjectCategory === "all") return true;
    return project.category === selectedProjectCategory;
  });

  const filteredSkills = skills.filter((skill) => {
    if (selectedSkillCategory === "all") return true;
    return skill.category === selectedSkillCategory;
  });

  return (
    <>
      {/* ========================================== */}
      {/* 01. ABOUT ME SECTION                       */}
      {/* ========================================== */}
      <section id="about" className="relative py-20 sm:py-28">
        <div className="section-shell">
          <SectionTitle
            eyebrow="01 / DEVELOPER DOSSIER & ARCHITECTURE"
            title="Where deep logic meets futuristic design."
            description="I transform complex algorithmic logic and enterprise data workflows into high-performance software and visually breathtaking digital experiences."
            typewriter={true}
          />

          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] items-stretch">
            {/* Profile Photo Dossier Card */}
            <Reveal from="left" distance={24} duration={0.7}>
              <TiltCard glowColor="cyan" className="h-full">
                <div className="glass-slab relative flex h-full flex-col items-center justify-between overflow-hidden rounded-3xl p-7 text-center sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#22e1ff]/20">
                  {/* Profile Image with dual neon ring aura */}
                  <div className="relative my-7 flex items-center justify-center">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-amber-500 opacity-40 blur-lg animate-pulse" />
                    <div className="relative h-44 w-44 overflow-hidden rounded-full border-2 border-[#22e1ff]/80 bg-[#050a18] shadow-[0_0_35px_rgba(34,225,255,0.45)] sm:h-48 sm:w-48">
                      <Image
                        src="/profile.jpg"
                        alt="Krishnkant Dhakar"
                        fill
                        sizes="(max-width: 640px) 176px, 192px"
                        priority
                        className="rounded-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="w-full">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#22e1ff]/40 bg-[#22e1ff]/[0.09] px-4 py-1.5 font-heading text-sm font-bold text-[#8fe9ff] shadow-[0_0_15px_rgba(34,225,255,0.3)]">
                      <span>Krishnkant Dhakar</span>
                      <Zap size={14} className="fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
                    </div>

                    <p className="mt-3 font-mono text-[0.74rem] font-bold tracking-wider text-slate-300 uppercase">
                      Software Developer · AI Integrator · Problem Solver
                    </p>

                    <div className="divider-glow my-5" />

                    {/* Actions */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <a
                        href="/resume.pdf"
                        download
                        onClick={() => soundFx.playConfirm()}
                        onMouseEnter={() => soundFx.playHover()}
                        className="btn-primary group !px-4 !py-2.5 !text-xs font-bold"
                      >
                        <Download
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-y-0.5"
                        />
                        Download Resume
                      </a>
                      <a
                        href="#contact"
                        onClick={() => soundFx.playClick()}
                        onMouseEnter={() => soundFx.playHover()}
                        className="btn-ghost !px-4 !py-2.5 !text-xs font-bold"
                      >
                        <Sparkles size={15} className="text-[#22e1ff]" />
                        Direct Contact
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* Interactive Bio Dossier Details */}
            <Reveal from="right" distance={24} delay={0.1} duration={0.7}>
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="glass-slab relative rounded-3xl p-7 sm:p-9 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  {/* Tabs */}
                  <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4">
                    {([
                      { key: "overview", label: "Overview", Icon: Terminal },
                      { key: "stack", label: "Technical DNA", Icon: Code2 },
                      { key: "code", label: "Core Script", Icon: Cpu },
                      { key: "philosophy", label: "Philosophy", Icon: Zap },
                    ] as const).map(({ key, label, Icon }) => (
                      <button
                        key={key}
                        onClick={() => {
                          soundFx.playClick();
                          setActiveAboutTab(key);
                        }}
                        onMouseEnter={() => soundFx.playHover()}
                        className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all duration-300 ${
                          activeAboutTab === key
                            ? "bg-[#22e1ff] text-[#050a18] shadow-[0_0_18px_rgba(34,225,255,0.6)] font-bold"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon size={14} /> {label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    {activeAboutTab === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4 font-sans text-slate-300"
                      >
                        <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                          Software Developer &amp; Systems Engineer
                        </h3>
                        <p className="leading-relaxed text-slate-300 text-sm sm:text-base">
                          I am <span className="font-bold text-cyan-300">Krishnkant Dhakar</span>, a versatile developer combining deep foundations in system computing, financial ERP architecture, and modern full-stack engineering.
                        </p>
                        <p className="leading-relaxed text-slate-400 text-sm sm:text-base">
                          With certified expertise in <span className="text-slate-200 font-semibold">DCA (Diploma in Computer Applications)</span> and <span className="text-slate-200 font-semibold">Tally Prime</span>, alongside programming skills in <span className="text-slate-200 font-semibold">Python</span>, <span className="text-slate-200 font-semibold">C++</span>, and modern web frameworks like <span className="text-slate-200 font-semibold">Next.js &amp; React</span>, I engineer applications that are secure, lightning fast, and visually spectacular.
                        </p>
                      </motion.div>
                    )}

                    {activeAboutTab === "stack" && (
                      <motion.div
                        key="stack"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/50 p-3">
                          <span className="font-mono text-xs text-slate-300">Languages &amp; Core:</span>
                          <span className="font-mono text-xs font-bold text-cyan-300">Python, C++, JavaScript, TypeScript, SQL</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/50 p-3">
                          <span className="font-mono text-xs text-slate-300">Web &amp; UI Architecture:</span>
                          <span className="font-mono text-xs font-bold text-violet-300">React 18, Next.js 14, TailwindCSS, Three.js</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/50 p-3">
                          <span className="font-mono text-xs text-slate-300">Certifications &amp; Finance:</span>
                          <span className="font-mono text-xs font-bold text-amber-300">Tally Prime, DCA Diploma, IT Automation</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/50 p-3">
                          <span className="font-mono text-xs text-slate-300">Modern Tools &amp; AI:</span>
                          <span className="font-mono text-xs font-bold text-emerald-300">Git, GitHub, AI Dev Tools, REST APIs</span>
                        </div>
                      </motion.div>
                    )}

                    {activeAboutTab === "code" && (
                      <motion.div
                        key="code"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-xl border border-white/10 bg-[#020510] p-4 font-mono text-xs text-slate-300"
                      >
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-slate-500 text-[11px]">
                          <span>dev_profile.py</span>
                          <span className="text-cyan-400 font-bold">Python 3.12</span>
                        </div>
                        <pre className="mt-3 overflow-x-auto leading-relaxed text-[11.5px]">
                          <code>
                            <span className="text-violet-400">class</span> <span className="text-cyan-300 font-bold">KrishnkantDhakar</span>:{"\n"}
                            {"  "}name = <span className="text-emerald-300">&quot;Krishnkant Dhakar&quot;</span>{"\n"}
                            {"  "}credentials = [<span className="text-emerald-300">&quot;DCA Diploma&quot;</span>, <span className="text-emerald-300">&quot;Tally Prime&quot;</span>]{"\n"}
                            {"  "}languages = [<span className="text-emerald-300">&quot;Python&quot;</span>, <span className="text-emerald-300">&quot;C++&quot;</span>, <span className="text-emerald-300">&quot;Next.js&quot;</span>]{"\n"}
                            {"  "}<span className="text-violet-400">def</span> <span className="text-cyan-300">deliver_excellence</span>(self):{"\n"}
                            {"    "}<span className="text-violet-400">return</span> <span className="text-emerald-300">&quot;High performance software with zero lag&quot;</span>
                          </code>
                        </pre>
                      </motion.div>
                    )}

                    {activeAboutTab === "philosophy" && (
                      <motion.div
                        key="philosophy"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                          Clean Architecture &amp; Intuitive Experiences
                        </h3>
                        <p className="mt-3 leading-relaxed text-slate-300 text-sm">
                          &quot;Great code should not only solve complex computational challenges efficiently, but it should also deliver a clean, enjoyable experience to whoever interacts with it.&quot;
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3">
                            <p className="font-mono text-xs font-bold text-cyan-300">01. Precision Logic</p>
                            <p className="mt-1 text-[11px] text-slate-400">Zero bloat, high performance.</p>
                          </div>
                          <div className="rounded-xl border border-violet-400/20 bg-violet-400/5 p-3">
                            <p className="font-mono text-xs font-bold text-violet-300">02. Modern Design</p>
                            <p className="mt-1 text-[11px] text-slate-400">Intuitive &amp; responsive everywhere.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Status & Location Metrics (Clean) */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <TiltCard glowColor="cyan">
                    <div className="glass-panel-glow h-full rounded-2xl p-5 shadow-lg border border-white/10">
                      <Globe2 className="mb-2 text-cyan-300" size={22} />
                      <p className="font-mono text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                        Location / Region
                      </p>
                      <p className="mt-1 font-heading text-lg font-bold text-white">India</p>
                    </div>
                  </TiltCard>

                  <TiltCard glowColor="violet">
                    <div className="glass-panel-glow h-full rounded-2xl p-5 shadow-lg border border-white/10">
                      <Sparkles className="mb-2 text-violet-300" size={22} />
                      <p className="font-mono text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                        Current Availability
                      </p>
                      <p className="mt-1 font-heading text-lg font-bold text-white">Open to Opportunities</p>
                      <p className="mt-1 text-xs text-slate-400 font-sans">Projects, Collaborations &amp; Hiring</p>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 02. CORE SKILLS SECTION                    */}
      {/* ========================================== */}
      <section
        id="skills"
        className="relative border-y border-white/[0.06] bg-[#050917]/70 py-20 sm:py-28"
      >
        <div className="section-shell">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              eyebrow="02 / TECHNICAL & DOMAIN CAPABILITIES"
              title="A structured, multi-dimensional stack."
              description="From systems programming in Python & C++ to modern full-stack web engineering, DCA computer applications, and Tally Prime business ERP."
              typewriter={true}
            />

            {/* Category Filter Pills */}
            <div className="inline-flex self-start rounded-2xl border border-white/[0.1] bg-[#070d1e]/85 p-1.5 backdrop-blur-xl md:self-auto">
              {([
                { key: "all", label: "All Skills" },
                { key: "core", label: "Core & Systems" },
                { key: "web", label: "Web Apps" },
                { key: "cert", label: "Certifications" },
                { key: "ai", label: "AI & 3D" },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedSkillCategory(tab.key);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all duration-300 ${
                    selectedSkillCategory === tab.key
                      ? "bg-gradient-to-r from-[#22e1ff] to-[#4f9dff] text-[#050a18] shadow-[0_0_18px_rgba(34,225,255,0.6)] font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={selectedSkillCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredSkills.map((skill) => {
              const Icon = skill.icon;

              return (
                <div key={skill.title} className="h-full">
                  <TiltCard glowColor="cyan" className="h-full">
                    <article className="glass-panel-glow group relative flex h-full flex-col justify-between rounded-3xl p-6 border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-cyan-400/40">
                      {/* Top Corner Reticle */}
                      <div className="pointer-events-none absolute top-3 right-3 font-mono text-[9px] text-cyan-400/40 group-hover:text-cyan-400/90">
                        [+]
                      </div>

                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="rounded-xl border border-[#22e1ff]/30 bg-[#22e1ff]/10 p-3 text-[#22e1ff] transition-all duration-300 group-hover:bg-[#22e1ff] group-hover:text-[#04060f] shadow-[0_0_15px_rgba(34,225,255,0.2)]">
                            <Icon size={20} />
                          </div>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[9.5px] font-medium tracking-wide text-slate-300">
                            {skill.badge}
                          </span>
                        </div>

                        <h3 className="mt-5 font-heading text-[1.05rem] font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#8fe9ff]">
                          {skill.title}
                        </h3>

                        <p className="mt-1 font-mono text-[0.7rem] font-semibold tracking-wide text-violet-300/90">
                          {skill.categoryLabel}
                        </p>

                        <p className="mt-3 text-[0.85rem] leading-[1.7] text-slate-400 font-sans">
                          {skill.text}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-white/[0.08] pt-3.5">
                        {/* Animated Mastery Power Bar */}
                        <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1.5">
                          <span>Mastery Level</span>
                          <span className="text-cyan-300 font-bold">{skill.mastery}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.mastery}%` }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full bg-gradient-to-r from-[#22e1ff] via-[#60a5fa] to-[#8b5cf6] shadow-[0_0_8px_rgba(34,225,255,0.8)]"
                          />
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 03. FEATURED PROJECTS SECTION              */}
      {/* ========================================== */}
      <section id="projects" className="relative py-20 sm:py-28">
        <div className="section-shell">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              eyebrow="03 / SHOWCASE TRANSMISSIONS"
              title="Built with precision & passion."
              description="Explore showcase web applications and systems engineered with clean modular architecture, responsive design, and intuitive user experiences."
              typewriter={true}
            />

            {/* Filter Tabs */}
            <div className="inline-flex self-start rounded-2xl border border-white/[0.1] bg-[#070d1e]/85 p-1.5 backdrop-blur-xl md:self-auto">
              {([
                { key: "all", label: `All (${projects.length})` },
                { key: "web", label: "Full-Stack" },
                { key: "ai", label: "AI & Data" },
                { key: "app", label: "Apps" },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedProjectCategory(tab.key);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all duration-300 ${
                    selectedProjectCategory === tab.key
                      ? "bg-gradient-to-r from-[#22e1ff] to-[#4f9dff] text-[#050a18] shadow-[0_0_18px_rgba(34,225,255,0.6)] font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={selectedProjectCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid gap-8"
          >
            {filteredProjects.map((project) => (
              <div key={project.title}>
                <TiltCard glowColor="cyan">
                  <article className="glass-slab group relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_55px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-cyan-400/40">
                    <div className="grid items-center lg:grid-cols-[1.05fr_0.95fr]">
                      {/* Project Image */}
                      <div className="relative min-h-[260px] overflow-hidden bg-gradient-to-br from-[#02040c] to-[#070d1e] p-4 sm:min-h-[340px] sm:p-6">
                        <div className="relative h-full min-h-[240px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.8)]">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="flex flex-col justify-between p-6 sm:p-8">
                        <div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-[0.74rem] font-bold tracking-[0.2em] text-[#22e1ff]">
                              MISSION_ID // 0{project.number}
                            </span>
                            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[0.68rem] text-slate-300">
                              {project.type}
                            </span>
                          </div>

                          <h3 className="mt-3 font-heading text-[1.45rem] font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#8fe9ff]">
                            {project.title}
                          </h3>

                          <p className="mt-3 text-[0.9rem] leading-[1.75] text-slate-300 font-sans">
                            {project.text}
                          </p>

                          {/* Features list */}
                          <ul className="mt-4 space-y-1.5">
                            {project.features.map((feat, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                                <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech Tags */}
                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-lg border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-cyan-300"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                          <a
                            href={project.liveUrl}
                            onClick={() => soundFx.playConfirm()}
                            onMouseEnter={() => soundFx.playHover()}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-5 py-2.5 font-heading text-xs sm:text-sm font-bold text-[#030712] shadow-[0_0_20px_rgba(0,240,255,0.4)] transition duration-200 hover:scale-105 hover:opacity-95"
                          >
                            <ExternalLink size={15} /> Live Preview
                          </a>

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => soundFx.playClick()}
                            onMouseEnter={() => soundFx.playHover()}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-heading text-xs sm:text-sm font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                          >
                            <Github size={15} /> GitHub Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 04. JOURNEY & MILESTONES SECTION           */}
      {/* ========================================== */}
      <section
        id="journey"
        className="relative border-y border-white/[0.06] bg-[#050917]/70 py-20 sm:py-28"
      >
        <div className="section-shell">
          <SectionTitle
            eyebrow="04 / EVOLUTION & TIMELINE"
            title="Continuous learning & engineering growth."
            description="Key certifications, professional milestones, and technical achievements shaping my software development journey."
            typewriter={true}
          />

          <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {journey.map((item) => (
              <RevealItem key={item.title} className="h-full">
                <TiltCard glowColor="violet" className="h-full">
                  <article className="glass-panel-glow group relative flex h-full flex-col justify-between rounded-3xl p-6 sm:p-7 border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.6)]">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.74rem] font-bold tracking-[0.22em] text-[#22e1ff] uppercase">
                          {item.phase}
                        </span>
                        <Layers3
                          className="text-violet-400/60 transition-all duration-300 group-hover:rotate-6 group-hover:text-violet-300"
                          size={18}
                        />
                      </div>

                      <div className="divider-glow my-4" />

                      <p className="font-mono text-[0.74rem] font-bold tracking-wide text-violet-300">
                        {item.year}
                      </p>

                      <h3 className="mt-2.5 font-heading text-[1.05rem] font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#c4b5fd]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-[0.85rem] leading-[1.7] text-slate-400 font-sans">
                        {item.text}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-wider text-[#22e1ff]/90 uppercase font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22e1ff] shadow-[0_0_8px_rgba(34,225,255,0.9)]" />
                      <span>Milestone Achieved</span>
                    </div>
                  </article>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
