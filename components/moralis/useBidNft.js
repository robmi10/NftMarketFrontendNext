import { NftContext } from "../../nftContext/context";
import { nftContractAddress } from "../contracts/adress";
import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import nftInfo from "../../chain-info/contracts/NftMarketPlace.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useEthers } from "@usedapp/core";

const useBidNft = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const { setBidNft, setOpenModal } = useContext(NftContext);
  const nftAddress = nftContractAddress;
  const nftInterface = new ethers.utils.Interface(nftInfo.abi);
  const nftAddressContract = new Contract(nftAddress, nftInterface);

  const {
    state: bidNftStatus,
    send: bidNftfunction,
    events: bidNftEvents,
  } = useContractFunction(nftAddressContract, "putBid");

  useEffect(() => {
    if (bidNftStatus.status === "Mining") {
      setOpenModal("loading");
    }

    if (bidNftStatus.status === "Success") {
      setBidNft({
        status: bidNftEvents,
        owner: option.openModalSellData.option.option.Seller,
        tokenID: option.openModalSellData.option.option.TokenId,
        auctionID: option.openModalSellData.option.option.AuctionID,
      });
    }
  }, [bidNftStatus]);

  const bidNFT = async (option) => {
    console.log({ option });

    bidNftfunction(option.openModalSellData.option.option.AuctionID, {
      value: option?.form?.bid,
    });
  };
  return { bidNFT };
};
export default useBidNft;

// const useBidNft = () => {
//   const {
//     data,
//     tokenURI,
//     userAddress,
//     setTransactionStatus,
//     setBidNft,
//     setOpenModal,
//   } = useContext(NftContext);
//   const { Moralis } = useMoralis();
//   const { abi } = auctionAddress;

//   console.log("inside useBidNft !");
//   const bidNFT = async (option) => {
//     console.log("check put bid option ->", option);
//     console.log({ userAddress });
//     const bidNFTOptions = {
//       abi,
//       contractAddress: auctionContractAddress,
//       msgValue: Moralis.Units.ETH(option?.form?.bid),
//       msgSender: userAddress,
//       functionName: "putBid",
//       params: {
//         _id: option.openModalSellData.option.option.AuctionID,
//       },
//     };

//     console.log({ bidNFTOptions });
//     const bidNFTFunc = await Moralis.executeFunction(bidNFTOptions);
//     setOpenModal("loading");
//     const bidNFTConfirmation = await bidNFTFunc
//       .wait()
//       .then((status) => {
//         console.log({ status });
//         setBidNft({
//           status: status.events[1].args,
//           owner: option.openModalSellData.option.option.Seller,
//           tokenID: option.openModalSellData.option.option.TokenId,
//           auctionID: option.openModalSellData.option.option.AuctionID,
//         });
//       })
//       .catch((e) => {
//         console.log({ e });
//       });
//     console.log({ bidNFTConfirmation });
//   };
//   return { bidNFT };
// };

// export default useBidNft;
