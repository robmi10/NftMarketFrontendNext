import React from "react";
import NftCard from "./nftCard";

const CardProfile = ({ nft, handleOpenSellModal }) => {
  return <NftCard {...nft} handleOpenSellModal={handleOpenSellModal} />;
};

export default CardProfile;
