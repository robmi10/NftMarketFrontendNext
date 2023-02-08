import { client } from "../../../sanityclient/sanity";
const DeleteFromSale = async (req, res) => {
  try {
    const userDoc = req.body.tokenId + req.body.seller + "listedNftTable";
    await client.delete(userDoc);
    console.log("Success!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default DeleteFromSale;
