import { useProgress } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Loader({ onFinish }) {
  const { progress, loaded, total } = useProgress();

  useEffect(() => {
    if (progress === 100 && loaded === total) {
      const timeout = setTimeout(() => onFinish(), 600); // smooth fade
      return () => clearTimeout(timeout);
    }
  }, [progress, loaded, total, onFinish]);

  return (
    
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: [1,1,0] }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
    >
      <div className="text-center">
        <h1 className="uppercase text-[8rem] md:text-[12rem] font-[modernist-bold]">
          {progress.toFixed(0)}%
        </h1>
      </div>
    </motion.div>
    
  );
}
export default Loader