import { useContext, useEffect, useState } from "react";
import FormSell from "./form/formSell";
import FormAuction from "./form/formAuction";

import { NftContext } from "../nftContext/context";
import styles from "./animation/TabSlide/tabslide.module.scss";

const InputfieldSell = ({ handleOpenSellModal, openModalSellData }) => {
  const [sellType, setSellType] = useState(false);
  const { setOpenModal, openModal } = useContext(NftContext);

  useEffect(() => {
    if (!openModal) {
      handleOpenSellModal(false);
    }
  }, [openModal]);

  return (
    <>
      <div className="w-wh relative z-20 flex h-full  content-center items-center justify-center rounded-md bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 shadow-lg shadow-[#185ee041] dark:from-indigo-800 dark:via-purple-600 dark:to-pink-400 lg:h-full">
        <h1
          className="absolute top-0 left-0 mt-5 ml-20 flex w-0 cursor-pointer flex-row gap-20"
          onClick={() => {
            handleOpenSellModal(false);
            setOpenModal(false);
          }}
        >
          X
        </h1>
        <div className=" absolute top-0 mt-10 flex w-10 cursor-pointer flex-row justify-center gap-10 lg:w-full">
          <div className={styles.container}>
            <div className=" p-3/4 relative flex h-11 w-52 items-center rounded-lg shadow-lg shadow-[#185ee041] lg:w-full">
              <input type="radio" id="radio-1" name="tabs" />
              <label
                className={styles.tab}
                htmlFor="radio-1"
                onClick={() => {
                  setSellType(false);
                }}
              >
                Sale
              </label>
              <input type="radio" id="radio-2" name="tabs" />
              <label
                className={styles.tab}
                htmlFor="radio-2"
                onClick={() => {
                  setSellType(true);
                }}
              >
                Auction
              </label>
              <span className={styles.glider}></span>
            </div>
          </div>
        </div>

        {!sellType && (
          <FormSell
            handleOpenSellModal={handleOpenSellModal}
            {...openModalSellData}
          />
        )}
        {sellType && (
          <FormAuction
            handleOpenSellModal={handleOpenSellModal}
            {...openModalSellData}
          />
        )}
      </div>
    </>
  );
};

export default InputfieldSell;
