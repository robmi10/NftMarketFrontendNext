import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import auctionAddress from "../../chain-info/deployments/80001/0xC571e33deaBBDbe12b5e36B164395b5b85eEa327.json";
import { NftContext } from "../../nftContext/context";
import { auctionContractAddress } from "../contracts/adress";

const useWithdraw = () => {
  const {
    data,
    tokenURI,
    userAddress,
    setBidNft,
    setTransactionStatus,
    setWidthdrawNft,
  } = useContext(NftContext);
  const { Moralis } = useMoralis();
  const { abi } = auctionAddress;

  const withdrawNFT = async (option) => {
    console.log("check put bid option ->", option);
    console.log({ userAddress });
    const withdraNFTOptions = {
      abi,
      contractAddress: auctionContractAddress,
      msgSender: userAddress,
      functionName: "widthdraw",
      params: {
        _id: option.AuctionID,
      },
    };

    const withdraNFTFunc = await Moralis.executeFunction(withdraNFTOptions);
    setTransactionStatus({ loading: "loading", id: option.TokenId });
    const withdraNFTConfirmation = await withdraNFTFunc
      .wait()
      .then((status) => {
        console.log({ status });
        setWidthdrawNft({
          status: status.events[1].args,
          Bidder: option.Bidder,
          TokenId: option.TokenId,
          AuctionID: option.AuctionID,
        });
      })
      .catch((e) => {
        console.log({ e });
      });
    console.log({ withdraNFTConfirmation });
  };
  return { withdrawNFT };
};

export default useWithdraw;
