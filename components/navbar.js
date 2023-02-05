import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "./searchbar";
import { NftContext } from "../nftContext/context";
import { useEthers } from "@usedapp/core";
import { AiFillHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const { setOpenLinkModal, setThemeColor } = useContext(NftContext);
  const { systemTheme, theme, setTheme } = useTheme();

  const currenTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div class="lg:h-35 lg:bg-opacity-120 flex h-24 items-center justify-center bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 shadow-lg shadow-[#185ee041] dark:from-indigo-800 dark:via-purple-600 dark:to-pink-400 lg:justify-around lg:rounded-sm">
      <div class="w-2/2 flex cursor-pointer flex-row items-center justify-around gap-14 rounded-md lg:justify-start lg:gap-20">
        <Link href="/">
          <AiFillHome size={"20px"} />
        </Link>
        <div class="flex items-center justify-center ">
          <SearchBar />
        </div>

        <div class="lg:hidden">
          <GiHamburgerMenu
            size={"20px"}
            onClick={() => {
              setOpenLinkModal(true);
            }}
          />
        </div>
      </div>

      <div class=" hidden lg:flex lg:w-1/2 lg:justify-end lg:space-x-10 ">
        {account && (
          <div class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md ">
            <h1 href="/market">{account?.toString()?.substr(0, 10)}</h1>
          </div>
        )}
        <div class="flex h-20 cursor-pointer items-center justify-center rounded-md lg:w-20 ">
          {mounted && currenTheme === "dark" && (
            <SunIcon
              className="h-6 w-6"
              role="button"
              onClick={() => {
                setTheme("light");
                setThemeColor("light");
                console.log("setToLight");
              }}
            />
          )}

          {mounted && currenTheme === "light" && (
            <MoonIcon
              className="h-6 w-6"
              role="button"
              onClick={() => {
                setTheme("dark");
                setThemeColor("dark");
                console.log("setToDark");
              }}
            />
          )}
        </div>

        <div class="flex h-20 cursor-pointer items-center justify-center rounded-md lg:w-20 ">
          <Link href="/market">MARKET</Link>
        </div>

        <div class="flex h-20 cursor-pointer items-center justify-center rounded-md lg:w-20 ">
          <Link href="/profile">PROFILE</Link>
        </div>

        {!account && (
          <div
            onClick={() => {
              activateBrowserWallet();
            }}
            class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md "
          >
            CONNECT
          </div>
        )}
        {account && (
          <div
            onClick={() => {
              deactivate();
            }}
            class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md "
          >
            <Link href="/">LOGOUT</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
