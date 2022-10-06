import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import auctionAddress from "../../chain-info/deployments/80001/0x6B738D284820aB31A664ee3f498E29D1809b30f0.json";
import { NftContext } from "../../nftContext/context";
import { auctionContractAddress } from "../contracts/adress";

const useWithdraw = () => {
  const { data, tokenURI, userAddress, setBidNft, setWidthdrawNft } =
    useContext(NftContext);
  const { Moralis } = useMoralis();
  const { abi } = auctionAddress;

  const withdrawNFT = async (option) => {
    console.log("check put bid option ->", option);
    console.log({ userAddress });
    const withdraNFTOptions = {
      abi,
      contractAddress: auctionContractAddress,
      msgSender: userAddress,
      functionName: "widthdraw",
      params: {
        _id: option.TokenId,
      },
    };

    const withdraNFTFunc = await Moralis.executeFunction(withdraNFTOptions);
    const withdraNFTConfirmation = await withdraNFTFunc
      .wait()
      .then((status) => {
        console.log({ status });
        setWidthdrawNft({
          status: status.events[1].args,
          Bidder: option.Bidder,
          TokenId: option.TokenId,
        });
      })
      .catch((e) => {
        console.log({ e });
      });
    console.log({ withdraNFTConfirmation });
  };
  return { withdrawNFT };
};

export default useWithdraw;
