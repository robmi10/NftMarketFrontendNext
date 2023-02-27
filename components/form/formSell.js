import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { NftContext } from "../../nftContext/context";
import BouncerLoader from "../animation/loader/bouncerLoader";
import useNftToMarket from "../moralis/useNftToMarket";

const FormSell = (listToMarket) => {
  const { register, handleSubmit } = useForm();
  const { NftToMarket } = useNftToMarket();
  const { openModal } = useContext(NftContext);

  const onSubmit = (form) => {
    const { price } = form;
    NftToMarket({ ...{ price, listToMarket } });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-20 mb-20 mt-10 flex flex-col"
      >
        <label htmlFor="first">Price</label>
        <input
          className="max-w-full rounded-md px-4 dark:bg-white dark:text-black"
          type="number"
          step="any"
          id="price"
          price="second"
          {...register("price", {
            required: true,
            minLength: 1,
          })}
        />

        <button
          className="pl-2/4 mt-10 flex h-12 cursor-pointer items-center justify-center rounded-md bg-white shadow-lg shadow-[#185ee041] hover:shadow-xl hover:shadow-[#185ee041] dark:from-indigo-800 dark:via-purple-600 dark:to-pink-400 dark:text-black lg:w-96"
          type="submit"
        >
          <div className="flex items-center justify-center">
            {openModal === "loading" ? <BouncerLoader /> : <div>Submit</div>}
          </div>
        </button>
      </form>
    </>
  );
};

export default FormSell;
