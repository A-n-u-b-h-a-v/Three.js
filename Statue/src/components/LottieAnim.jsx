import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../public/soundWave_animation.json";

const LottieAnim = () => {
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
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
  const audioRef = useRef(null);
  const [audioState, setaudioState] = useState("OFF");
  function toggleAudio() {
    if (audioRef.current.paused) {
      audioRef.current.play();

      setaudioState("ON");
    } else {
      audioRef.current.pause();
      setaudioState("OFF");
    }
  }

  return (
    <div className="flex w-full justify-center items-center gap-2 ">
      <Lottie
        options={defaultOptions}
        height={20}
        width={35}
        isPaused={audioState == "ON" ? false : true}
        isClickToPauseDisabled={true}
      
      />
      <audio ref={audioRef} src="/audioSample.mp3"></audio>
      <button className=" flex items-center gap-2 relative w-18" onClick={toggleAudio}>
        Sound :
        <span className="text-gray-500 font-extralight absolute right-0 min-w-6 flex items-center">
          {" " + audioState}
        </span>
      </button>
    </div>
  );
};

export default LottieAnim;
