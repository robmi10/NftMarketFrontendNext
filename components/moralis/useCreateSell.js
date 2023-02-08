import { NftContext } from "../../nftContext/context";
import { nftContractAddress } from "../contracts/adress";
import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import nftInfo from "../../chain-info/contracts/NftMarketPlace.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { parseUnits } from "ethers/lib/utils";

const useCreateSell = () => {
  const { data, setNftCreateData } = useContext(NftContext);
  const nftAddress = nftContractAddress;
  const nftInterface = new ethers.utils.Interface(nftInfo.abi);
  const nftAddressContract = new Contract(nftAddress, nftInterface);

  const {
    state: createNftStatus,
    send: createNft,
    events: createNftEvents,
  } = useContractFunction(nftAddressContract, "createNft");

  useEffect(() => {
    if (createNftStatus.status === "Success") {
      setNftCreateData(createNftEvents[1].args);
    }
  }, [createNftStatus]);

  const createSell = async (hashResult) => {
    createNft(hashResult.path, data.royalty, {
      value: parseUnits("0.00060", 18).toString(),
    });
  };
  return { createSell };
};
export default useCreateSell;
