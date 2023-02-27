import { useContext, useEffect, useState, useRef } from "react";
import { NftContext } from "../nftContext/context";
import { useForm } from "react-hook-form";
import ipfs from "../pages/api/ipfs/ipfs";
import useCreateSell from "./moralis/useCreateSell";
import BouncerLoader from "./animation/loader/bouncerLoader";

const Inputfield = () => {
  const { register, handleSubmit } = useForm();
  const { setOpenModal, openModal, data, setData, nftCreateData } =
    useContext(NftContext);
  const [imageFile, setImageFile] = useState("");
  const imageIpfs = useRef("");
  const { createSell } = useCreateSell();
  useEffect(() => {
    if (imageFile) {
      handleFile();
    }
  }, [imageFile]);

  useEffect(() => {
    if (!openModal) {
      handleOpenSellModal(false);
    }
    console.log({ nftCreateData });
  }, [openModal, nftCreateData]);

  const onSubmit = (data) => {
    setData(data);
    setImageFile(data.image);
  };

  const handleFile = () => {
    var reader = new window.FileReader();
    reader.readAsArrayBuffer(imageFile[0]);

    reader.onload = () => {
      try {
        ipfs.add(reader.result).then((res) => {
          imageIpfs.current = res.path;
          handleMetadata();
        });
      } catch (error) {
        console.log({ error });
      }
    };
  };
  const handleMetadata = async () => {
    const currImage = `https://ipfs.io/ipfs/${imageIpfs.current}`;
    const metadata = {
      title: data.nft,
      description: data.description,
      image: currImage,
    };
    try {
      const hashResult = await ipfs.add(Buffer.from(JSON.stringify(metadata)));
      createSell(hashResult, data.duration);
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <>
      <div className="lg:w-wh relative flex h-full content-center items-center justify-center rounded-md bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 dark:from-indigo-800 dark:via-purple-600 dark:to-pink-400 dark:text-black">
        <h1
          className="absolute top-0 mt-5 w-4/5 cursor-pointer lg:left-0 lg:ml-20 lg:w-0"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          X
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-10 mb-20 mt-10 flex flex-col lg:m-20"
        >
          <label htmlFor="first">NFT</label>
          <input
            className="flex-start rounded-md px-4"
            type="text"
            id="name"
            name="first"
            {...register("nft", { required: true, minLength: 2 })}
          />

          <label htmlFor="first">Description</label>
          <input
            className="mr-2 h-12 max-w-full rounded-md px-4"
            type="text"
            id="text"
            name="fifth"
            {...register("description", { required: true, minLength: 2 })}
          />
          <label htmlFor="first">Royalty</label>
          <input
            className="rounded-md px-4"
            type="number"
            id="royalty"
            name="third"
            {...register("royalty", { required: true, maxLength: 2 })}
          />
          <label>Image</label>
          <input
            className="rounded-md "
            type="file"
            id="image"
            name="fourth"
            {...register("image", { required: true, minLength: 2 })}
          />

          <button
            className="pl-2/4 mt-10 flex h-12 cursor-pointer items-center justify-center rounded-lg bg-white shadow-lg shadow-[#185ee041] hover:shadow-xl hover:shadow-[#185ee041] lg:w-96"
            type="submit"
          >
            <div className="flex items-center justify-center">
              {nftCreateData === "loading" ? (
                <BouncerLoader />
              ) : (
                <div>Submit</div>
              )}
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default Inputfield;
