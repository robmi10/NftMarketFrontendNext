import { client } from "../../../client/sanity";

const ListNftToMarket = async (req, res) => {
  try {
    const docCreated = req.body.tokenId + req.body.owner;
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

    await client.create(userDoc);
    await client.patch(docCreated).set({ Sale: true }).commit();
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default ListNftToMarket;
