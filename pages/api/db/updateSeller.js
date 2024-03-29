import { client } from "../../../client/sanity";
const UpdateSeller = async (req, res) => {
  try {
    const docDelete = req.body.tokenId + req.body.owner + "listedNftTable";
    await client.delete(docDelete);
    await client
      .patch(req.body.tokenId + req.body.seller)
      .set({ Seller: req.body.to, Sale: false })
      .commit();
    console.log("Success!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default UpdateSeller;
