import React from "react";
import { createContext, useState, useEffect } from "react";

export const NftContext = createContext();

const NftProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [marketAuction, setMarketAuction] = useState(false);

  return (
    <NftContext.Provider
      value={{
        openModal,
        setOpenModal,
        marketAuction,
        setMarketAuction,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};
export default NftProvider;
