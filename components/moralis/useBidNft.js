import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import auctionAddress from "../../chain-info/deployments/80001/0x278078b27150871d21406A05668c53a74E8c8E2c.json";
import { NftContext } from "../../nftContext/context";
import { auctionContractAddress } from "../contracts/adress";

const useBidNft = () => {
  const { data, tokenURI, userAddress, setBidNft } = useContext(NftContext);
  const { Moralis } = useMoralis();
  const { abi } = auctionAddress;

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
        _id: option.openModalSellData.option.AuctionID,
      },
    };

    console.log({ bidNFTOptions });
    const bidNFTFunc = await Moralis.executeFunction(bidNFTOptions);
    const bidNFTConfirmation = await bidNFTFunc
      .wait()
      .then((status) => {
        console.log({ status });
        setBidNft({
          status: status.events[1].args,
          owner: option.openModalSellData.option.Seller,
          tokenID: option.openModalSellData.option.TokenId,
          auctionID: option.openModalSellData.option.AuctionID,
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
