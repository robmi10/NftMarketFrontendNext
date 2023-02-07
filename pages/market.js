import React, { useContext, useEffect, useState } from "react";
import BouncerLoader from "../components/animation/loader/bouncerLoader";
import styles from "../components/animation/TabSlide/tabslide.module.scss";
import CardAuction from "../components/card/cardAuction";
import CardBuy from "../components/card/cardBuy";
import NftCardAuction from "../components/card/nftCardAuction";
import NftCardBuy from "../components/card/nftCardBuy";
import GetIpfsTokenURI from "../components/filterList";
import Modal from "../components/modal";
import { NftContext } from "../nftContext/context";
import { useToast } from "@chakra-ui/react";
import { parseUnits } from "ethers/lib/utils";

const Market = () => {
  const {
    marketAuction,
    nftListOnSale,
    openModal,
    searchInput,
    nftListOnAuction,
    transactionStatus,
    toastNotifcation,
    setToastNotifcation,
  } = useContext(NftContext);
  const [openModalBid, setOpenModalBid] = useState(false);
  const [isMarketAuction, setMarketAuction] = useState(false);
  const toast = useToast();
  useEffect(() => {
    console.log({ toastNotifcation });
    if (toastNotifcation) {
      toastNotifcation.type === "buy"
        ? toast({
            title: "NFT transaction.",
            description: `${toastNotifcation.to} bought NFT from ${toastNotifcation.seller}.`,
            status: "success",
            duration: 4000,
            isClosable: true,
          })
        : toastNotifcation.type === "bid"
        ? toast({
            title: "NFT bid.",
            description: `Your'e NFT bid of ${toastNotifcation.price} is succeded.`,
            status: "success",
            duration: 4000,
            isClosable: true,
          })
        : toast({
            title: "Auction ended.",
            description: `Auction is ended the highest bidder was ${toastNotifcation.owner} \n
                        with ${toastNotifcation.price} MATIC.`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });

      setToastNotifcation(false);
    }
  }, [openModal, toastNotifcation]);

  useEffect(() => {
    console.log(
      '"update nftListOnSale and nftListOnAuction IN Market!"',
      transactionStatus
    );
  }, [transactionStatus, nftListOnSale, nftListOnAuction]);

  if (!nftListOnSale) return false;
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
        <div className={styles.container}>
          <div class="lg:p-3/4 flex h-11 w-3/4 items-center rounded-lg shadow-lg shadow-[#185ee041] lg:relative lg:w-auto">
            <input type="radio" id="radio-1" name="tabs" />
            <label
              className={styles.tab}
              for="radio-1"
              onClick={() => {
                setMarketAuction(false);
              }}
            >
              Sale
            </label>
            <input type="radio" id="radio-2" name="tabs" />
            <label
              className={styles.tab}
              for="radio-2"
              onClick={() => {
                setMarketAuction(true);
              }}
            >
              Auction
            </label>
            <span className={styles.glider}></span>
          </div>
        </div>
      </div>
      <div class="mt-5 mb-5 flex w-screen flex-wrap justify-center gap-5 rounded-sm">
        {!isMarketAuction
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
  );
};

export default Market;
