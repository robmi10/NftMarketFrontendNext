import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import auctionAddress from "../../chain-info/deployments/80001/0x278078b27150871d21406A05668c53a74E8c8E2c.json";
import { NftContext } from "../../nftContext/context";
import { auctionContractAddress } from "../contracts/adress";

const useNftToMarketAuction = () => {
  const { userAddress, setnftToMarketAuction } = useContext(NftContext);
  const { Moralis } = useMoralis();
  const { abi } = auctionAddress;

  const NftToMarketAuction = async (createSellData) => {
    console.log({ createSellData });

    const royaltyString =
      createSellData?.openModalSellData?.option?.Royalty.toString(16);
    const _royalty = Number(royaltyString);

    const _price = createSellData?.form?.price;

    var date = new Date(createSellData.form.date);
    var milliseconds = date.getTime();
    try {
      const nftToMarketOptions = {
        abi,
        contractAddress: auctionContractAddress,
        functionName: "startAuction",
        msgValue: Moralis.Units.ETH(_price),
        msgSender: userAddress,
        params: {
          _nftTokenId: createSellData?.openModalSellData?.option?.TokenId,
          _duration: 1664916122000,
          _tokenURI: createSellData?.openModalSellData?.option?.TokenURI,
          _royalty: _royalty,
        },
      };

      console.log({ nftToMarketOptions });
      const nftToMarketAuctionFunc = await Moralis.executeFunction(
        nftToMarketOptions
      );
      const nftToMarketAuctionConfirmation = await nftToMarketAuctionFunc
        .wait()
        .then((status) => {
          console.log({ status });
          setnftToMarketAuction(status.events[1].args);
        })
        .catch((e) => {
          console.log({ e });
        });
      console.log({ nftToMarketAuctionConfirmation });
    } catch (error) {
      console.log({ error });
    }
  };
  return { NftToMarketAuction };
};

export default useNftToMarketAuction;
