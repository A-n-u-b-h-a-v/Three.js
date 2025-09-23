import React, { useEffect, useState } from "react";
import Date from "./Time";
import LottieAnim from "./LottieAnim";


const Navbar = () => {
  

  return (
    <div className="flex w-full p-3  justify-between font-semibold font-[modernist-regular] capitalize tracking-wide text-xs">
      <div className="flex flex-col  z-50">
        Monolith Studio
        <span className="text-gray-500 font-extralight leading-3 text-xs trancking-wideest z-50">
          <div className="flex items-center ">
            <Date />
            <div className="mx-1 size-2 bg-gray-500 animate-pulse rounded-full"></div>
            IND
          </div>
        </span>
      </div>
      <div className="flex justify-between w-1/2 z-50">
        <div>
          <LottieAnim/>
          
        </div>

        <div>
          Artists <br /> Blog
        </div>
        <div className="flex flex-col ">
          Studio <span className="text-gray-500">Lab (Soon)</span>
        </div>
      </div>
      <div className="after:content-['_↗'] z-50">Book Experience</div>
    </div>
  );
};

export default Navbar;
