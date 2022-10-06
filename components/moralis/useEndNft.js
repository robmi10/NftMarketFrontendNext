import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import auctionAddress from "../../chain-info/deployments/80001/0x278078b27150871d21406A05668c53a74E8c8E2c.json";
import { NftContext } from "../../nftContext/context";
import { auctionContractAddress } from "../contracts/adress";

const useEnd = () => {
  const { data, tokenURI, userAddress, setBidNft, setWidthdrawNft, setEndNft } =
    useContext(NftContext);
  const { Moralis } = useMoralis();
  const { abi } = auctionAddress;

  const endNFT = async (option) => {
    console.log("check end option ->", option);
    console.log({ userAddress });
    const endNFTOptions = {
      abi,
      contractAddress: auctionContractAddress,
      msgSender: userAddress,
      functionName: "end",
      params: {
        _id: option.AuctionID,
      },
    };

    console.log({ endNFTOptions });
    const endNFTFunc = await Moralis.executeFunction(endNFTOptions);
    const endNFTConfirmation = await endNFTFunc
      .wait()
      .then((status) => {
        console.log({ status });
        setEndNft({
          status: status.events[1].args,
          Seller: option.Seller,
          Bid: option.Bidder,
          TokenId: option.TokenId,
          AuctionID: option.AuctionID,
        });
      })
      .catch((e) => {
        console.log({ e });
      });
    console.log({ endNFTConfirmation });
  };
  return { endNFT };
};

export default useEnd;
