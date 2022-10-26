import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { NftContext } from "../nftContext/context";
import { AiFillHome } from "react-icons/ai";

const Layout = ({ children }) => {
  const {
    userAddress,
    loginUser,
    logoutUser,
    isWeb3Enabled,
    openLinkModal,
    setOpenLinkModal,
  } = useContext(NftContext);

  useEffect(() => {
    console.log({ openLinkModal });
    console.log({ isWeb3Enabled });
  }, [isWeb3Enabled]);

  if (openLinkModal)
    return (
      <>
        <div class="flex h-screen flex-col items-center justify-center gap-10 bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 shadow-lg">
          <button
            onClick={() => {
              setOpenLinkModal(false);
            }}
            class=" absolute left-10 top-10 "
          >
            X
          </button>

          {userAddress && (
            <div class="left-2/5 absolute top-10 ">
              <h1 href="/market">{userAddress?.toString()?.substr(0, 10)}</h1>
            </div>
          )}

          <div class="flex h-20 cursor-pointer items-center justify-center rounded-md focus:text-white lg:w-20 ">
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

          <div class="flex h-20 cursor-pointer items-center justify-center rounded-md lg:w-20 ">
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
            class="flex h-20 cursor-pointer items-center justify-center rounded-md lg:w-20 "
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
              class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md "
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
              class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md "
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
    </>
  );
};

export default Layout;
