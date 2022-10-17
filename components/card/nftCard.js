import React, { useContext } from "react";
import { NftContext } from "../../nftContext/context";

const NftCard = ({ option, ipfsInfo, handleOpenSellModal }) => {
  const { setOpenModal } = useContext(NftContext);
  const NftCardData = {
    option: option?.option,
    ipfsInfo: option?.option.ipfsInfo,
  };

  return (
    <div class="border-1 h-5/5 flex w-2/6 flex-col items-center justify-center rounded-md border-black bg-slate-100 drop-shadow-xl">
      <div class="border-1 w-8/10 mt-2 flex items-center justify-center rounded-md border-black bg-slate-400">
        <img
          class="h-56 w-80 rounded-md"
          src={option?.option?.ipfsInfo?.image}
        />
      </div>

      <h1 class="mt-5">{option?.option?.ipfsInfo?.title}</h1>

      <h1 class="mt-5">{option?.option?.TokenId}</h1>

      <div class="mt-5 flex h-4/6 w-5/6 items-center justify-center rounded-sm bg-purple-300">
        <h1>{option?.option.ipfsInfo?.description}</h1>
      </div>

      <div class="m-50 mt-10 mb-5 flex h-2/4 w-full flex-row justify-center space-x-10 ">
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
