import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NftContext } from "../../nftContext/context";
import useBidNft from "../moralis/useBidNft";

const FormBid = ({ openModalSellData }) => {
  const { register, handleSubmit } = useForm();
  const { bidNFT } = useBidNft();

  const onSubmit = (data) => {
    console.log(data);
    const createSellData = { form: data, openModalSellData: openModalSellData };
    bidNFT(createSellData);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        class="m-20 mb-20 mt-10 flex flex-col"
      >
        <label class="text-white " for="first">
          Bid
        </label>
        <input
          class="max-w-full rounded-md px-4"
          type="number"
          step="any"
          id="bid"
          price="second"
          {...register("bid", {
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

export default FormBid;
