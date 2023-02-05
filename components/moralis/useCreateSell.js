import { NftContext } from "../../nftContext/context";
import { nftContractAddress } from "../contracts/adress";
import { useContext, useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import nftInfo from "../../chain-info/contracts/NftMarketPlace.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";

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
      setNftCreateData(createNftEvents);
    }
  }, [createNftStatus]);

  const createSell = async (hashResult) => {
    console.log({ data });
    console.log({ hashResult });
    createNft(hashResult.path, data.royalty);
  };
  return { createSell };
};
export default useCreateSell;

// const useCreateSell = () => {
//   const { data, userAddress, setNftCreateData, setOpenModal } =
//     useContext(NftContext);
//   const { Moralis } = useMoralis();
//   const { abi } = nftAddress;

//   const createSell = async (hashResult) => {
//     console.log("inside create sell hashResult", hashResult.path);
//     console.log("inside create sell royalty", data.royalty);
//     console.log("nftContractAddress -->", nftContractAddress);
//     console.log("userAddress -->", userAddress[0]);

//     const createSellOptions = {
//       abi,
//       contractAddress: nftContractAddress,
//       functionName: "createNft",
//       msgValue: Moralis.Units.ETH("0.00060"),
//       msgSender: userAddress,
//       params: { _tokenURI: hashResult.path, _royalites: data.royalty },
//     };

//     const createSellFunc = await Moralis.executeFunction(createSellOptions);
//     setOpenModal("loading");
//     const createSellConfirmation = await createSellFunc
//       .wait()
//       .then((status) => {
//         setNftCreateData(status.events[2].args);
//       })
//       .catch((e) => {
//         console.log({ e });
//       });
//     console.log({ createSellConfirmation });
//   };
//   return { createSell };
// };

// export default useCreateSell;
