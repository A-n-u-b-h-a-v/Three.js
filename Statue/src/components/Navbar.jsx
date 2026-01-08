import React from "react";
import Date from "./Time";
import LottieAnim from "./LottieAnim";

const Navbar = () => {
  return (
    <div className="flex w-full flex-wrap items-center gap-3 min-[726px]:gap-4 p-3 justify-between font-semibold font-[modernist-regular] capitalize tracking-wide text-[10px] min-[726px]:text-sm">
      <div className="hidden min-[726px]:flex flex-col z-50">
        <a href="#portfolio">Portfolio</a>
        <span className="text-gray-500 font-extralight leading-3 text-xs trancking-wideest z-50">
          <div className="flex items-center">
            <Date />
            <div className="mx-1 size-2 bg-gray-500 animate-pulse rounded-full"></div>
            IND
          </div>
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 min-[726px]:gap-6 z-50 w-full min-[726px]:w-auto">
        <a href="#about">About Me</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#connect">Connect</a>
        <a href="#education" className="hidden min-[726px]:inline">
          Education
        </a>
      </div>
      <div className="hidden min-[726px]:block z-50">
        <LottieAnim />
      </div>
    </div>
  );
};

export default Navbar;
