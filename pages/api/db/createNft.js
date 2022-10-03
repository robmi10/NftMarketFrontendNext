import { client } from "../../../sanityclient/sanity";

const CreateNft = async (req, res) => {
  console.log("check body ->", req.body);
  console.log("createNftList inside func->");

  try {
    const userDoc = {
      _type: "nftCreated",
      _id: req.body.tokenId + req.body.owner,
      Owner: req.body.owner,
      Seller: req.body.seller,
      TokenId: req.body.tokenId,
      TokenURI: req.body.tokenURI,
      Royalty: req.body.royalty,
      Sale: req.body.sale,
    };

    console.log({ userDoc });
    await client.createIfNotExists(userDoc);
    console.log("Success !");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default CreateNft;
