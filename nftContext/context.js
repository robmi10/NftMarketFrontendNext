import React from "react";
import { createContext, useState, useEffect } from "react";

export const NftContext = createContext();

const NftProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState("");

  return (
    <NftContext.Provider
      value={{
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};
export default NftProvider;
