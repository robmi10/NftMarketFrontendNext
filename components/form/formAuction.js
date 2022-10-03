import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { NftContext } from "../../nftContext/context";
import useNftToMarketAuction from "../moralis/useNftToMarketAuction";

const FormAuction = ({ openModalSellData }) => {
  const { register, handleSubmit } = useForm();
  const { NftToMarketAuction } = useNftToMarketAuction();

  const onSubmitAuction = (data) => {
    console.log({ data });
    const createSellData = { form: data, openModalSellData: openModalSellData };
    NftToMarketAuction(createSellData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmitAuction)}
        class="m-20 mb-20 mt-10 flex flex-col"
      >
        <label class="text-white " for="first">
          Startprice
        </label>
        <input
          class="max-w-full rounded-md px-4"
          type="number"
          step="any"
          id="price"
          price="second"
          {...register("price", { required: true, minLength: 1 })}
        />

        <label class="text-white" for="first">
          Duration
        </label>
        <input
          class="rounded-md px-4"
          type="date"
          id="date"
          {...register("date", { required: true })}
        />

        <input
          type="submit"
          class="pl-2/4 mt-10 w-96 rounded-md bg-blue-700 text-white"
        />
      </form>
    </div>
  );
};

export default FormAuction;
