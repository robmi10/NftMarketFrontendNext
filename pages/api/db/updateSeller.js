import { client } from "../../../sanityclient/sanity";
const UpdateSeller = async (req, res) => {
  console.log("update and delete Sale->", req.body);
  try {
    const docDelete = req.body.tokenId + req.body.owner + "listedNftTable";
    console.log("tokenId delete", req.body.tokenId);
    console.log("tokenId owner", req.body.owner);
    console.log({ docDelete });
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
