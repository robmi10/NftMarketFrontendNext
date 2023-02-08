import { auctionContractAddress } from "../contracts/adress";
import { NftContext } from "../../nftContext/context";
import { useContext, useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import auctionInfo from "../../chain-info/contracts/Auction.json";
import { parseUnits } from "ethers/lib/utils";

const useNftToMarketAuction = () => {
  const { setnftToMarketAuction, setOpenModal } = useContext(NftContext);
  const auctionAddress = auctionContractAddress;
  const auctionInterface = new ethers.utils.Interface(auctionInfo.abi);
  const auctionAddressContract = new Contract(auctionAddress, auctionInterface);
  const [input, setInput] = useState(false);

  const {
    state: nftToMarketAuctionStatus,
    send: nftToMarketAuctionfunction,
    events: nftToMarketAuctionEvents,
  } = useContractFunction(auctionAddressContract, "startAuction");

  useEffect(() => {
    if (nftToMarketAuctionStatus.status === "Mining") {
      setOpenModal("loading");
    }
    if (nftToMarketAuctionStatus.status === "Success") {
      setnftToMarketAuction({
        status: nftToMarketAuctionEvents[0].args,
        owner: input?.openModalSellData?.option?.Owner,
      });
    }
  }, [nftToMarketAuctionStatus]);

  const NftToMarketAuction = async ({ ...data }) => {
    const { price, date } = data;
    const { TokenId, Royalty, TokenURI } = data.listToMarketAuction.nft;
    setInput({ ...data.listToMarketAuction.nft });

    const royaltyString = Royalty.toString(16);
    const _royalty = Number(royaltyString);
    var milliseconds = new Date(date).getTime();
    nftToMarketAuctionfunction(TokenId, milliseconds, TokenURI, _royalty, {
      value: parseUnits(price.toString(), 18).toString(),
    });
  };
  return { NftToMarketAuction };
};
export default useNftToMarketAuction;
