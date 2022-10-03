import { client } from "../../../sanityclient/sanity";
const DeleteFromAuction = async (req, res) => {
  console.log("delete fromt auction->", req.body);
  try {
    const userDoc = {
      _type: "listedAuctionNftTable",
      _id: req.body.tokenId + req.body.owner + "listedAuctionNftTable",
    };
    await client.delete(userDoc);
    console.log("Success!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default DeleteFromAuction;
