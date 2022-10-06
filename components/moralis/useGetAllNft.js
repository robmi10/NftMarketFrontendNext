import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import nftAddress from "../../chain-info/deployments/80001/0x6B738D284820aB31A664ee3f498E29D1809b30f0.json";
import { NftContext } from "../../nftContext/context";
import { nftContractAddress } from "../contracts/adress";

const useGetAllNft = () => {
  const { data, userAddress } = useContext(NftContext);
  const { Moralis } = useMoralis();
  const { abi } = nftAddress;

  const getAllNftOptions = {
    abi,
    contractAddress: nftContractAddress,
    functionName: "getAllNfts",
  };

  const getAllNft = async () => {
    console.log("abi -->", abi);

    const stakingStatus = await Moralis.executeFunction(getAllNftOptions);

    const getAllNftFuncConfirmation = await stakingStatus
      .wait()
      .then((status) => {
        console.log({ status });
      })
      .catch((error) => {
        console.error(error);
      });

    console.log({ getAllNftFuncConfirmation });
  };
  return { getAllNft };
};

export default useGetAllNft;
