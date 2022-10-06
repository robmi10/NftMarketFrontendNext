import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import nftAddress from "../../chain-info/deployments/80001/0x6B738D284820aB31A664ee3f498E29D1809b30f0.json";

import { NftContext } from "../../nftContext/context";
import { nftContractAddress } from "../contracts/adress";

const useCreateSell = () => {
  const { data, userAddress, setNftCreateData, setOpenModal } =
    useContext(NftContext);
  const { Moralis } = useMoralis();
  const { abi } = nftAddress;

  const createSell = async (hashResult) => {
    console.log("inside create sell hashResult", hashResult.path);
    console.log("inside create sell royalty", data.royalty);
    console.log("nftContractAddress -->", nftContractAddress);
    console.log("userAddress -->", userAddress[0]);

    const createSellOptions = {
      abi,
      contractAddress: nftContractAddress,
      functionName: "createNft",
      msgValue: Moralis.Units.ETH("0.00060"),
      msgSender: userAddress,
      params: { _tokenURI: hashResult.path, _royalites: data.royalty },
    };

    const createSellFunc = await Moralis.executeFunction(createSellOptions);
    const createSellConfirmation = await createSellFunc
      .wait()
      .then((status) => {
        setNftCreateData(status.events[2].args);
        setOpenModal(false);
      })
      .catch((e) => {
        console.log({ e });
      });
    console.log({ createSellConfirmation });
  };
  return { createSell };
};

export default useCreateSell;
