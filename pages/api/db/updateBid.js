import { client } from "../../../sanityclient/sanity";
import { uuid } from "uuidv4";
const UpdateBid = async (req, res) => {
  console.log("update Bid->", req.body);
  try {
    const docAuctionBid =
      req.body.tokenId + req.body.seller + "listedAuctionNftTable";

    const docEditBid =
      req.body.auctionID + req.body.bidder + "bidsNftTable" + req.body.randomID;

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

    console.log("update Bid 2 ->", req.body);
    console.log({ bidDoc });
    await client.createIfNotExists(bidDoc).then((res) => {
      console.log({ bidDoc: res });
    });

    await client
      .patch(docAuctionBid)
      .set({ Bidder: req.body.bidder, Price: req.body.price })
      .commit()
      .then((res) => {
        console.log({ docAuctionBid: res });
      });
    console.log("Success!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default UpdateBid;
