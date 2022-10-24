import React, { useContext } from "react";
import { NftContext } from "../../nftContext/context";

const NftCard = ({ option, ipfsInfo, handleOpenSellModal }) => {
  const { setOpenModal } = useContext(NftContext);
  const NftCardData = {
    option: option?.option,
    ipfsInfo: option?.option.ipfsInfo,
  };

  return (
    <div class="border-1 flex w-1/4 flex-col items-center gap-5 rounded-md border-black shadow-lg shadow-[#185ee041] hover:shadow-2xl hover:shadow-[#185ee041]">
      <div class="h-96 w-full">
        <img
          class="h-64 w-full justify-center object-cover"
          src={option.option?.ipfsInfo?.image}
        />
      </div>

      <div class="flex w-full flex-col pl-5">
        <h1>{option?.option?.ipfsInfo?.title}</h1>

        <h1>{option?.option?.TokenId}</h1>
        <h1>{option?.option.ipfsInfo?.description}</h1>
      </div>

      <div class="mt-5 flex h-2/4 w-full items-center justify-center space-x-10">
        {!option?.option.Sale && (
          <button
            class="flex h-1/5 w-3/6 flex-row items-center justify-center rounded-md shadow-lg shadow-[#185ee041] hover:shadow-xl hover:shadow-[#185ee041]"
            onClick={() => {
              handleOpenSellModal({
                status: true,
                data: NftCardData,
                type: "sell",
              });
              setOpenModal(true);
            }}
          >
            LIST TO MARKET
          </button>
        )}
        {option?.option.Sale && <h1>Already On Sale</h1>}
      </div>
    </div>
  );
};

export default NftCard;
