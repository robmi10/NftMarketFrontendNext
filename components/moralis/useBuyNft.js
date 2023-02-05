import { NftContext } from "../../nftContext/context";
import { nftContractAddress } from "../contracts/adress";
import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import nftInfo from "../../chain-info/contracts/NftMarketPlace.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useEthers } from "@usedapp/core";

const useBuyNft = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const { setBuyNft } = useContext(NftContext);
  const nftAddress = nftContractAddress;
  const nftInterface = new ethers.utils.Interface(nftInfo.abi);
  const nftAddressContract = new Contract(nftAddress, nftInterface);

  const {
    state: buyNftStatus,
    send: buyNftfunction,
    events: buyNftEvents,
  } = useContractFunction(nftAddressContract, "buyNft");

  useEffect(() => {
    if (buyNftStatus.status === "Success") {
      setBuyNft(buyNftEvents);
    }
  }, [buyNftStatus]);

  const buyNft = async (option) => {
    console.log({ option });

    buyNftfunction(option.TokenId, account, option.Seller, {
      value: option?.Price?.toString(),
    });
  };
  return { buyNft };
};
export default useBuyNft;

// const useBuyNft = () => {
//   const { setTransactionStatus, userAddress, setBuyNft } =
//     useContext(NftContext);
//   const { Moralis } = useMoralis();
//   const { abi } = nftAddress;

//   const buyNft = async (option) => {
//     console.log("check buyNft ->", option);
//     console.log("option.Price.toString --->", option.Price);

//     console.log({ userAddress });

//     const buyNftOptions = {
//       abi,
//       contractAddress: nftContractAddress,
//       functionName: "buyNft",
//       msgValue: option?.Price?.toString(),
//       // msgSender: userAddress,
//       params: {
//         _tokenId: option.TokenId,
//         _seller: userAddress[0],
//         _currentOwner: option.Seller,
//       },
//     };

//     console.log({ buyNftOptions });
//     const buyNftFunc = await Moralis.executeFunction(buyNftOptions);
//     setTransactionStatus({ loading: "loading", id: option.TokenId });
//     const buyNftConfirmation = await buyNftFunc
//       .wait()
//       .then((status) => {
//         console.log({ status });
//         setBuyNft({
//           status: status.events[3].args,
//           Owner: option.Owner,
//         });
//       })
//       .catch((e) => {
//         console.log({ e });
//       });
//     console.log({ buyNftConfirmation });
//   };
//   return { buyNft };
// };

// export default useBuyNft;
