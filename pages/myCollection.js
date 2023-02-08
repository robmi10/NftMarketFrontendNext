import React, { useContext, useEffect, useState } from "react";
import NftCard from "../components/card/nftCard";
import Modal from "../components/modal";
import { NftContext } from "../nftContext/context";
import { useToast } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";

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
    </>
  );
};

export default MyCollection;
