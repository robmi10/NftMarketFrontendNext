import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NftContext } from "../../nftContext/context";
import BouncerLoader from "../animation/loader/bouncerLoader";
import useNftToMarketAuction from "../moralis/useNftToMarketAuction";

const FormAuction = ({ openModalSellData }) => {
  const { openModal } = useContext(NftContext);
  const { register, handleSubmit } = useForm();
  const { NftToMarketAuction } = useNftToMarketAuction();

  useEffect(() => {
    console.log("update modal in auction", openModal);
  }, [openModal]);

  const onSubmitAuction = (data) => {
    console.log({ data });
    const createSellData = { form: data, openModalSellData: openModalSellData };
    console.log({ createSellData });
    NftToMarketAuction(createSellData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmitAuction)}
        class="m-20 mb-20 mt-10 flex flex-col"
      >
        <label for="first">Startprice</label>
        <input
          class="max-w-full rounded-md px-4"
          type="number"
          step="any"
          id="price"
          price="second"
          {...register("price", { required: true, minLength: 1 })}
        />

        <label for="first">Duration</label>
        <input
          class="rounded-md px-4"
          type="date"
          id="date"
          {...register("date", { required: true })}
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
    </div>
  );
};

export default FormAuction;
