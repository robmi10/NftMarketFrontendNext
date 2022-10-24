import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NftContext } from "../../nftContext/context";
import BouncerLoader from "../animation/loader/bouncerLoader";
import useNftToMarket from "../moralis/useNftToMarket";

const FormSell = ({ openModalSellData }) => {
  const { register, handleSubmit } = useForm();
  const { NftToMarket } = useNftToMarket();
  const { openModal } = useContext(NftContext);

  const onSubmit = (data) => {
    console.log(data);
    const createSellData = { form: data, openModalSellData: openModalSellData };
    NftToMarket(createSellData);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        class="m-20 mb-20 mt-10 flex flex-col"
      >
        <label for="first">Price</label>
        <input
          class="max-w-full rounded-md px-4"
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
          class="pl-2/4 mt-10 flex h-12 w-96 cursor-pointer items-center justify-center rounded-md bg-white shadow-lg shadow-[#185ee041] hover:shadow-xl hover:shadow-[#185ee041]"
          type="submit"
        >
          <div class="flex items-center justify-center">
            {openModal === "loading" ? <BouncerLoader /> : <div>Submit</div>}
          </div>
        </button>
      </form>
    </>
  );
};

export default FormSell;
