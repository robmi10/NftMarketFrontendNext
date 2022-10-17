import React, { useContext, useEffect, useState } from "react";
import BouncerLoader from "../components/animation/loader/bouncerLoader";
import CardAuction from "../components/card/cardAuction";
import CardBuy from "../components/card/cardBuy";
import NftCardAuction from "../components/card/nftCardAuction";
import NftCardBuy from "../components/card/nftCardBuy";
import GetIpfsTokenURI from "../components/filterList";
import Modal from "../components/modal";
import { NftContext } from "../nftContext/context";

const Market = () => {
  const {
    marketAuction,
    setMarketAuction,
    nftListOnSale,
    openModal,
    searchInput,
    nftListOnAuction,
    transactionStatus,
  } = useContext(NftContext);
  const [openModalBid, setOpenModalBid] = useState(false);

  useEffect(() => {
    console.log("inside market open modal here");
  }, [openModal]);

  useEffect(() => {
    console.log(
      '"update nftListOnSale and nftListOnAuction IN Market!"',
      transactionStatus
    );
  }, [transactionStatus, nftListOnSale, nftListOnAuction]);

  const nftsListedSale = nftListOnSale?.filter((optionMyNft) => {
    return searchInput === ""
      ? optionMyNft
      : optionMyNft?.ipfsInfo?.description
          .toLowerCase()
          .includes(searchInput) ||
          optionMyNft?.option.ipfsInfo?.title
            .toLowerCase()
            .includes(searchInput) ||
          optionMyNft?.option.Owner.toLowerCase().includes(searchInput);
  });

  const nftsListedAuction = nftListOnAuction?.filter((optionMyNft) => {
    return searchInput === ""
      ? optionMyNft
      : optionMyNft?.ipfsInfo?.description
          .toLowerCase()
          .includes(searchInput) ||
          optionMyNft?.option.ipfsInfo?.title
            .toLowerCase()
            .includes(searchInput) ||
          optionMyNft?.option.Owner.toLowerCase().includes(searchInput);
  });

  const handleOpenSellModal = (e) => {
    console.log("inside handleOpenSellModal market");
    setOpenModalBid(e);
  };

  if (openModalBid && openModal)
    return (
      <Modal
        openModalSell={openModalBid}
        handleOpenSellModal={handleOpenSellModal}
      />
    );

  if (!nftListOnSale) return <h1>LOADING...</h1>;

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
            ? nftsListedSale?.map((option, i) => {
                return <NftCardBuy option={option} />;
              })
            : nftsListedAuction?.map((option, i) => {
                return (
                  <NftCardAuction
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
