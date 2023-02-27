import React, { useContext, useEffect, useState } from "react";
import NftCard from "../components/card/nftCard";
import Modal from "../components/modal";
import { NftContext } from "../nftContext/context";
import { useToast } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import BouncerLoader from "../components/animation/loader/bouncerLoader";

const MyCollection = () => {
  const { account } = useEthers();
  const toast = useToast();
  const { nftList, searchInput, toastNotifcation, setToastNotifcation } =
    useContext(NftContext);
  const [openModalSell, setOpenModalSell] = useState(false);

  useEffect(() => {
    if (toastNotifcation) {
      toast({
        title: "NFT listing.",
        description: `Your'e NFT is now listed to the market!`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setToastNotifcation(false);
    }
  }, [nftList, searchInput, toastNotifcation]);

  console.log({ nftList });
  if (!nftList)
    return (
      <div className="h-screen w-screen">
        {" "}
        <BouncerLoader />
      </div>
    );
  const myNfts = nftList
    ?.filter((option) => option?.Nft.Seller === account)
    ?.filter((optionMyNft) => {
      return searchInput === ""
        ? optionMyNft
        : optionMyNft?.Nft.ipfsInfo?.description
            .toLowerCase()
            .includes(searchInput) ||
            optionMyNft?.Nft.ipfsInfo?.title
              .toLowerCase()
              .includes(searchInput);
    });

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

  if (myNfts.length === 0)
    return (
      <div className=" flex h-screen w-screen items-center justify-center">
        <h1 className=" text-4xl font-extrabold">No Collection</h1>
      </div>
    );
  return (
    <div className="pb-36">
      <div className="flex justify-center">
        <div className="mt-10 flex h-12 w-2/6 items-center justify-center rounded-xl shadow-lg shadow-[#185ee041]">
          COLLECTION
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <div className="mb-5 flex w-5/6 flex-wrap justify-center gap-5 ">
          {myNfts?.map((nft, i) => {
            return (
              <NftCard
                key={i}
                {...nft}
                handleOpenSellModal={handleOpenSellModal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyCollection;
