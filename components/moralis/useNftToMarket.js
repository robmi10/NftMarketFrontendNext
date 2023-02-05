import { auctionContractAddress } from "../contracts/adress";
import { NftContext } from "../../nftContext/context";
import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useEthers } from "@usedapp/core";
import auctionInfo from "../../chain-info/contracts/Auction.json";
import { parseUnits } from "ethers/lib/utils";

const useNftToMarket = () => {
  const { setnftToMarket, setOpenModal } = useContext(NftContext);
  const auctionAddress = auctionContractAddress;
  const auctionInterface = new ethers.utils.Interface(auctionInfo.abi);
  const auctionAddressContract = new Contract(auctionAddress, auctionInterface);
  const [input, setInput] = useState(second);

  const {
    state: nftToMarketStatus,
    send: nftToMarketfunction,
    events: nftToMarketEvents,
  } = useContractFunction(auctionAddressContract, "nftToMarket");

  useEffect(() => {
    if (nftToMarketAuctionStatus.status === "Mining") {
      setOpenModal("loading");
    }
    if (nftToMarketAuctionStatus.status === "Success") {
      setnftToMarket({
        status: nftToMarketEvents,
        Owner: createSellData.openModalSellData.option.Owner,
      });
    }
  }, [nftToMarketStatus]);

  const NftToMarket = async (createSellData) => {
    console.log({ createSellData });
    setInput(createSellData);
    nftToMarketfunction(
      createSellData.openModalSellData.option.TokenId,
      parseUnits(createSellData.form.price.toString(), 18).toString()
    );
  };
  return { NftToMarket };
};
export default useNftToMarket;

// const useNftToMarket = () => {
//   const { userAddress, setnftToMarket, setOpenModal } = useContext(NftContext);
//   const { Moralis } = useMoralis();
//   const { abi } = nftAddress;

//   const NftToMarket = async (createSellData) => {
//     console.log({ createSellData });

//     const nftToMarketOptions = {
//       abi,
//       contractAddress: nftContractAddress,
//       functionName: "nftToMarket",
//       msgSender: userAddress,
//       params: {
//         _tokenId: createSellData.openModalSellData.option.TokenId,
//         _price: Moralis.Units.ETH(createSellData.form.price),
//       },
//     };
//     const nftToMarketFunc = await Moralis.executeFunction(nftToMarketOptions);
//     setOpenModal("loading");
//     const nftToMarketConfirmation = await nftToMarketFunc
//       .wait()
//       .then((status) => {
//         console.log({ status });
//         setnftToMarket({
//           status: status.events[0].args,
//           Owner: createSellData.openModalSellData.option.Owner,
//         });
//       })
//       .catch((e) => {
//         console.log({ e });
//       });
//     console.log({ nftToMarketConfirmation });
//   };
//   return { NftToMarket };
// };

// export default useNftToMarket;
