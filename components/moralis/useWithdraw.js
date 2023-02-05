import { auctionContractAddress } from "../contracts/adress";
import { NftContext } from "../../nftContext/context";
import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useEthers } from "@usedapp/core";
import auctionInfo from "../../chain-info/contracts/Auction.json";

const useWithdraw = () => {
  const { setWidthdrawNft } = useContext(NftContext);
  const auctionAddress = auctionContractAddress;
  const auctionInterface = new ethers.utils.Interface(auctionInfo.abi);
  const auctionAddressContract = new Contract(auctionAddress, auctionInterface);

  const {
    state: widthdrawStatus,
    send: widthdrawfunction,
    events: widthdrawEvents,
  } = useContractFunction(auctionAddressContract, "widthdraw");

  useEffect(() => {
    if (widthdrawStatus.status === "Success") {
      setWidthdrawNft({
        status: widthdrawEvents,
        Bidder: option.Bidder,
        TokenId: option.TokenId,
        AuctionID: option.AuctionID,
      });
      setOpenModal("loading");
    }
  }, [widthdrawStatus]);

  const withdrawNFT = async (option) => {
    console.log({ option });

    widthdrawfunction(option.AuctionID);
  };
  return { withdrawNFT };
};
export default useWithdraw;

// const useWithdraw = () => {
//   const {
//     data,
//     tokenURI,
//     userAddress,
//     setBidNft,
//     setTransactionStatus,
//     setWidthdrawNft,
//   } = useContext(NftContext);
//   const { Moralis } = useMoralis();
//   const { abi } = auctionAddress;

//   const withdrawNFT = async (option) => {
//     console.log("check put bid option ->", option);
//     console.log({ userAddress });
//     const withdraNFTOptions = {
//       abi,
//       contractAddress: auctionContractAddress,
//       msgSender: userAddress,
//       functionName: "widthdraw",
//       params: {
//         _id: option.AuctionID,
//       },
//     };

//     const withdraNFTFunc = await Moralis.executeFunction(withdraNFTOptions);
//     setTransactionStatus({ loading: "loading", id: option.TokenId });
//     const withdraNFTConfirmation = await withdraNFTFunc
//       .wait()
//       .then((status) => {
//         console.log({ status });
//         setWidthdrawNft({
//           status: status.events[1].args,
//           Bidder: option.Bidder,
//           TokenId: option.TokenId,
//           AuctionID: option.AuctionID,
//         });
//       })
//       .catch((e) => {
//         console.log({ e });
//       });
//     console.log({ withdraNFTConfirmation });
//   };
//   return { withdrawNFT };
// };

// export default useWithdraw;
