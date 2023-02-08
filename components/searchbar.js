import React, { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NftContext } from "../nftContext/context";

const Searchbar = () => {
  const { setSearchInput } = useContext(NftContext);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <form>
      <div>
        <AiOutlineSearch class=" absolute ml-3  mt-1 h-4 w-5 dark:text-black" />
        <input
          class="ml-2 flex items-center justify-center rounded-md border-black text-center dark:bg-white dark:text-black lg:w-80"
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
