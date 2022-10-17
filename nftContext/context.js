import React from "react";
import { createContext, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { client } from "../sanityclient/sanity";
import { uuid } from "uuidv4";
import GetIpfsTokenURI from "../components/filterList";
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
  const [searchInput, setSearchInput] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(false);
  const [nftListOnSaleEdit, setNftListOnSaleEdit] = useState(false);
  const { getipfsInfo } = GetIpfsTokenURI();
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
        getAllNftList();
        getAllNftsOnAuction();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteBid = async () => {
    try {
      console.log("widthdrawNft check new ->", widthdrawNft);
      await fetch("api/db/deleteBid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bidder: widthdrawNft.Bidder,
          tokenId: widthdrawNft.TokenId,
          auctionID: widthdrawNft.AuctionID,
        }),
      }).then(() => {
        getMyBids();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getAllNftList = async () => {
    const query_createdNfts = '*[_type=="nftCreated"]';
    try {
      await client.fetch(query_createdNfts).then((res) => {
        console.log("inside getAllNftList before filter", res);
        const nftListfilter = async () => {
          return await Promise.all(res.map((option) => getipfsInfo(option)));
        };

        nftListfilter().then((res) => {
          console.log("getAllNftList res ->", res);
          console.log("inside getAllNftList after filter", res);
          setNftList(res);
          setTransactionStatus(false);
          setOpenModal(false);
        });
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getAllNftsOnSale = async () => {
    const query_onsale = '*[_type=="listedNftTable"]';
    try {
      await client.fetch(query_onsale).then((res) => {
        const nftListfilter = async () => {
          return await Promise.all(res.map((option) => getipfsInfo(option)));
        };

        nftListfilter().then((res) => {
          console.log("getAllNftListOnSale res ->", res);
          console.log("inside getAllNftListOnSale after filter", res);
          setNftListOnSale(res);
          setTransactionStatus(false);
          setOpenModal(false);
        });
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getAllNftsOnAuction = async () => {
    const query_Auction = '*[_type=="listedAuctionNftTable"]';
    try {
      await client.fetch(query_Auction).then((res) => {
        const nftListfilter = async () => {
          return await Promise.all(res.map((option) => getipfsInfo(option)));
        };

        nftListfilter().then((res) => {
          console.log("getAllNftListOnSale res ->", res);
          console.log("inside getAllNftListOnSale after filter", res);
          setNftListOnAuction(res);
          setTransactionStatus(false);
          setOpenModal(false);
        });
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
    const randomID = uuid();
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
          randomID: randomID,
        }),
      }).then(() => {
        getAllNftsOnAuction();
        getMyBids();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const updateAndDeleteNftSeller = async () => {
    console.log("updateAndDeleteNftSeller data now->", buyNft);
    const tokenIdString = buyNft.status.id._hex.toString(16);
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
          owner: buyNft.Owner,
          seller: buyNft.status.to,
          to: buyNft.status.from,
        }),
      }).then(() => {
        getAllNftsOnSale();
        getAllNftList();
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
    const tokenIdString = nftToMarket?.status.tokenId?._hex?.toString(16);
    const _tokenId = Number(tokenIdString);
    const royaltyString = nftToMarket?.status.royalties?._hex?.toString(16);
    const _royalty = Number(royaltyString);
    const priceString = nftToMarket?.status.price?._hex?.toString(16);
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
          owner: nftToMarket.Owner,
          seller: nftToMarket.status.seller,
          tokenId: _tokenId,
          tokenURI: nftToMarket.status.tokenURI,
          description: data.description,
          price: _price,
          royalty: _royalty,
          sale: nftToMarket.status.sale,
        }),
      }).then(() => {
        console.log("inside get all nfts after to market");
        getAllNftList();
        getAllNftsOnSale();
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const listNftToMarketAuction = async () => {
    console.log({ nftToMarketAuction });

    const priceString = nftToMarketAuction.status._amount._hex.toString(16);
    const _price = Number(priceString);

    const tokenIdString = nftToMarketAuction.status._id._hex.toString(16);
    const _tokenId = Number(tokenIdString);

    const auctionIdString =
      nftToMarketAuction.status._auctionID._hex.toString(16);
    const _auctionId = Number(auctionIdString);

    const royaltyString = nftToMarketAuction.status._royalty._hex.toString(16);
    const _royalty = Number(royaltyString);

    const _duration = Number(
      nftToMarketAuction.status._duration._hex.toString(16)
    );

    try {
      await fetch("api/db/listAuction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: nftToMarketAuction.owner,
          seller: nftToMarketAuction.status._bidder,
          bidder: nftToMarketAuction.status._bidder,
          tokenId: _tokenId,
          tokenURI: nftToMarketAuction.status._tokenURI,
          description: data.description,
          duration: _duration,
          price: _price,
          royalty: _royalty,
          sale: true,
          auctionID: _auctionId,
        }),
      }).then(() => {
        getAllNftsOnAuction();
        getAllNftList();
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
        searchInput,
        setSearchInput,
        transactionStatus,
        setTransactionStatus,
        nftListOnSaleEdit,
        setNftListOnSaleEdit,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};
export default NftProvider;
