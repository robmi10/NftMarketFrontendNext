import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import nftAddress from "../../chain-info/deployments/80001/0x4ca9D0c783431827663A6Cfda1565f1C831090F1.json";
import { NftContext } from "../../nftContext/context";
import { nftContractAddress } from "../contracts/adress";

const useBuyNft = () => {
  const { data, tokenURI, userAddress, setBuyNft } = useContext(NftContext);
  const { Moralis } = useMoralis();
  const { abi } = nftAddress;

  const buyNft = async (option) => {
    console.log("check buyNft ->", option);
    console.log("option.Price.toString --->", option.Price);

    console.log({ userAddress });

    const buyNftOptions = {
      abi,
      contractAddress: nftContractAddress,
      functionName: "buyNft",
      msgValue: option?.Price?.toString(),
      // msgSender: userAddress,
      params: {
        _tokenId: option.TokenId,
        _seller: userAddress[0],
        _currentOwner: option.Seller,
      },
    };

    console.log({ buyNftOptions });
    const buyNftFunc = await Moralis.executeFunction(buyNftOptions);
    const buyNftConfirmation = await buyNftFunc
      .wait()
      .then((status) => {
        console.log({ status });
        setBuyNft(status.events[3].args);
      })
      .catch((e) => {
        console.log({ e });
      });
    console.log({ buyNftConfirmation });
  };
  return { buyNft };
};

export default useBuyNft;
