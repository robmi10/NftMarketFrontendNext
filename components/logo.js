import React from "react";
import { useRive } from "@rive-app/react-canvas";
import RiveComponent from "@rive-app/react-canvas";
import PharaoRiv from "./rive/pharao.riv";
import { AnimatedTitle } from "./animation/AnimatedText/animationtext";
import pharao from "./rive/boxes.riv";
export const Logo = () => {
  // const { rive } = useRive({
  //   src: "../pharao.riv",
  //   autoplay: false,
  // });

  const { rive, RiveComponent } = useRive({
    src: "https://rive.app/community/3679-7682-birdy/",
    autoplay: false,
  });
  return (
    <div className="flex h-screen justify-center">
      <div className="mt-10 flex h-5/6 w-4/6 rounded-md ">
        <div className="space-y-30 flex w-full flex-col items-center">
          <div className="body-font mt-10 font-poppins text-7xl font-bold ">
            WELCOME TO NFT MARKET
          </div>
          <div className="body-font mt-10 font-poppins text-3xl">
            THE BEST NFT MARKET IN THE WORLD
          </div>
          <div className="body-font mt-10 font-poppins text-2xl">
            START BUY CREATING YOUR FIRST NFT
          </div>
          {/* <RiveComponent
            onMouseEnter={() => rive && rive.play()}
            onMouseLeave={() => rive && rive.pause()}
          /> */}
          {/* <RiveComponent src={PharaoRiv} className="base-canvas-size" /> */}
        </div>
      </div>
    </div>
  );
};
