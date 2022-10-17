import React, { useContext, useState } from "react";
import { NftContext } from "../nftContext/context";

const GetIpfsTokenURI = () => {
  const getipfsInfo = async (option) => {
    var response = await fetch(`https://ipfs.io/ipfs/${option.TokenURI}`);
    var body = await response.json();
    option.ipfsInfo = body;

    console.log("option", option);
    return { option };
  };
  return { getipfsInfo };
};

export default GetIpfsTokenURI;
