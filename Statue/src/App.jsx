import gsap from "gsap";
import Model from "./components/Model";
import Navbar from "./components/Navbar";
import BackgroundVideo from "./components/BackgroundVideo";
import { ReactLenis } from "lenis/react";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef();
  const sceneRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);

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

  return (
    <div ref={mainRef}>
      <ReactLenis root />
      {/* Loader Overlay with AnimatePresence */}
      <AnimatePresence>
        {loading && <Loader onFinish={() => setLoading(false)} />}
      </AnimatePresence>
      {/* Background Video */}
      <BackgroundVideo />
      <div className="h-screen w-full relative">
        <Navbar />

        <div className="uppercase text-[18rem] leading-none overflow-hidden w-full text-center font-[modernist-bold]">
          <h1>monolith</h1>
        </div>
        <span className="w-52 ms-10 absolute bottom-1/4 text-sm  font-semibold  font-[modernist-regular] left-0">
          MONOLITH STUDIO, Contemporary Tattoo Studio Based in Mumbai, IND{" "}
        </span>
        <span className="font-[modernist-bold] uppercase text-sm px-4 py-2 animate-bounce absolute right-0 bottom-0">
          {" "}
          Keep Scrolling{" "}
        </span>

        {/* 3D Scene */}
        <div ref={sceneRef} className="h-screen fixed top-0 w-full">
          <Canvas shadows>
            <Suspense fallback={null}>
              <Model progress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>
      </div>
      {/* Extra sections */}
      <div className="h-screen font-[modernist-regular] w-full relative">
        <div className="absolute top-36 left-10 w-1/3">
          <div className="uppercase text-xs  font-semibold text-stone-600 py-8 ">
            About
          </div>
          <p className="text-2xl tracking-tightest leading-6">
            Monolith Studio, founded by internationally renowned pioneers of
            Fine Line Tattoo,Micro Realism Tattoo , and Minimalist Tattoo , Okan
            Uçkun and Oscar Akermo, hosts the world's and Brooklyn's best tattoo
            artists in Brooklyn, NYC.
          </p>
        </div>
      </div>
      <div className="h-screen relative  w-full text-white font-[modernist-regular] text-sm">
        <div className="absolute w-96 right-1/5 bottom-20 bg-black">
          <div className="flex items-center justify-between  p-4  border-b-2 border-b-white">
            <div>Sidenote</div>
            <div className="size-2 rounded-full bg-white"></div>
          </div>
          <div className="p-4">
            Each of our works is unique, crafted especially for you to meet your
            artistic vision and technical expectations.
          </div>
        </div>
      </div>
      <div className="h-screen font-[modernist-regular] w-full relative">
        <div className="absolute right-24 bottom-20 w-1/3">
          <div className="uppercase text-xs  font-semibold text-stone-600 py-8 ">
            Our Vision
          </div>
          <p className="text-2xl tracking-tightest leading-6">
            At our Brooklyn tattoo studio, we believe in the power of creativity
            and self-expression. Our vision is to transform your ideas and
            unique stories into stunning, one-of-a-kind tattoos in collaboration
            with the best tattoo artists from NYC and around the world.
          </p>
        </div>
      </div>
      <div className="h-screen relative  w-full text-white font-[modernist-regular] text-sm">
        <div className="absolute w-96 left-15 top-1/3 bg-black">
          <div className="flex items-center justify-between  p-4  border-b-2 border-b-white">
            <div>Sidenote</div>
            <div className="size-2 rounded-full bg-white"></div>
          </div>
          <div className="p-4">
            We see each tattoo as a piece of art, a narrative that unfolds on
            your skin. Your body is a canvas, and we strive to create
            masterpieces that reflect your individuality and passions.
          </div>
        </div>
      </div>
      <div className="relative uppercase text-[12rem] h-[75vh] w-full  font-[modernist-bold] ">
        <div className="absolute w-1/2 tracking-tighter top-0 leading-40 ms-10 -z-10 ">
          MEET THE ARTISTS
        </div>
      </div>
    </div>
  );
}
