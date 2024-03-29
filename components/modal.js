import React from "react";
import Inputfield from "./inputfield";
import InputfieldBid from "./inputfieldBid";
import InputfieldSell from "./inputfieldSell";

const Modal = ({ openModalSell, handleOpenSellModal }) => {
  return (
    <>
      <div className="z-40 flex h-screen w-screen items-center justify-center bg-blue-600 bg-opacity-10">
        <div className=" z-40 flex h-4/6 w-3/6 items-center justify-center rounded-md opacity-100">
          {openModalSell?.type === "sell" && (
            <InputfieldSell
              handleOpenSellModal={handleOpenSellModal}
              openModalSellData={openModalSell.data}
            />
          )}
          {!openModalSell && <Inputfield />}
          {openModalSell?.type === "bid" && (
            <InputfieldBid
              handleOpenSellModal={handleOpenSellModal}
              {...openModalSell.data}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
