import Link from "next/link";
import React, { useContext } from "react";
import Modal from "../../components/modal";
import { NftContext } from "../../nftContext/context";

const Profile = () => {
  const { openModal, setOpenModal } = useContext(NftContext);
  if (openModal) return <Modal />;
  return (
    <>
      <div>
        <div class="h-2/10 w-4/8 flex cursor-pointer flex-row justify-center space-x-52 pt-20 font-poppins text-xl underline">
          <span
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Create NFT
          </span>
          <Link href="/profile/myCollection"> My Collection</Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
