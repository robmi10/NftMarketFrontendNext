import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import auctionAddress from "../../chain-info/deployments/80001/0xC571e33deaBBDbe12b5e36B164395b5b85eEa327.json";
import { NftContext } from "../../nftContext/context";
import { auctionContractAddress } from "../contracts/adress";

const useBidNft = () => {
  const {
    data,
    tokenURI,
    userAddress,
    setTransactionStatus,
    setBidNft,
    setOpenModal,
  } = useContext(NftContext);
  const { Moralis } = useMoralis();
  const { abi } = auctionAddress;

  console.log("inside useBidNft !");
  const bidNFT = async (option) => {
    console.log("check put bid option ->", option);
    console.log({ userAddress });
    const bidNFTOptions = {
      abi,
      contractAddress: auctionContractAddress,
      msgValue: Moralis.Units.ETH(option?.form?.bid),
      msgSender: userAddress,
      functionName: "putBid",
      params: {
        _id: option.openModalSellData.option.option.AuctionID,
      },
    };

    console.log({ bidNFTOptions });
    const bidNFTFunc = await Moralis.executeFunction(bidNFTOptions);
    setOpenModal("loading");
    const bidNFTConfirmation = await bidNFTFunc
      .wait()
      .then((status) => {
        console.log({ status });
        setBidNft({
          status: status.events[1].args,
          owner: option.openModalSellData.option.option.Seller,
          tokenID: option.openModalSellData.option.option.TokenId,
          auctionID: option.openModalSellData.option.option.AuctionID,
        });
      })
      .catch((e) => {
        console.log({ e });
      });
    console.log({ bidNFTConfirmation });
  };
  return { bidNFT };
};

export default useBidNft;
