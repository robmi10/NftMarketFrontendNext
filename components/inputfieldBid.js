import { useContext, useEffect } from "react";
import { NftContext } from "../nftContext/context";
import { useForm } from "react-hook-form";
import useBidNft from "./moralis/useBidNft";
import BouncerLoader from "./animation/loader/bouncerLoader";

const InputfieldBid = (bidInfo) => {
  const { handleOpenSellModal } = bidInfo;
  const { register, handleSubmit } = useForm();
  const { openModal } = useContext(NftContext);
  const { bidNFT } = useBidNft();
  const onSubmit = (data) => {
    const { bid } = data;
    bidNFT({ ...{ bid, bidInfo } });
  };

  useEffect(() => {
    if (!openModal) {
      handleOpenSellModal(false);
    }
  }, [openModal]);

  return (
    <>
      <div classname="w-wh relative z-20 flex h-full  content-center items-center justify-center rounded-md bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 shadow-lg shadow-[#185ee041] dark:from-indigo-800 dark:via-purple-600 dark:to-pink-400 lg:h-full">
        <h1
          classname="absolute top-0 left-0 mt-5 ml-20 w-0 cursor-pointer bg-slate-400 text-white"
          onClick={() => {
            handleOpenSellModal(false);
          }}
        >
          X
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          classname="m-20 mb-20 mt-10 flex flex-col"
        >
          <label classname="text-white" for="first">
            BID
          </label>
          <input
            classname="flex-start rounded-md px-4"
            type="number"
            step="any"
            id="bid"
            {...register("bid", { required: true, minLength: 1 })}
          />

          <button
            classname="pl-2/4 mt-10 flex h-12 w-96 cursor-pointer  items-center justify-center rounded-lg bg-white shadow-lg shadow-[#185ee041] hover:shadow-xl hover:shadow-[#185ee041] dark:bg-gray-600"
            type="submit"
          >
            <div classname="flex items-center justify-center">
              {openModal === "loading" ? <BouncerLoader /> : <div>Submit</div>}
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default InputfieldBid;
