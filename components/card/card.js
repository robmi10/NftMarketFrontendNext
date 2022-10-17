import React, { useEffect, useRef, useState } from "react";
import NftCard from "./nftCard";

const CardProfile = ({ option, handleOpenSellModal }) => {
  return (
    <NftCard
      ipfsInfo={option.ipfsInfo}
      option={option}
      handleOpenSellModal={handleOpenSellModal}
    />
  );
};

export default CardProfile;
