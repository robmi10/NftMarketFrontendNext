import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import auctionAddress from "../../chain-info/deployments/80001/0xC571e33deaBBDbe12b5e36B164395b5b85eEa327.json";
import { NftContext } from "../../nftContext/context";
import { auctionContractAddress } from "../contracts/adress";

const useNftToMarketAuction = () => {
  const { userAddress, setnftToMarketAuction, setOpenModal } =
    useContext(NftContext);
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
          _duration: milliseconds,
          _tokenURI: createSellData?.openModalSellData?.option?.TokenURI,
          _royalty: _royalty,
        },
      };

      console.log({ nftToMarketOptions });
      const nftToMarketAuctionFunc = await Moralis.executeFunction(
        nftToMarketOptions
      );
      setOpenModal("loading");
      const nftToMarketAuctionConfirmation = await nftToMarketAuctionFunc
        .wait()
        .then((status) => {
          console.log({ status });
          setnftToMarketAuction({
            status: status.events[1].args,
            owner: createSellData?.openModalSellData?.option?.Owner,
          });
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
