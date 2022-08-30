import React from "react";
import Inputfield from "./inputfield";

const Modal = () => {
  return (
    <>
      <div class="z-40 flex h-screen w-screen items-center justify-center bg-blue-600 bg-opacity-10">
        <div class=" z-40 flex h-4/6 w-3/6 items-center justify-center rounded-md opacity-100">
          <Inputfield />
        </div>
      </div>
    </>
  );
};

export default Modal;
