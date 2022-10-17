import { useContext, useEffect, useState } from "react";
import FormBid from "./form/formBid";
import { NftContext } from "../nftContext/context";
import { useForm } from "react-hook-form";
import useBidNft from "./moralis/useBidNft";
import BouncerLoader from "./animation/loader/bouncerLoader";

const InputfieldBid = ({ handleOpenSellModal, openModalSellData }) => {
  const { register, handleSubmit } = useForm();
  const { setOpenModal, bidType, openModal } = useContext(NftContext);
  const { bidNFT } = useBidNft();
  const onSubmit = (data) => {
    console.log(data);
    const createSellData = { form: data, openModalSellData: openModalSellData };
    bidNFT(createSellData);
  };

  useEffect(() => {
    if (!openModal) {
      handleOpenSellModal(false);
    }
  }, [openModal]);

  return (
    <>
      <div class="w-wh relative flex h-full content-center items-center justify-center rounded-md bg-blue-600">
        <h1
          class="absolute top-0 left-0 mt-5 ml-20 w-0 cursor-pointer bg-slate-400 text-white"
          onClick={() => {
            handleOpenSellModal(false);
          }}
        >
          X
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          class="m-20 mb-20 mt-10 flex flex-col"
        >
          <label class="text-white" for="first">
            BID
          </label>
          <input
            class="flex-start rounded-md px-4"
            type="number"
            step="any"
            id="bid"
            {...register("bid", { required: true, minLength: 2 })}
          />

          <div class="pl-2/4 mt-10 flex h-12 w-96 items-center justify-center rounded-md bg-blue-700 text-white">
            <button class="w-full cursor-pointer" type="submit">
              <div class="flex items-center justify-center">
                {openModal === "loading" ? (
                  <BouncerLoader />
                ) : (
                  <div>Submit</div>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InputfieldBid;