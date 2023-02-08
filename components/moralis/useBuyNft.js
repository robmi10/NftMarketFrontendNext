import { NftContext } from "../../nftContext/context";
import { nftContractAddress } from "../contracts/adress";
import { useContext, useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import nftInfo from "../../chain-info/contracts/NftMarketPlace.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";

const useBuyNft = () => {
  const { setBuyNft } = useContext(NftContext);
  const nftAddress = nftContractAddress;
  const nftInterface = new ethers.utils.Interface(nftInfo.abi);
  const nftAddressContract = new Contract(nftAddress, nftInterface);
  const [input, setInput] = useState(false);

  const {
    state: buyNftStatus,
    send: buyNftfunction,
    events: buyNftEvents,
  } = useContractFunction(nftAddressContract, "buyNft");

  useEffect(() => {
    if (buyNftStatus.status === "Success") {
      setBuyNft({ status: buyNftEvents[0].args, owner: input.Owner });
    }
  }, [buyNftStatus, input]);

  const buyNft = async (nft) => {
    setInput(nft);
    buyNftfunction(nft.TokenId, account, nft.Seller, {
      value: nft?.Price?.toString(),
    });
  };
  return { buyNft };
};
export default useBuyNft;
