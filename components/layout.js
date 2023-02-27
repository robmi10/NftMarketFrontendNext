import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { NftContext } from "../nftContext/context";
import { AiFillHome } from "react-icons/ai";
import Footer from "./footer";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const Layout = ({ children }) => {
  const {
    userAddress,
    loginUser,
    logoutUser,
    isWeb3Enabled,
    openLinkModal,
    setOpenLinkModal,
    setThemeColor,
  } = useContext(NftContext);
  const { systemTheme, theme, setTheme } = useTheme();
  const currenTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {}, [isWeb3Enabled]);

  if (openLinkModal)
    return (
      <>
        <div className="flex h-screen flex-col items-center justify-center gap-10 bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 shadow-lg dark:from-indigo-800 dark:via-purple-600 dark:to-pink-400">
          <button
            onClick={() => {
              setOpenLinkModal(false);
            }}
            className=" absolute left-10 top-10 "
          >
            X
          </button>

          {userAddress && (
            <div className="left-2/5 absolute top-10 ">
              <h1 href="/market">{userAddress?.toString()?.substr(0, 10)}</h1>
            </div>
          )}

          {mounted && currenTheme === "dark" && (
            <SunIcon
              className="h-6 w-6"
              role="button"
              onClick={() => {
                setTheme("light");
                setThemeColor("light");
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
              }}
            />
          )}

          <div className="flex h-20 cursor-pointer items-center justify-center rounded-md focus:text-white lg:w-20 ">
            <Link href="/">
              <button
                onClick={() => {
                  setOpenLinkModal(false);
                }}
              >
                <AiFillHome />
              </button>
            </Link>
          </div>

          <div className="flex h-20 cursor-pointer items-center justify-center rounded-md lg:w-20 ">
            <Link href="/market">
              <button
                onClick={() => {
                  setOpenLinkModal(false);
                }}
              >
                MARKET
              </button>
            </Link>
          </div>

          <button
            onClick={() => {
              setOpenLinkModal(false);
            }}
            className="flex h-20 cursor-pointer items-center justify-center rounded-md lg:w-20 "
          >
            <Link
              onClick={() => {
                setOpenLinkModal(false);
              }}
              href="/profile"
            >
              PROFILE
            </Link>
          </button>

          {!userAddress && (
            <button
              onClick={() => {
                loginUser();
                setOpenLinkModal(false);
              }}
              className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md "
            >
              CONNECT
            </button>
          )}
          {userAddress && (
            <button
              onClick={() => {
                logoutUser();
                setOpenLinkModal(false);
              }}
              className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md "
            >
              <Link href="/">LOGOUT</Link>
            </button>
          )}
        </div>
      </>
    );

  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
