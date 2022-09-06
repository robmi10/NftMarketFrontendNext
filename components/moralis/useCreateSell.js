import React from "react";
import { useMoralis } from "react-moralis";
import { nftAddress } from "../contracts/adress";
import nftToken from "../../chain-info/deployments/80001/0xedB29451b8963fad12f7aF9769C1f901c4A8614E.json";

const useCreateSell = () => {
  const { Moralis } = useMoralis();
  const { abi } = nftToken;
  return <div>useCreateSell</div>;
};

export default useCreateSell;
