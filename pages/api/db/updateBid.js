import { client } from "../../../sanityclient/sanity";
const UpdateBid = async (req, res) => {
  try {
    const docAuctionBid =
      req.body.tokenId + req.body.seller + "listedAuctionNftTable";

    const bidDoc = {
      _type: "bidsNftTable",
      _id:
        req.body.auctionID +
        req.body.bidder +
        "bidsNftTable" +
        req.body.randomID,
      Bidder: req.body.bidder,
      Seller: req.body.seller,
      TokenId: req.body.randomID,
      AuctionID: req.body.auctionID,
      Amount: req.body.price,
      BidStatus: true,
      Sale: true,
    };

    await client.createIfNotExists(bidDoc).then((res) => {
      console.log({ res });
    });

    await client
      .patch(docAuctionBid)
      .set({ Bidder: req.body.bidder, Price: req.body.price })
      .commit()
      .then((res) => {
        console.log({ res });
      });
    console.log("Success!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default UpdateBid;
