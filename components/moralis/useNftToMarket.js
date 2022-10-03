import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import nftAddress from "../../chain-info/deployments/80001/0x4ca9D0c783431827663A6Cfda1565f1C831090F1.json";
import { NftContext } from "../../nftContext/context";
import { nftContractAddress } from "../contracts/adress";

const useNftToMarket = () => {
  const { userAddress, setnftToMarket } = useContext(NftContext);
  const { Moralis } = useMoralis();
  const { abi } = nftAddress;

  const NftToMarket = async (createSellData) => {
    console.log({ createSellData });

    const nftToMarketOptions = {
      abi,
      contractAddress: nftContractAddress,
      functionName: "nftToMarket",
      msgSender: userAddress,
      params: {
        _tokenId: createSellData.openModalSellData.option.TokenId,
        _price: Moralis.Units.ETH(createSellData.form.price),
      },
    };
    const nftToMarketFunc = await Moralis.executeFunction(nftToMarketOptions);
    const nftToMarketConfirmation = await nftToMarketFunc
      .wait()
      .then((status) => {
        console.log({ status });
        setnftToMarket(status.events[0].args);
      })
      .catch((e) => {
        console.log({ e });
      });
    console.log({ nftToMarketConfirmation });
  };
  return { NftToMarket };
};

export default useNftToMarket;
