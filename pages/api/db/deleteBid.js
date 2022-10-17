import { client } from "../../../sanityclient/sanity";
const DeleteFromAuction = async (req, res) => {
  console.log("delete bid now ->", req.body);
  try {
    const userDoc =
      req.body.auctionID + req.body.bidder + "bidsNftTable" + req.body.tokenId;

    console.log({ userDoc });
    await client.delete(userDoc).then((res) => {
      console.log("delete bid result ->", res);
    });
    console.log("Success!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default DeleteFromAuction;
