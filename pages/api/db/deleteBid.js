import { client } from "../../../client/sanity";
const DeleteFromAuction = async (req, res) => {
  try {
    const userDoc =
      req.body.auctionID + req.body.bidder + "bidsNftTable" + req.body.tokenId;
    await client.delete(userDoc).then((res) => {});
    console.log("Success!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default DeleteFromAuction;
