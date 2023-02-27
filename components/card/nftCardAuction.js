import React, { useContext, useEffect } from "react";
import { NftContext } from "../../nftContext/context";
import BouncerLoader from "../animation/loader/bouncerLoader";
import useEnd from "../moralis/useEndNft";
import Timer from "../time/timer";
import { formatEther } from "ethers/lib/utils";
const NftCardAuction = ({ Nft, handleOpenSellModal }) => {
  const { setBidType, transactionStatus, setOpenModal } =
    useContext(NftContext);
  const time = new Date().getTime() - Nft.Duration;
  const isTimeOver = time < 0;
  const { endNFT } = useEnd();
  const NftCardData = { Nft, ipfsInfo: Nft.ipfsInfo };
  const currentPrice = Nft?.Price ? formatEther(Nft?.Price.toString()) : 0;

  useEffect(() => {}, [transactionStatus]);

  return (
    <div className=" border-1 h-5/8 flex w-3/4 animate-fade flex-col items-center gap-2 rounded-md border-black shadow-lg shadow-[#185ee041] hover:shadow-2xl hover:shadow-[#185ee041]  lg:w-1/4">
      <div className="h-62 w-full">
        <img
          className="h-64 w-full justify-center object-cover"
          src={Nft.ipfsInfo?.image}
        />
      </div>
      <div className=" mt-5 flex w-3/6 justify-center  shadow-lg shadow-[#185ee041]">
        <h1>{Nft.Seller?.toString()?.substr(0, 10)}</h1>
      </div>

      <div className="flex w-full flex-col gap-5 pl-5">
        <h1>{Nft.ipfsInfo?.title}</h1>

        <h1>{Nft.ipfsInfo?.description}</h1>
        <div className=" flex w-3/6 justify-center shadow-lg shadow-[#185ee041]">
          <h1 style={{ fontWeight: "light" }}>CURRENT BID</h1>
        </div>
        <h1>{Nft.Bidder?.toString()?.substr(0, 10)}</h1>

        <h1>{currentPrice} MATIC</h1>
      </div>

      {isTimeOver && (
        <>
          <div className="flex w-full items-center justify-center ">
            <Timer countDownTimeMs={Nft.Duration} AuctionInfo={Nft} />
          </div>

          <button
            className=" mb-5 flex h-14 w-3/6 flex-row items-center justify-center rounded-md shadow-lg shadow-[#185ee041] hover:shadow-xl hover:shadow-[#185ee041]"
            onClick={() => {
              setBidType(Nft);
              handleOpenSellModal({
                status: true,
                data: NftCardData,
                type: "bid",
              });
              setOpenModal(true);
            }}
          >
            <p>PUT BID</p>
          </button>
        </>
      )}
      {!isTimeOver && (
        <div className="flex h-2/4 w-full flex-row items-end justify-center space-x-10">
          <button
            className="mb-5 flex h-14 w-3/6 flex-row items-center justify-center rounded-md shadow-lg shadow-[#185ee041] hover:shadow-xl hover:shadow-[#185ee041]"
            onClick={() => {
              endNFT(Nft);
            }}
          >
            {transactionStatus.loading === "loading" &&
            transactionStatus.id === nft?.AuctionID ? (
              <BouncerLoader />
            ) : (
              <p>END AUCTION</p>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default NftCardAuction;
