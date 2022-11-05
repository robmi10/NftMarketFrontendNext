import React from "react";
import { useRive } from "@rive-app/react-canvas";
import RiveComponent from "@rive-app/react-canvas";

export const Logo = () => {
  return (
    <div class="flex h-screen justify-center">
      <div class="mt-10 flex h-5/6 w-4/6 rounded-md ">
        <div class="space-y-30 flex w-full flex-col items-center">
          <RiveComponent src="./rive/pharao.riv" />
        </div>
      </div>
    </div>
  );
};
