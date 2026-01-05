import { useProgress } from "@react-three/drei";
import { motion as Motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Loader({ onFinish }) {
  const { progress, loaded, total } = useProgress();
  const isLoaded = progress === 100 && loaded === total;
  const startTimeRef = useRef(Date.now());
  const [fadeName, setFadeName] = useState(false);
  const [startSplit, setStartSplit] = useState(false);
  const nameAnimation = fadeName
    ? { color: "#000000", opacity: 0.2 }
    : { color: "#ffffff", opacity: 1 };

  useEffect(() => {
    if (!isLoaded) {
      setFadeName(false);
      setStartSplit(false);
      return;
    }
    const elapsed = Date.now() - startTimeRef.current;
    const minDelay = Math.max(0, 4000 - elapsed);
    const fadeTimeout = setTimeout(() => setFadeName(true), minDelay);
    const splitTimeout = setTimeout(() => setStartSplit(true), minDelay + 600);
    const finishTimeout = setTimeout(() => onFinish(), minDelay + 1400);
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(splitTimeout);
      clearTimeout(finishTimeout);
    };
  }, [isLoaded, onFinish]);

  return (
    <Motion.div className="fixed inset-0 z-50">
      <Motion.div
        animate={{ y: startSplit ? "-100%" : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-1/2 w-full bg-black"
      />
      <Motion.div
        animate={{ y: startSplit ? "100%" : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-1/2 w-full bg-black"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Motion.div
          animate={nameAnimation}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="uppercase text-[18rem] leading-none overflow-hidden w-full text-center font-[modernist-bold]"
        >
          <h1>anubhav</h1>
          <h1>gusain</h1>
        </Motion.div>
      </div>
      <Motion.div
        animate={{ color: fadeName ? "#000000" : "#ffffff" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute bottom-6 right-8 text-xs font-[modernist-regular]"
      >
        {progress.toFixed(0)}%
      </Motion.div>
    </Motion.div>
  );
}
export default Loader
