import { NftContext } from "../../nftContext/context";
import { nftContractAddress } from "../contracts/adress";
import { useContext, useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import nftInfo from "../../chain-info/contracts/NftMarketPlace.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { parseUnits } from "ethers/lib/utils";

const useBidNft = () => {
  const { setBidNft, setOpenModal } = useContext(NftContext);
  const nftAddress = nftContractAddress;
  const nftInterface = new ethers.utils.Interface(nftInfo.abi);
  const nftAddressContract = new Contract(nftAddress, nftInterface);
  const [input, setInput] = useState(false);

  const {
    state: bidNftStatus,
    send: bidNftfunction,
    events: bidNftEvents,
  } = useContractFunction(nftAddressContract, "putBid");

  useEffect(() => {
    if (bidNftStatus.status === "Mining") {
      setOpenModal("loading");
    }

    if (bidNftStatus.status === "Success") {
      const { Seller, TokenId, AuctionID } = input.bidInfo;
      setBidNft({
        status: bidNftEvents[0].args,
        owner: Seller,
        tokenID: TokenId,
        auctionID: AuctionID,
      });
    }
  }, [bidNftStatus]);

  const bidNFT = async ({ ...data }) => {
    const { bid } = data;
    const { AuctionID } = data.bidInfo.Nft;
    setInput(data);
    bidNftfunction(AuctionID, {
      value: parseUnits(bid, 18).toString(),
    });
  };
  return { bidNFT };
};
export default useBidNft;
