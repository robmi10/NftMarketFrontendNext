import { auctionContractAddress } from "../contracts/adress";
import { NftContext } from "../../nftContext/context";
import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import auctionInfo from "../../chain-info/contracts/Auction.json";

const useEnd = () => {
  const { setEndNft } = useContext(NftContext);
  const auctionAddress = auctionContractAddress;
  const auctionInterface = new ethers.utils.Interface(auctionInfo.abi);
  const auctionAddressContract = new Contract(auctionAddress, auctionInterface);

  const {
    state: endBidStatus,
    send: endBidfunction,
    events: endBidEvents,
  } = useContractFunction(auctionAddressContract, "end");

  useEffect(() => {
    if (endBidStatus.status === "Success") {
      setEndNft({
        status: endBidEvents,
        Seller: option.option.Seller,
        Bid: option.option.Bidder,
        TokenId: option.option.TokenId,
        AuctionID: option.option.AuctionID,
        Price: option.option.Price,
      });
      setOpenModal("loading");
    }
  }, [endBidStatus]);

  const endNFT = async (option) => {
    endBidfunction(option.option.AuctionID);
  };
  return { endNFT };
};
export default useEnd;
