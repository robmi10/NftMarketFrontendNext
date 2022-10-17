import React, { useContext } from "react";
import Link from "next/link";
import SearchBar from "./searchbar";
import { NftContext } from "../nftContext/context";
import { useMoralis } from "react-moralis";
import useNftToMarket from "./moralis/useNftToMarket";

const Navbar = () => {
  const { userAddress, loginUser, logoutUser } = useContext(NftContext);
  const { isWeb3Enabled } = useMoralis();

  return (
    <div class="h-35 top-0 flex items-center justify-around rounded-sm bg-blue-600">
      <div class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md text-white">
        <Link href="/">HOME</Link>
      </div>
      <div class="flex items-center justify-center ">
        <SearchBar />
      </div>

      <div class="flex w-1/2 justify-end space-x-10 ">
        {userAddress && (
          <div class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md text-white">
            <h1 href="/market">{userAddress?.toString()?.substr(0, 10)}</h1>
          </div>
        )}
        <div class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md text-white">
          <Link href="/market">MARKET</Link>
        </div>

        <div class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md text-white">
          <Link href="/profile">PROFILE</Link>
        </div>
        {!isWeb3Enabled && (
          <div
            onClick={() => {
              loginUser();
            }}
            class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md text-white"
          >
            CONNECT
          </div>
        )}
        {isWeb3Enabled && (
          <div
            onClick={() => {
              logoutUser();
            }}
            class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md text-white"
          >
            <Link href="/">LOGOUT</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
