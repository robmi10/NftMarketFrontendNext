import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import auctionAddress from "../../chain-info/deployments/80001/0xC571e33deaBBDbe12b5e36B164395b5b85eEa327.json";
import { NftContext } from "../../nftContext/context";
import { auctionContractAddress } from "../contracts/adress";

const useEnd = () => {
  const { userAddress, setTransactionStatus, setEndNft } =
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
        _id: option.option.AuctionID,
      },
    };

    console.log({ endNFTOptions });
    const endNFTFunc = await Moralis.executeFunction(endNFTOptions);
    setTransactionStatus({ loading: "loading", id: option.option.AuctionID });
    const endNFTConfirmation = await endNFTFunc
      .wait()
      .then((status) => {
        console.log({ status });
        setEndNft({
          status: status.events[1].args,
          Seller: option.option.Seller,
          Bid: option.option.Bidder,
          TokenId: option.option.TokenId,
          AuctionID: option.option.AuctionID,
          Price: option.option.Bid,
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
