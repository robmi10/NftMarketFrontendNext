import { client } from "../../../client/sanity";

const CreateNft = async (req, res) => {
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

    await client.createIfNotExists(userDoc);
    console.log("Success !");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default CreateNft;
