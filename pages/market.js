import React, { useContext, useEffect, useState } from "react";
import styles from "../components/animation/TabSlide/tabslide.module.scss";
import NftCardAuction from "../components/card/nftCardAuction";
import NftCardBuy from "../components/card/nftCardBuy";
import Modal from "../components/modal";
import { NftContext } from "../nftContext/context";
import { useToast } from "@chakra-ui/react";

const Market = () => {
  const {
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

  useEffect(() => {}, [transactionStatus, nftListOnSale, nftListOnAuction]);

  if (!nftListOnSale) return false;
  const nftsListedSale = nftListOnSale?.filter((option) => {
    const { Nft } = option;
    const { ipfsInfo } = option.Nft;

    return searchInput === ""
      ? option
      : ipfsInfo?.description.toLowerCase().includes(searchInput) ||
          ipfsInfo?.title.toLowerCase().includes(searchInput) ||
          Nft?.Owner.toLowerCase().includes(searchInput);
  });

  const nftsListedAuction = nftListOnAuction?.filter((option) => {
    const { Nft } = option;
    const { ipfsInfo } = option.Nft;
    return searchInput === ""
      ? option
      : ipfsInfo?.description.toLowerCase().includes(searchInput) ||
          ipfsInfo?.title.toLowerCase().includes(searchInput) ||
          Nft?.Owner?.toLowerCase().includes(searchInput);
  });

  const handleOpenSellModal = (e) => {
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

  console.log({ nftsListedAuction });

  return (
    <div classNameName="pb-36">
      <div classNameName="mt-20   flex justify-center">
        <div className="lg:p-3/4 flex h-11 w-3/4 items-center rounded-lg shadow-lg shadow-[#185ee041] lg:relative lg:w-auto">
          <input type="radio" id="radio-1" name="tabs" />
          <label
            classNameName={styles.tab}
            for="radio-1"
            onClick={() => {
              setMarketAuction(false);
            }}
          >
            Sale
          </label>
          <input type="radio" id="radio-2" name="tabs" />
          <label
            classNameName={styles.tab}
            for="radio-2"
            onClick={() => {
              setMarketAuction(true);
            }}
          >
            Auction
          </label>
          <span classNameName={styles.glider}></span>
        </div>
      </div>

      {nftListOnSale.length <= 0 && (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 ">
          {nftsListedSale.length <= 0 && (
            <h1 classNameName=" text-4xl font-extrabold">No Nfts ...</h1>
          )}{" "}
        </div>
      )}

      <div className="mt-5 mb-5 flex w-screen flex-wrap justify-center gap-5 rounded-sm">
        {!isMarketAuction && nftsListedSale.length > 0 ? (
          nftsListedSale?.map((nft, i) => {
            return <NftCardBuy {...nft} />;
          })
        ) : isMarketAuction && nftsListedAuction.length > 0 ? (
          nftsListedAuction?.map((nft, i) => {
            return (
              <div className="mt-5 mb-5 flex w-screen flex-wrap justify-center gap-5 rounded-sm">
                {nftsListedAuction.length > 0 && (
                  <NftCardAuction
                    handleOpenSellModal={handleOpenSellModal}
                    {...nft}
                  />
                )}
              </div>
            );
          })
        ) : isMarketAuction && nftsListedAuction.length <= 0 ? (
          <>
            {" "}
            {
              <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 ">
                {nftsListedAuction.length <= 0 && (
                  <h1 classNameName=" text-4xl font-extrabold">
                    No Auctions ...
                  </h1>
                )}{" "}
              </div>
            }
          </>
        ) : (
          <>
            {" "}
            {
              <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 ">
                {nftsListedAuction.length <= 0 && (
                  <h1 classNameName=" text-4xl font-extrabold">No Nfts ...</h1>
                )}{" "}
              </div>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default Market;
