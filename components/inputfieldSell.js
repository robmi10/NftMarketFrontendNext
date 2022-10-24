import { useContext, useEffect, useState } from "react";
import FormSell from "./form/formSell";
import FormAuction from "./form/formAuction";
import FormBid from "./form/formBid";
import { NftContext } from "../nftContext/context";
import styles from "./animation/TabSlide/tabslide.module.scss";

const InputfieldSell = ({ handleOpenSellModal, openModalSellData }) => {
  const [sellType, setSellType] = useState(false);
  const { bidType, setOpenModal, openModal } = useContext(NftContext);

  useEffect(() => {
    if (!openModal) {
      handleOpenSellModal(false);
    }
  }, [openModal]);

  return (
    <>
      <div class="w-wh relative z-20 flex h-full content-center items-center justify-center rounded-md bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 shadow-lg shadow-[#185ee041]">
        <h1
          class="absolute top-0 left-0 mt-5 ml-20 flex w-0 cursor-pointer flex-row gap-20 bg-slate-400 "
          onClick={() => {
            handleOpenSellModal(false);
            setOpenModal(false);
          }}
        >
          X
        </h1>
        <div class="absolute top-0 mt-20 flex w-full cursor-pointer flex-row justify-center gap-20 ">
          <button
            onClick={() => {
              setSellType(false);
            }}
          >
            SELL
          </button>
          <button
            onClick={() => {
              setSellType(true);
            }}
          >
            AUCTION
          </button>
        </div>

        {!sellType && (
          <FormSell
            handleOpenSellModal={handleOpenSellModal}
            openModalSellData={openModalSellData}
          />
        )}
        {sellType && (
          <FormAuction
            handleOpenSellModal={handleOpenSellModal}
            openModalSellData={openModalSellData}
          />
        )}
      </div>
    </>
  );
};

export default InputfieldSell;
