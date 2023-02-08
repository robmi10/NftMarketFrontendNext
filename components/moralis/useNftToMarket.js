import { nftContractAddress } from "../contracts/adress";
import { NftContext } from "../../nftContext/context";
import { useContext, useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import nftInfo from "../../chain-info/contracts/NftMarketPlace.json";
import { parseUnits } from "ethers/lib/utils";

const useNftToMarket = () => {
  const { setnftToMarket, setOpenModal } = useContext(NftContext);
  const nftAddress = nftContractAddress;
  const nftInterface = new ethers.utils.Interface(nftInfo.abi);
  const nftAddressContract = new Contract(nftAddress, nftInterface);
  const [input, setInput] = useState(false);

  const {
    state: nftToMarketStatus,
    send: nftToMarketfunction,
    events: nftToMarketEvents,
  } = useContractFunction(nftAddressContract, "nftToMarket");

  useEffect(() => {
    if (nftToMarketStatus.status === "Mining") {
      setOpenModal("loading");
    }
    if (nftToMarketStatus.status === "Success") {
      setnftToMarket({
        status: nftToMarketEvents[0].args,
        Owner: input.Owner,
      });
    }
  }, [nftToMarketStatus, input]);

  const NftToMarket = async ({ ...data }) => {
    const { price } = data;
    const { TokenId } = data.listToMarket.nft;
    setInput({ ...data.listToMarket.nft });
    nftToMarketfunction(TokenId, parseUnits(price, 18).toString());
  };
  return { NftToMarket };
};
export default useNftToMarket;
