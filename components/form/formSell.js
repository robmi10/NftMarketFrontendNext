import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NftContext } from "../../nftContext/context";
import useNftToMarket from "../moralis/useNftToMarket";

const FormSell = ({ openModalSellData }) => {
  const { register, handleSubmit } = useForm();
  const { NftToMarket } = useNftToMarket();
  const { setOpenModalSell } = useContext(NftContext);

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
        <label class="text-white " for="first">
          Price
        </label>
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
        <input
          type="submit"
          class="pl-2/4 mt-10 w-96 rounded-md bg-blue-700 text-white"
        />
      </form>
    </>
  );
};

export default FormSell;
