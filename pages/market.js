import React, { useContext, useState } from "react";
import CardAuction from "../components/card/cardAuction";
import CardBuy from "../components/card/cardBuy";
import Modal from "../components/modal";
import { NftContext } from "../nftContext/context";

const Market = () => {
  const { marketAuction, setMarketAuction, nftListOnSale, nftListOnAuction } =
    useContext(NftContext);
  const [openModalBid, setOpenModalBid] = useState(false);

  console.log({ nftListOnSale });
  console.log({ nftListOnAuction });

  const handleOpenSellModal = (e) => {
    console.log("inside handleOpenSellModal market");
    setOpenModalBid(e);
  };

  if (openModalBid)
    return (
      <Modal
        openModalSell={openModalBid}
        handleOpenSellModal={handleOpenSellModal}
      />
    );

  return (
    <div>
      <div class="flex justify-center">
        <div class="mt-10 flex w-4/6 flex-row justify-center space-x-10">
          <div
            class="cursor-pointer underline"
            onClick={() => {
              setMarketAuction(false);
            }}
          >
            SALE
          </div>
          <div
            class="cursor-pointer underline"
            onClick={() => {
              setMarketAuction(true);
            }}
          >
            AUCTION
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="mt-10 flex h-screen w-screen flex-wrap justify-center gap-5 overflow-auto rounded-sm">
          {!marketAuction
            ? nftListOnSale?.map((option, i) => {
                return <CardBuy option={option} />;
              })
            : nftListOnAuction?.map((option, i) => {
                return (
                  <CardAuction
                    handleOpenSellModal={handleOpenSellModal}
                    option={option}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Market;
