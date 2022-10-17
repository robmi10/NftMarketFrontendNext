import { client } from "../../../sanityclient/sanity";
const DeleteFromAuction = async (req, res) => {
  console.log("delete from auction now ->", req.body);
  console.log("delete from auction buyer ->", req.body.buyer);
  try {
    const userDoc = req.body.tokenId + req.body.owner + "listedAuctionNftTable";
    await client.delete(userDoc);
    await client
      .patch(req.body.tokenId + req.body.owner)
      .set({ Seller: req.body.buyer, Sale: false })
      .commit();
    console.log("Success!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default DeleteFromAuction;
