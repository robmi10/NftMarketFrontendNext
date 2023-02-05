import { auctionContractAddress } from "../contracts/adress";
import { NftContext } from "../../nftContext/context";
import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useEthers } from "@usedapp/core";
import auctionInfo from "../../chain-info/contracts/Auction.json";

const useEnd = () => {
  const { setEndNft } = useContext(NftContext);
  const auctionAddress = auctionContractAddress;
  const auctionInterface = new ethers.utils.Interface(auctionInfo.abi);
  const auctionAddressContract = new Contract(auctionAddress, auctionInterface);

  const {
    state: endBidStatus,
    send: endBidfunction,
    events: endBidEvents,
  } = useContractFunction(auctionAddressContract, "end");

  useEffect(() => {
    if (endBidStatus.status === "Success") {
      setEndNft({
        status: endBidEvents,
        Seller: option.option.Seller,
        Bid: option.option.Bidder,
        TokenId: option.option.TokenId,
        AuctionID: option.option.AuctionID,
        Price: option.option.Price,
      });
      setOpenModal("loading");
    }
  }, [endBidStatus]);

  const endNFT = async (option) => {
    console.log({ option });

    endBidfunction(option.option.AuctionID);
  };
  return { endNFT };
};
export default useEnd;

// const useEnd = () => {
//   const { userAddress, setTransactionStatus, setEndNft } =
//     useContext(NftContext);
//   const { Moralis } = useMoralis();
//   const { abi } = auctionAddress;

//   const endNFT = async (option) => {
//     console.log("check end option ->", option);
//     console.log({ userAddress });
//     const endNFTOptions = {
//       abi,
//       contractAddress: auctionContractAddress,
//       msgSender: userAddress,
//       functionName: "end",
//       params: {
//         _id: option.option.AuctionID,
//       },
//     };

//     console.log({ endNFTOptions });
//     const endNFTFunc = await Moralis.executeFunction(endNFTOptions);
//     setTransactionStatus({ loading: "loading", id: option.option.AuctionID });
//     const endNFTConfirmation = await endNFTFunc
//       .wait()
//       .then((status) => {
//         console.log({ status });
//         setEndNft({
//           status: status.events[1].args,
//           Seller: option.option.Seller,
//           Bid: option.option.Bidder,
//           TokenId: option.option.TokenId,
//           AuctionID: option.option.AuctionID,
//           Price: option.option.Price,
//         });
//       })
//       .catch((e) => {
//         console.log({ e });
//       });
//     console.log({ endNFTConfirmation });
//   };
//   return { endNFT };
// };

// export default useEnd;
