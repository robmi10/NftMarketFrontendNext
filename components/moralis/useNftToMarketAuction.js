import { auctionContractAddress } from "../contracts/adress";
import { NftContext } from "../../nftContext/context";
import { useContext, useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useEthers } from "@usedapp/core";
import auctionInfo from "../../chain-info/contracts/Auction.json";
import { parseUnits } from "ethers/lib/utils";

const useNftToMarketAuction = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const { setnftToMarketAuction, setOpenModal } = useContext(NftContext);
  const auctionAddress = auctionContractAddress;
  const auctionInterface = new ethers.utils.Interface(auctionInfo.abi);
  const auctionAddressContract = new Contract(auctionAddress, auctionInterface);
  const [input, setInput] = useState(false);

  const {
    state: nftToMarketAuctionStatus,
    send: nftToMarketAuctionfunction,
    events: nftToMarketAuctionEvents,
  } = useContractFunction(auctionAddressContract, "startAuction");

  useEffect(() => {
    if (nftToMarketAuctionStatus.status === "Mining") {
      setOpenModal("loading");
    }
    if (nftToMarketAuctionStatus.status === "Success") {
      setnftToMarketAuction({
        status: nftToMarketAuctionEvents[0].args,
        owner: input?.openModalSellData?.option?.Owner,
      });
    }
  }, [nftToMarketAuctionStatus]);

  const NftToMarketAuction = async (createSellData) => {
    console.log({ createSellData });
    setInput(createSellData);

    const royaltyString =
      createSellData?.openModalSellData?.option?.Royalty.toString(16);
    const _royalty = Number(royaltyString);

    const _price = createSellData?.form?.price;

    var date = new Date(createSellData.form.date);
    var milliseconds = date.getTime();
    nftToMarketAuctionfunction(
      createSellData?.openModalSellData?.option?.TokenId,
      milliseconds,
      createSellData?.openModalSellData?.option?.TokenURI,
      _royalty,
      { value: parseUnits(_price.toString(), 18).toString() }
    );
  };
  return { NftToMarketAuction };
};
export default useNftToMarketAuction;

// const useNftToMarketAuction = () => {
//   const { userAddress, setnftToMarketAuction, setOpenModal } =
//     useContext(NftContext);
//   const { Moralis } = useMoralis();
//   const { abi } = auctionAddress;

//   const NftToMarketAuction = async (createSellData) => {
//     console.log({ createSellData });

//     const royaltyString =
//       createSellData?.openModalSellData?.option?.Royalty.toString(16);
//     const _royalty = Number(royaltyString);

//     const _price = createSellData?.form?.price;

//     var date = new Date(createSellData.form.date);
//     var milliseconds = date.getTime();
//     try {
//       const nftToMarketOptions = {
//         abi,
//         contractAddress: auctionContractAddress,
//         functionName: "startAuction",
//         msgValue: Moralis.Units.ETH(_price),
//         msgSender: userAddress,
//         params: {
//           _nftTokenId: createSellData?.openModalSellData?.option?.TokenId,
//           _duration: milliseconds,
//           _tokenURI: createSellData?.openModalSellData?.option?.TokenURI,
//           _royalty: _royalty,
//         },
//       };

//       console.log({ nftToMarketOptions });
//       const nftToMarketAuctionFunc = await Moralis.executeFunction(
//         nftToMarketOptions
//       );
//       setOpenModal("loading");
//       const nftToMarketAuctionConfirmation = await nftToMarketAuctionFunc
//         .wait()
//         .then((status) => {
//           console.log({ status });
//           setnftToMarketAuction({
//             status: status.events[1].args,
//             owner: createSellData?.openModalSellData?.option?.Owner,
//           });
//         })
//         .catch((e) => {
//           console.log({ e });
//         });
//       console.log({ nftToMarketAuctionConfirmation });
//     } catch (error) {
//       console.log({ error });
//     }
//   };
//   return { NftToMarketAuction };
// };

// export default useNftToMarketAuction;
