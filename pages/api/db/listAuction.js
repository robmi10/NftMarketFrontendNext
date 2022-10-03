import { client } from "../../../sanityclient/sanity";
const ListNftToMarketAuction = async (req, res) => {
  console.log("check body tomarket auction->", req.body);
  try {
    const userDoc = {
      _type: "listedAuctionNftTable",
      _id: req.body.tokenId + req.body.owner + "listedAuctionNftTable",
      Owner: req.body.owner,
      Seller: req.body.seller,
      Bidder: req.body.bidder,
      TokenURI: req.body.tokenURI,
      TokenId: req.body.tokenId,
      Duration: req.body.duration,
      Price: req.body.price,
      Royalty: req.body.royalty,
      Sale: req.body.sale,
      AuctionID: req.body.auctionID,
    };

    await client.createIfNotExists(userDoc);
    console.log("Success!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default ListNftToMarketAuction;
