import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar = () => {
  return (
    <form>
      <div class="relative block w-4/5">
        <AiOutlineSearch class=" absolute ml-3  mt-1 h-4 w-5" />
        <input
          class="ml-2 flex w-80 items-center justify-center rounded-md border-black text-center"
          placeholder="Search..."
          title="searchBar"
          type="text"
        />
      </div>
    </form>
  );
};

export default Searchbar;
