import React, { useEffect, useRef, useState } from "react";
import NftCardAuction from "./nftCardAuction";

const CardAuction = ({ option, handleOpenSellModal }) => {
  const [ipfsInfo, setIpfsInfo] = useState(false);
  console.log({ cardProfile: option });

  const retriveIpfsInfo = async () => {
    if (!option?.TokenURI) return false;

    try {
      var response = await fetch(`https://ipfs.io/ipfs/${option?.TokenURI}`);
      var body = await response.json();
    } catch (error) {
      console.log({ error });
    }
    console.log({ body });
    setIpfsInfo(body);
  };

  useEffect(() => {
    if (!ipfsInfo) {
      retriveIpfsInfo();
    }
  });

  return (
    ipfsInfo && (
      <NftCardAuction
        handleOpenSellModal={handleOpenSellModal}
        ipfsInfo={ipfsInfo}
        option={option}
      />
    )
  );
};

export default CardAuction;
