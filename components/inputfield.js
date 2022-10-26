import { useContext, useEffect, useState, useRef } from "react";
import { NftContext } from "../nftContext/context";
import { useForm } from "react-hook-form";
import ipfs from "../pages/api/ipfs/ipfs";
import useCreateSell from "./moralis/useCreateSell";
import BouncerLoader from "./animation/loader/bouncerLoader";

const Inputfield = () => {
  const { register, handleSubmit } = useForm();
  const { setOpenModal, openModal, data, setData } = useContext(NftContext);
  const [imageFile, setImageFile] = useState("");
  const imageIpfs = useRef("");
  const { createSell } = useCreateSell();
  useEffect(() => {
    console.log({ imageFileInUseffect: imageFile });
    if (imageFile) {
      console.log("run handle file");
      handleFile();
    }
  }, [imageFile]);

  useEffect(() => {
    if (!openModal) {
      handleOpenSellModal(false);
    }
  }, [openModal]);

  const onSubmit = (data) => {
    console.log("inside onsubmit check", data);
    setData(data);
    setImageFile(data.image);
  };

  const handleFile = () => {
    console.log({ imageFile });
    var reader = new window.FileReader();
    reader.readAsArrayBuffer(imageFile[0]);

    reader.onload = () => {
      console.log("inside reader onloaded!");
      try {
        var ipfsAdd = ipfs.add(reader.result).then((res) => {
          console.log({ res });
          console.log("ipfsAdd", ipfsAdd);
          imageIpfs.current = res.path;
          handleMetadata();
        });
      } catch (error) {
        console.log({ error });
      }
    };
  };
  const handleMetadata = async () => {
    console.log({ data });
    console.log({ imageIpfs: imageIpfs.current });
    const currImage = `https://ipfs.io/ipfs/${imageIpfs.current}`;
    const newImage = JSON.stringify(currImage);
    const metadata = {
      title: data.nft,
      description: data.description,
      image: currImage,
    };
    try {
      console.log(
        "Buffer.from(JSON.stringify(metadata)",
        Buffer.from(JSON.stringify(metadata))
      );
      const hashResult = await ipfs.add(Buffer.from(JSON.stringify(metadata)));
      console.log("hashResult ->", hashResult);
      console.log({ data });
      createSell(hashResult, data.duration);
    } catch (e) {
      console.log("error ->", e);
    }
  };
  return (
    <>
      <div class="lg:w-wh relative flex h-full content-center items-center justify-center rounded-md bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300">
        <h1
          class="cursor-pointe absolute top-0 mt-5 w-4/5 lg:left-0 lg:ml-20 lg:w-0"
          onClick={() => {
            setOpenModal(false);
            console.log({ openModal });
          }}
        >
          X
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          class="m-10 mb-20 mt-10 flex flex-col lg:m-20"
        >
          <label for="first">NFT</label>
          <input
            class="flex-start rounded-md px-4"
            type="text"
            id="name"
            name="first"
            {...register("nft", { required: true, minLength: 2 })}
          />

          <label for="first">Description</label>
          <input
            class="mr-2 h-12 max-w-full rounded-md px-4"
            type="text"
            id="text"
            name="fifth"
            {...register("description", { required: true, minLength: 2 })}
          />
          <label for="first">Royalty</label>
          <input
            class="rounded-md px-4"
            type="number"
            id="royalty"
            name="third"
            {...register("royalty", { required: true, maxLength: 2 })}
          />
          <label>Image</label>
          <input
            class="rounded-md "
            type="file"
            id="image"
            name="fourth"
            {...register("image", { required: true, minLength: 2 })}
          />

          <button
            class="pl-2/4 mt-10 flex h-12 cursor-pointer items-center justify-center rounded-lg bg-white shadow-lg shadow-[#185ee041] hover:shadow-xl hover:shadow-[#185ee041] lg:w-96"
            type="submit"
          >
            <div class="flex items-center justify-center">
              {openModal === "loading" ? <BouncerLoader /> : <div>Submit</div>}
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default Inputfield;
