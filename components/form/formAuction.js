import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NftContext } from "../../nftContext/context";
import BouncerLoader from "../animation/loader/bouncerLoader";
import useNftToMarketAuction from "../moralis/useNftToMarketAuction";

const FormAuction = (listToMarketAuction) => {
  const { openModal } = useContext(NftContext);
  const { register, handleSubmit } = useForm();
  const { NftToMarketAuction } = useNftToMarketAuction();

  useEffect(() => {}, [openModal]);

  const onSubmitAuction = (form) => {
    const { price, date } = form;
    NftToMarketAuction({ ...{ price, date, listToMarketAuction } });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmitAuction)}
        className="m-20 mb-20 mt-10 flex flex-col"
      >
        <label htmlFor="first">Startprice</label>
        <input
          className="max-w-full rounded-md px-4 dark:bg-white dark:text-black"
          type="number"
          step="any"
          id="price"
          {...register("price", { required: true, minLength: 1 })}
        />

        <label htmlFor="first">Duration</label>
        <input
          className="rounded-md px-4 dark:bg-white dark:text-black"
          type="date"
          id="date"
          {...register("date", { required: true })}
        />

        <button
          className="pl-2/4 mt-10 flex h-12 cursor-pointer items-center justify-center rounded-md bg-white shadow-lg shadow-[#185ee041] hover:shadow-xl hover:shadow-[#185ee041] dark:text-black lg:w-96"
          type="submit"
        >
          <div className="flex items-center justify-center">
            {openModal === "loading" ? <BouncerLoader /> : <div>Submit</div>}
          </div>
        </button>
      </form>
    </div>
  );
};

export default FormAuction;
