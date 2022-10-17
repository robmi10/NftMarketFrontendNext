import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import nftAddress from "../../chain-info/deployments/80001/0x43F2BBBC32545f60cf4107070F5a93bFe9c6c676.json";
import { NftContext } from "../../nftContext/context";
import { nftContractAddress } from "../contracts/adress";

const useNftToMarket = () => {
  const { userAddress, setnftToMarket, setOpenModal } = useContext(NftContext);
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
    setOpenModal("loading");
    const nftToMarketConfirmation = await nftToMarketFunc
      .wait()
      .then((status) => {
        console.log({ status });
        setnftToMarket({
          status: status.events[0].args,
          Owner: createSellData.openModalSellData.option.Owner,
        });
      })
      .catch((e) => {
        console.log({ e });
      });
    console.log({ nftToMarketConfirmation });
  };
  return { NftToMarket };
};

export default useNftToMarket;
