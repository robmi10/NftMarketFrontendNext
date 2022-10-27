import React, { useContext, useEffect, useState } from "react";
import BouncerLoader from "../components/animation/loader/bouncerLoader";
import NftCard from "../components/card/nftCard";
import GetIpfsTokenURI from "../components/filterList";
import Modal from "../components/modal";
import { NftContext } from "../nftContext/context";
import { useToast } from "@chakra-ui/react";

const MyCollection = () => {
  const toast = useToast();
  const {
    nftList,
    userAddress,
    searchInput,
    toastNotifcation,
    setToastNotifcation,
  } = useContext(NftContext);
  const [openModalSell, setOpenModalSell] = useState(false);

  useEffect(() => {
    console.log("update nftListOnSale and nftListOnAuction and check lol!");
    console.log({ nftList });

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

  const myNfts = nftList
    ?.filter(
      (option) => option?.option.Seller?.toLowerCase() === userAddress[0]
    )
    ?.filter((optionMyNft) => {
      return searchInput === ""
        ? optionMyNft
        : optionMyNft?.option.ipfsInfo?.description
            .toLowerCase()
            .includes(searchInput) ||
            optionMyNft?.option.ipfsInfo?.title
              .toLowerCase()
              .includes(searchInput);
    });

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

  if (myNfts.length === 0) return <h1>Loading</h1>;
  return (
    <>
      <div class="flex justify-center">
        <div class="mt-10 flex h-12 w-2/6 items-center justify-center rounded-xl shadow-lg shadow-[#185ee041]">
          COLLECTION
        </div>
      </div>
      <div class="mt-10 flex justify-center">
        <div class="mb-5 flex w-5/6 flex-wrap justify-center gap-5 ">
          {myNfts?.map((option, i) => {
            return (
              <NftCard
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
