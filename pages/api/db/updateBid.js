import { client } from "../../../sanityclient/sanity";
const UpdateBid = async (req, res) => {
  console.log("update Bid->", req.body);
  try {
    const docBid = req.body.tokenId + req.body.seller + "listedAuctionNftTable";
    await client
      .patch(docBid)
      .set({ Bidder: req.body.bidder, Price: req.body.price })
      .commit();
    console.log("Success!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default UpdateBid;
