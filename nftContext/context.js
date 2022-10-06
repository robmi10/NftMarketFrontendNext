import React from "react";
import { createContext, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { client } from "../sanityclient/sanity";

export const NftContext = createContext();

const NftProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [marketAuction, setMarketAuction] = useState(false);
  const [nftCreateData, setNftCreateData] = useState(false);
  const [nftToMarket, setnftToMarket] = useState(false);
  const [nftToMarketAuction, setnftToMarketAuction] = useState(false);
  const [data, setData] = useState(false);
  const [tokenURI, settokenURI] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const [nftList, setNftList] = useState(false);
  const [nftListOnSale, setNftListOnSale] = useState(false);
  const [nftListOnAuction, setNftListOnAuction] = useState(false);
  const [ipfsInfo, setIpfsInfo] = useState(false);
  const [openModalSell, setOpenModalSell] = useState(false);
  const [buyNft, setBuyNft] = useState(false);
  const [bidNft, setBidNft] = useState(false);
  const [bidType, setBidType] = useState(false);
  const [myBids, setMyBids] = useState(false);
  const [widthdrawNft, setWidthdrawNft] = useState(false);
  const [auctionStatus, setAuctionStatus] = useState(false);
  const [endNft, setEndNft] = useState(false);

  const {
    isWeb3Enabled,
    user,
    isAuthenticating,
    enableWeb3,
    authenticate,
    deactivateWeb3,
  } = useMoralis();

  useEffect(() => {
    if (
      isWeb3Enabled ||
      (isAuthenticating &&
        user !== null &&
        user.attributes.accounts !== undefined)
    ) {
      console.log({ user });
      setUserAddress(user?.attributes?.accounts);
    } else {
      setUserAddress(false);
    }
  });

  const loginUser = async () => {
    await enableWeb3();
    await authenticate();
  };

  const logoutUser = async () => {
    await deactivateWeb3();
    setUserAddress(false);
  };

  useEffect(() => {
    if (nftCreateData) {
      console.log("inside first nftCreateData context ");
      createNftList(nftCreateData);
    }
  }, [nftCreateData]);

  useEffect(() => {
    if (bidNft) {
      console.log("inside put bid context");
      putBid(nftCreateData);
    }
  }, [bidNft]);

  useEffect(() => {
    if (!myBids) {
      getMyBids();
    }
  });

  useEffect(() => {
    if (nftToMarket) {
      console.log("listNftToMarket func");
      listNftToMarket(nftToMarket);
    }
  }, [nftToMarket]);

  useEffect(() => {
    if (nftToMarketAuction) {
      listNftToMarketAuction(nftToMarketAuction);
    }
  }, [nftToMarketAuction]);

  useEffect(() => {
    if (!nftList) {
      console.log("inside getAllNftList nftCreateData ->", nftCreateData);
      getAllNftList();
    }
  });

  useEffect(() => {
    if (!nftListOnSale) {
      console.log("inside getAllNftsOnSale nftToMarket ->", nftToMarket);
      getAllNftsOnSale();
    }
  });

  useEffect(() => {
    if (!nftListOnAuction) {
      getAllNftsOnAuction();
    }
  });

  useEffect(() => {
    if (widthdrawNft) {
      console.log("useffect deleteBid!");
      deleteBid();
    }
  }, [widthdrawNft]);

  useEffect(() => {
    if (buyNft) {
      console.log("useffect buyNft!");
      updateAndDeleteNftSeller();
    }
  }, [buyNft]);

  useEffect(() => {
    if (endNft) {
      console.log("useffect endNft!");

      deleteAuction();
    }
  }, [endNft]);

  const deleteAuction = async () => {
    try {
      console.log("endNft check ->", endNft);
      await fetch("api/db/deleteAuction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auctionID: endNft.AuctionID,
          tokenId: endNft.TokenId,
          owner: endNft.Seller,
          buyer: endNft.Bid,
        }),
      }).then(() => {
        getAllNftsOnAuction();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteBid = async () => {
    try {
      console.log("widthdrawNft check ->", widthdrawNft);
      await fetch("api/db/deleteBid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bidder: widthdrawNft.Bidder,
          tokenId: widthdrawNft.TokenId,
        }),
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getAllNftList = async () => {
    const query_createdNfts = '*[_type=="nftCreated"]';
    try {
      await client.fetch(query_createdNfts).then((res) => {
        console.log({ res });
        setNftList(res);
        console.log("getAllNftList ->", res);
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getAllNftsOnSale = async () => {
    const query_onsale = '*[_type=="listedNftTable"]';
    try {
      await client.fetch(query_onsale).then((res) => {
        console.log({ nftListOnSale: res });
        setNftListOnSale(res);
        console.log("nftListOnSale get ->", nftListOnSale);
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getAllNftsOnAuction = async () => {
    const query_Auction = '*[_type=="listedAuctionNftTable"]';
    try {
      await client.fetch(query_Auction).then((res) => {
        console.log({ getAllNftsOnAuction: res });
        setNftListOnAuction(res);
        console.log("nftListOnAuction get ->", nftListOnAuction);
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getMyBids = async () => {
    // const query_myBids = `*[_type=="bidsNftTable" && bid == ${userAddress}]`;
    const query_myBids = `*[_type=="bidsNftTable"]`;
    try {
      await client.fetch(query_myBids).then((res) => {
        console.log({ getMyBids: res });
        setMyBids(res);
        console.log({ myBids });
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const putBid = async () => {
    console.log("putBid data now->", bidNft);
    const amountString = bidNft?.status?._amount?._hex.toString(16);
    const amount = Number(amountString);

    const idString = bidNft?.status?._id?._hex.toString(16);
    const id = Number(idString);

    try {
      console.log("data ->", data);
      await fetch("api/db/updateBid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenId: bidNft.tokenID,
          bidder: bidNft.status._bidder,
          seller: bidNft.owner,
          auctionID: bidNft.auctionID,
          price: amount,
        }),
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const updateAndDeleteNftSeller = async () => {
    console.log("updateAndDeleteNftSeller data now->", buyNft);
    const tokenIdString = buyNft.id._hex.toString(16);
    const tokenId = Number(tokenIdString);

    try {
      console.log("data ->", data);
      await fetch("api/db/updateSeller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenId: tokenId,
          seller: buyNft.to,
          to: buyNft.from,
        }),
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const createNftList = async () => {
    console.log("createNftList ->", nftCreateData);
    const tokenIdString = nftCreateData.tokenId._hex.toString(16);
    const _tokenId = Number(tokenIdString);
    const royaltyString = nftCreateData.royalties._hex.toString(16);
    const _royalty = Number(royaltyString);
    try {
      console.log("data ->", data);
      await fetch("api/db/createNft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _types: "nftCreated",
          _id: _tokenId,
          owner: nftCreateData.owner,
          seller: nftCreateData.seller,
          tokenId: _tokenId,
          tokenURI: nftCreateData.tokenURI,
          description: data.description,
          royalty: _royalty,
          sale: nftCreateData.sale,
        }),
      }).then(() => {
        console.log("inside get all nfts after to created");
        getAllNftList();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const listNftToMarket = async () => {
    console.log("listNftToMarket new test ->", nftToMarket);
    const tokenIdString = nftToMarket?.tokenId?._hex?.toString(16);
    const _tokenId = Number(tokenIdString);
    const royaltyString = nftToMarket?.royalties?._hex?.toString(16);
    const _royalty = Number(royaltyString);
    const priceString = nftToMarket?.price?._hex?.toString(16);
    const _price = Number(priceString);
    try {
      console.log("data ->", data);
      await fetch("api/db/listNft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _types: "nftCreated",
          _id: _tokenId,
          owner: nftToMarket.owner,
          seller: nftToMarket.seller,
          tokenId: _tokenId,
          tokenURI: nftToMarket.tokenURI,
          description: data.description,
          price: _price,
          royalty: _royalty,
          sale: nftToMarket.sale,
        }),
      }).then(() => {
        console.log("inside get all nfts after to market");
        getAllNftsOnSale();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const listNftToMarketAuction = async () => {
    console.log({ nftToMarketAuction });

    const priceString = nftToMarketAuction._amount._hex.toString(16);
    const _price = Number(priceString);

    const tokenIdString = nftToMarketAuction._id._hex.toString(16);
    const _tokenId = Number(tokenIdString);

    const auctionIdString = nftToMarketAuction._auctionID._hex.toString(16);
    const _auctionId = Number(auctionIdString);

    const royaltyString = nftToMarketAuction._royalty._hex.toString(16);
    const _royalty = Number(royaltyString);

    const _duration = Number(nftToMarketAuction._duration._hex.toString(16));

    try {
      await fetch("api/db/listAuction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: nftToMarketAuction._bidder,
          seller: nftToMarketAuction._bidder,
          bidder: nftToMarketAuction._bidder,
          tokenId: _tokenId,
          tokenURI: nftToMarketAuction._tokenURI,
          description: data.description,
          duration: _duration,
          price: _price,
          royalty: _royalty,
          sale: true,
          auctionID: _auctionId,
        }),
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <NftContext.Provider
      value={{
        openModal,
        setOpenModal,
        marketAuction,
        setMarketAuction,
        tokenURI,
        settokenURI,
        setUserAddress,
        userAddress,
        loginUser,
        logoutUser,
        nftCreateData,
        setNftCreateData,
        data,
        setData,
        nftList,
        ipfsInfo,
        setIpfsInfo,
        setOpenModalSell,
        openModalSell,
        nftToMarket,
        setnftToMarket,
        nftToMarketAuction,
        setnftToMarketAuction,
        nftListOnSale,
        setNftListOnSale,
        nftListOnAuction,
        setNftListOnAuction,
        buyNft,
        setBuyNft,
        bidNft,
        setBidNft,
        bidType,
        setBidType,
        myBids,
        setMyBids,
        widthdrawNft,
        setWidthdrawNft,
        endNft,
        setEndNft,
        auctionStatus,
        setAuctionStatus,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};
export default NftProvider;
