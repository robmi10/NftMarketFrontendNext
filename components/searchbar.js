import React, { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NftContext } from "../nftContext/context";
import Filter from "./filterList";

const Searchbar = () => {
  const { searchInput, setSearchInput } = useContext(NftContext);

  const handleChange = (e) => {
    // console.log({ eValue: e.target.value });
    setSearchInput(e.target.value);
  };

  return (
    <form>
      <div class="relative block w-4/5">
        <AiOutlineSearch class=" absolute ml-3  mt-1 h-4 w-5" />
        <input
          class="ml-2 flex w-80 items-center justify-center rounded-md border-black text-center"
          placeholder="Search..."
          title="searchBar"
          type="text"
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Searchbar;
