import React, { useContext, useState } from "react";
import CardProfile from "../components/card/card";
import Modal from "../components/modal";
import { NftContext } from "../nftContext/context";

const MyCollection = () => {
  const { nftList, userAddress } = useContext(NftContext);
  const [openModalSell, setOpenModalSell] = useState(false);

  const myNfts = nftList?.filter(
    (option) => option?.Seller?.toLowerCase() === userAddress[0]
  );
  console.log({ myNfts });

  const handleOpenSellModal = (e) => {
    setOpenModalSell(e);
  };

  if (openModalSell)
    return (
      <Modal
        openModalSell={openModalSell}
        handleOpenSellModal={handleOpenSellModal}
      />
    );
  return (
    <>
      <div class="flex justify-center">
        <div class="mt-10 flex w-4/6 flex-row justify-center space-x-10 rounded-sm">
          <div class="underline">COLLECTION</div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="mt-10 flex h-auto w-5/6 flex-row flex-wrap justify-center gap-10 overflow-auto">
          {myNfts.map((option, i) => {
            return (
              <CardProfile
                key={i}
                option={option}
                handleOpenSellModal={handleOpenSellModal}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyCollection;
