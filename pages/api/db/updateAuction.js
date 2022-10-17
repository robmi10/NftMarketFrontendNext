import { client } from "../../../sanityclient/sanity";
const UpdateDuration = async (req, res) => {
  console.log("update and delete Sale->", req.body);
  try {
    const docAuction =
      req.body.tokenId + req.body.Seller + "listedAuctionNftTable";
    console.log({ docAuction });
    await client.patch(docAuction).set({ Sale: false }).commit();
    console.log("Success!");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default UpdateDuration;