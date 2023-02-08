import { auctionContractAddress } from "../contracts/adress";
import { NftContext } from "../../nftContext/context";
import { useContext, useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import auctionInfo from "../../chain-info/contracts/Auction.json";

const useWithdraw = () => {
  const { setWidthdrawNft, setOpenModal } = useContext(NftContext);
  const auctionAddress = auctionContractAddress;
  const auctionInterface = new ethers.utils.Interface(auctionInfo.abi);
  const auctionAddressContract = new Contract(auctionAddress, auctionInterface);
  const [input, setInput] = useState(false);

  const {
    state: widthdrawStatus,
    send: widthdrawfunction,
    events: widthdrawEvents,
  } = useContractFunction(auctionAddressContract, "widthdraw");

  useEffect(() => {
    if (widthdrawStatus.status === "Success") {
      setWidthdrawNft({
        status: widthdrawEvents[0].args,
        Bidder: input.Bidder,
        TokenId: input.TokenId,
        AuctionID: input.AuctionID,
      });
      setOpenModal("loading");
    }
  }, [widthdrawStatus]);

  const withdrawNFT = async (option) => {
    setInput(option);
    widthdrawfunction(option.AuctionID);
  };
  return { withdrawNFT };
};
export default useWithdraw;
