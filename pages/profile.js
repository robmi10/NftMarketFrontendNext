import Link from "next/link";
import React, { useContext, useEffect } from "react";
import styles from "../components/animation/TabSlide/tabslide.module.scss";
import Modal from "../components/modal";
import { NftContext } from "../nftContext/context";
import { GiEgyptianProfile } from "react-icons/gi";
import { useToast } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";

const Profile = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const toast = useToast();
  const {
    openModal,
    openModalSell,
    setOpenModal,
    nftList,
    userAddress,
    toastNotifcation,
    setToastNotifcation,
  } = useContext(NftContext);
  useEffect(() => {
    console.log("inside profile openmodalsale");
    if (toastNotifcation) {
      console.log("run toastNotifcation");

      toast({
        title: "NFT created.",
        description: "Your'e NFT is sucessfully created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setToastNotifcation(false);
    }
    console.log({ toastNotifcation });
  }, [openModalSell, toastNotifcation]);
  if (openModal) return <Modal />;
  return (
    <>
      <div class=" h-screen">
        <div class="flex w-screen justify-center">
          <div class="mt-24 flex h-56 w-4/6 items-center justify-start">
            <div class="h-full w-full animate-fade rounded-sm bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 shadow-2xl shadow-[#185ee041] dark:from-indigo-800 dark:via-purple-600 dark:to-pink-400 lg:float-left lg:w-3/6"></div>
            <div class="flex h-full animate-fade flex-col items-center justify-center gap-10 rounded-md lg:float-right lg:w-3/6">
              <h1>{account?.toString()?.substr(0, 10)}</h1>

              <GiEgyptianProfile size={"200px"} />
            </div>
          </div>
        </div>

        <div class="mt-16 flex animate-fadeAfter items-center justify-center lg:mt-32">
          <div class="p-4/4 relative mt-10 flex h-64 flex-col items-center justify-center gap-20 rounded-lg shadow-lg shadow-[#185ee041] lg:h-11 lg:flex-row">
            <input
              onClick={() => {
                setOpenModal(true);
              }}
              type="radio"
              id="radiohover-1"
              name="tabhover"
            />
            <label className={styles.tabhover} for="radiohover-1">
              Create NFT
            </label>
            <input type="radio" id="radiohover-2" name="tabhover" />
            <label className={styles.tabhover} for="radiohover-2">
              <Link href="/myCollection"> My Collection</Link>
            </label>
            <input type="radio" id="radiohover-3" name="tabhover" />
            <label className={styles.tabhover} for="radiohover-3">
              <Link href="/myBids"> My Bids</Link>
            </label>
            <span className={styles.glider2}></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
