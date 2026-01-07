import gsap from "gsap";
import Model from "./components/Model";
import Navbar from "./components/Navbar";
import BackgroundVideo from "./components/BackgroundVideo";
import { ReactLenis } from "lenis/react";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Sidenote from "./components/Sidenote";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef();
  const sceneRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showKeepScrolling, setShowKeepScrolling] = useState(true);

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "3% top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      },
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const remaining = maxScroll - window.scrollY;
      setShowKeepScrolling(remaining > 16);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen">
      <ReactLenis root />
      {/* Loader Overlay with AnimatePresence */}
      <AnimatePresence>
        {loading && <Loader loading={loading} onFinish={() => setLoading(false)} />}
      </AnimatePresence>
      {/* Background Video */}
      <BackgroundVideo />
      <div id="portfolio" className="min-h-[100svh] w-full relative">
        <Navbar />
        

        <div className="hidden sm:flex uppercase text-[20vw] leading-none overflow-hidden w-screen text-center font-[modernist-bold] absolute inset-0 flex-col items-center justify-center px-4">
          <h1>anubhav</h1>
          <h1>gusain</h1>
        </div>
        
        
        {showKeepScrolling && (
          <span className="font-[modernist-bold] uppercase text-[10px] sm:text-sm px-3 sm:px-4 py-2 animate-bounce fixed right-3 bottom-3 sm:right-6 sm:bottom-6 inline-flex items-center gap-2">
            Keep Scrolling
            <ArrowDown className="size-4" aria-hidden="true" />
          </span>
        )}

        {/* 3D Scene */}
        <div ref={sceneRef} className="h-[100svh] sm:h-screen fixed top-0 w-full">
          <Canvas shadows>
            <Suspense fallback={null}>
              <Model progress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>
      </div>
      {/* Page 2: About + Tech Stack */}
      <div
        id="about"
        className="min-h-[100svh] relative w-full text-white font-[modernist-regular] text-xs sm:text-sm"
      >
        <Sidenote
          title="About Me"
          className="left-1/2 -translate-x-1/2 top-20 sm:left-10 sm:translate-x-0 sm:top-24"
        >
          Full Stack Developer who builds end-to-end products across web and
          mobile. I focus on clean architecture, scalable APIs, and fast, modern
          UIs, with hands-on experience in MERN, Next.js, and TypeScript. I care
          about performance, accessibility, and delightful UX, and I enjoy
          collaborating closely with designers and product teams to ship
          reliable features. Recently, I have been exploring AI-powered
          workflows, chatbot integrations, and automation to improve developer
          and user productivity.
        </Sidenote>
        <Sidenote
          title="Tech Stack"
          className="left-1/2 -translate-x-1/2 bottom-10 sm:left-auto sm:right-10 sm:translate-x-0 sm:bottom-24"
        >
          <div className="space-y-3">
            <div>
              <span className="uppercase text-xs text-stone-400">Frontend</span>
              <div>React, Next.js, JavaScript, TypeScript, Tailwind CSS, GSAP</div>
            </div>
            <div>
              <span className="uppercase text-xs text-stone-400">Backend</span>
              <div>Node.js, Express, MongoDB, PostgreSQL, REST APIs</div>
            </div>
            <div>
              <span className="uppercase text-xs text-stone-400">DevOps &amp; Tools</span>
              <div>AWS, Docker, Git/GitHub, Vercel, Figma</div>
            </div>
            <div>
              <span className="uppercase text-xs text-stone-400">Systems &amp; AI</span>
              <div>Chatbots, RAG, LangChain, Vector Databases, System Design</div>
            </div>
          </div>
        </Sidenote>
      </div>
      {/* Page 3: Experience */}
      <div
        id="experience"
        className="min-h-[100svh] relative w-full text-white font-[modernist-regular] text-xs sm:text-sm"
      >
        <Sidenote
          title="Work2Fish (Nov 2025 - Jan 2026)"
          className="left-1/2 -translate-x-1/2 top-20 sm:left-10 sm:translate-x-0 sm:top-24"
        >
          Built Android and iOS components for a financial utility
          platform, integrating chatbots and in-app ads while collaborating
          across teams to improve performance and usability.
        </Sidenote>
        <Sidenote
          title="Hudbil Pvt Ltd (Aug 2024 - Dec 2024)"
          className="left-1/2 -translate-x-1/2 bottom-10 sm:left-auto sm:right-10 sm:translate-x-0 sm:bottom-24"
        >
          Built a client dashboard with MERN and Next.js, integrated a custom
          chatbot, and implemented GSAP animations for a cleaner, maintainable
          frontend.
        </Sidenote>
      </div>
      {/* Page 4: Education */}
      <div
        id="education"
        className="min-h-[100svh] relative w-full text-white font-[modernist-regular] text-xs sm:text-sm"
      >
        <Sidenote
          title="Education"
          className="left-1/2 -translate-x-1/2 top-24 sm:left-auto sm:right-10 sm:translate-x-0 sm:top-1/3"
        >
          <div className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2">
            <div>B.Tech, Artificial Intelligence &amp; Machine Learning (MAIT)</div>
            <div>CGPA 8.1/10</div>
            <div>Class 12th, CBSE</div>
            <div>84.5%</div>
            <div>Class 10th, CBSE</div>
            <div>89.2%</div>
          </div>
        </Sidenote>
      </div>
      {/* Page 5: Projects */}
      <div
        id="projects"
        className="min-h-screen w-full relative font-[modernist-regular] text-xs sm:text-sm text-white z-50"
      >
        <div className="absolute inset-0 px-5 sm:px-10 py-20 sm:py-24">
          <div className="uppercase text-xs font-semibold text-stone-400 mb-6">
            Projects
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            <div className="bg-black/70 p-4 border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/20">
                <div>Mooz Project</div>
                <a
                  href="https://mooz-project.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-stone-400"
                >
                  Visit
                </a>
              </div>
              <div className="pt-3">
                A responsive web project showcasing a clean UI and modern
                layout, built for fast loading and smooth interactions.
              </div>
              <div className="mt-4 aspect-video w-full overflow-hidden">
                <iframe
                  title="Mooz Project"
                  src="https://mooz-project.vercel.app/"
                  className="h-full w-full"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className="bg-black/70 p-4 border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/20">
                <div>Quillio Notes</div>
                <a
                  href="https://quillio-notes.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-stone-400"
                >
                  Visit
                </a>
              </div>
              <div className="pt-3">
                A multi-tenant notes app focused on productivity with secure
                access and organized note management.
              </div>
              <div className="mt-4 aspect-video w-full overflow-hidden">
                <iframe
                  title="Quillio Notes"
                  src="https://quillio-notes.vercel.app/"
                  className="h-full w-full"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className="bg-black/70 p-4 border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/20">
                <div>Mojito</div>
                <a
                  href="https://mojito-murex.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-stone-400"
                >
                  Visit
                </a>
              </div>
              <div className="pt-3">
                A bold, animated landing page concept with playful
                typography and smooth scroll-driven interactions.
              </div>
              <div className="mt-4 aspect-video w-full overflow-hidden">
                <iframe
                  title="Mojito"
                  src="https://mojito-murex.vercel.app/"
                  className="h-full w-full"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div
        id="connect"
        className="min-h-[40vh] sm:min-h-[50vh] w-full relative font-[modernist-regular] text-xs sm:text-sm"
      >
        <div className="absolute inset-x-0 bottom-8 sm:bottom-10 flex flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between sm:px-10 z-50">
          <a
            href="mailto:anubhavsingh.ag@gmail.com"
            className="uppercase text-xs font-semibold text-stone-600"
          >
            Connect
          </a>
          <div className="flex flex-wrap items-center justify-center gap-6 capitalize tracking-wide">
            <a
              href="https://github.com/A-n-u-b-h-a-v"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anubhav-gusain/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:anubhavsingh.ag@gmail.com">Email</a>
            <a href="tel:+918368483423">Phone</a>
          </div>
        </div>
      </div>
    </div>
  );
}
