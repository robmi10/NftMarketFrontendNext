import React, { useContext } from "react";
import { NftContext } from "../nftContext/context";
import Inputfield from "./inputfield";
import InputfieldBid from "./inputfieldBid";
import InputfieldSell from "./inputfieldSell";

const Modal = ({ openModalSell, handleOpenSellModal }) => {
  const { openModal, bidType } = useContext(NftContext);
  return (
    <>
      <div class="z-40 flex h-screen w-screen items-center justify-center bg-blue-600 bg-opacity-10">
        <div class=" z-40 flex h-4/6 w-3/6 items-center justify-center rounded-md opacity-100">
          {openModalSell?.status &&
            openModalSell?.type !== "bid" &&
            !openModal && (
              <InputfieldSell
                handleOpenSellModal={handleOpenSellModal}
                openModalSellData={openModalSell.data}
              />
            )}
          {openModal && !openModalSell && <Inputfield />}
          {openModalSell?.type === "bid" && (
            <InputfieldBid
              handleOpenSellModal={handleOpenSellModal}
              openModalSellData={openModalSell.data}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
