import { client } from "../../../sanityclient/sanity";

const ListNftToMarket = async (req, res) => {
  console.log("check body ->", req.body);
  console.log("ListNftToMarket v2 inside func->");

  try {
    const userDoc = {
      _type: "listedNftTable",
      _id: req.body.tokenId + req.body.owner + "listedNftTable",
      Owner: req.body.owner,
      Seller: req.body.seller,
      TokenURI: req.body.tokenURI,
      TokenId: req.body.tokenId,
      Price: req.body.price,
      Royalty: req.body.royalty,
      Sale: req.body.sale,
    };

    console.log({ userDoc });
    await client.create(userDoc);
    console.log("Success nftCreated!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default ListNftToMarket;
