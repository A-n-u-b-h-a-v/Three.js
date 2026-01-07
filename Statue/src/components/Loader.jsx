import { useProgress } from "@react-three/drei";
import { motion as Motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Loader({ onFinish, loading }) {
  const { progress, loaded, total } = useProgress();
  const isLoaded = progress === 100 && loaded === total;
  const startTimeRef = useRef(Date.now());
  const [fadeName, setFadeName] = useState(false);
  const [startSplit, setStartSplit] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const nameAnimation = fadeName
    ? { color: "#000000", opacity: 0.2 }
    : { color: "#ffffff", opacity: 1 };
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(100, Math.max(0, progress || 0));
  const progressOffset =
    circumference - (clampedProgress / 100) * circumference;
  useEffect(() => {
    if (!startSplit) {
      setShowProgress(true);
      return;
    }
    const hideTimeout = setTimeout(() => setShowProgress(false), 1400);
    return () => clearTimeout(hideTimeout);
  }, [startSplit]);

  useEffect(() => {
    if (!isLoaded) {
      setFadeName(false);
      setStartSplit(false);
      return;
    }
    const elapsed = Date.now() - startTimeRef.current;
    const minDelay = Math.max(0, 6000 - elapsed);
    const fadeTimeout = setTimeout(() => setFadeName(true), minDelay-400);
    const splitTimeout = setTimeout(() => setStartSplit(true), minDelay + 600);
    const finishTimeout = setTimeout(() => onFinish(), minDelay + 1400);
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(splitTimeout);
      clearTimeout(finishTimeout);
    };
  }, [isLoaded, onFinish]);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    document.documentElement.style.overflow = loading ? "hidden" : "";
    document.body.style.height = loading ? "100%" : "";
    document.documentElement.style.height = loading ? "100%" : "";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
    };
  }, [loading]);

  return (
    <Motion.div className="fixed inset-0 z-50">
      <Motion.div
        animate={{ y: startSplit ? "-100%" : 0 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-1/2 w-full bg-black"
      />
      <Motion.div
        animate={{ y: startSplit ? "100%" : 0 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-1/2 w-full bg-black"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Motion.div
          animate={nameAnimation}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="uppercase text-[20vw] leading-none overflow-hidden w-full text-center font-[modernist-bold] px-4"
        >
          <h1>anubhav</h1>
          <h1>gusain</h1>
        </Motion.div>
      </div>
      {showProgress && (
        <Motion.div
          animate={{
            color: fadeName ? "#000000" : "#ffffff",
            opacity: startSplit ? 0 : 1,
            y: startSplit ? 16 : 0,
          }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 font-[modernist-regular]"
        >
          <div className="relative w-12 h-12 sm:w-14 sm:h-14">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                opacity="0.5"
              />
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={progressOffset}
                style={{ transition: "stroke-dashoffset 0.2s ease" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs">
              {progress.toFixed(0)}%
            </span>
          </div>
        </Motion.div>
      )}
    </Motion.div>
  );
}
export default Loader
