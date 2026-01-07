import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../public/soundWave_animation.json";

const LottieAnim = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const storageKey = "statue-sound";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.volume = 0.3;
    const storedPreference = window.localStorage.getItem(storageKey);
    const shouldPlay =
      storedPreference === null ? true : storedPreference === "on";

    if (storedPreference === null) {
      window.localStorage.setItem(storageKey, "on");
    }

    if (!shouldPlay) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(true);
      }
      window.localStorage.setItem(storageKey, "on");
    } else {
      audio.pause();
      setIsPlaying(false);
      window.localStorage.setItem(storageKey, "off");
    }
  }

  return (
    <div className="flex w-full justify-center items-center gap-2">
      <Lottie
        options={defaultOptions}
        height={20}
        width={35}
        isPaused={!isPlaying}
        isClickToPauseDisabled={true}
      />
      <audio
        ref={audioRef}
        src="/audioSample.mp3"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      ></audio>
      <button
        className="flex items-center gap-2 relative min-w-20"
        onClick={toggleAudio} 
      >
        Sound :
        <span className="text-gray-500 font-extralight absolute right-0 min-w-6 flex items-center">
          {" " +(isPlaying ? " ON" : " OFF")}
        </span>
      </button>
    </div>
  );
};

export default LottieAnim;
