import React, { useContext } from "react";
import { NftContext } from "../../nftContext/context";

const NftCard = ({ option, ipfsInfo, handleOpenSellModal }) => {
  const { setOpenModal } = useContext(NftContext);
  const NftCardData = {
    option: option?.option,
    ipfsInfo: option?.option.ipfsInfo,
  };

  return (
    <div class="border-1 flex h-1/3 w-1/4 flex-col items-center gap-5 rounded-md border-black bg-white bg-opacity-60 drop-shadow-xl backdrop-blur-lg backdrop-filter hover:drop-shadow-2xl">
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
