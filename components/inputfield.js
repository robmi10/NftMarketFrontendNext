import { useContext, useEffect, useState, useRef } from "react";
import { NftContext } from "../nftContext/context";
import { useForm } from "react-hook-form";
import ipfs from "../pages/api/ipfs/ipfs";
import useCreateSell from "./moralis/useCreateSell";

const Inputfield = () => {
  const { register, handleSubmit } = useForm();
  const { setOpenModal, openModal, data, setData } = useContext(NftContext);
  const [imageFile, setImageFile] = useState("");
  const imageIpfs = useRef("");
  const { createSell } = useCreateSell();
  useEffect(() => {
    if (imageFile) {
      handleFile();
    }
  }, [imageFile]);

  const onSubmit = (data) => {
    console.log(data);
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
      //createNftList(data);
    } catch (e) {
      console.log("error ->", e);
    }
  };
  return (
    <>
      <div class="w-wh relative flex h-full content-center items-center justify-center rounded-md bg-blue-600">
        <h1
          class="absolute top-0 left-0 mt-5 ml-20 w-0 cursor-pointer bg-slate-400 text-white"
          onClick={() => {
            setOpenModal(false);
            console.log({ openModal });
          }}
        >
          X
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          class="m-20 mb-20 mt-10 flex flex-col"
        >
          <label class="text-white" for="first">
            NFT
          </label>
          <input
            class="flex-start rounded-md px-4"
            type="text"
            id="name"
            name="first"
            {...register("nft", { required: true, minLength: 2 })}
          />

          <label class="text-white" for="first">
            Description
          </label>
          <input
            class="mr-2 h-12 max-w-full rounded-md px-4"
            type="text"
            id="text"
            name="fifth"
            {...register("description", { required: true, minLength: 2 })}
          />
          <label class="text-white" for="first">
            Royalty
          </label>
          <input
            class="rounded-md px-4"
            type="number"
            id="royalty"
            name="third"
            {...register("royalty", { required: true, maxLength: 2 })}
          />
          <label class="text-white" for="first">
            Image
          </label>
          <input
            class="rounded-md text-white"
            type="file"
            id="duration"
            name="fourth"
            {...register("image", { required: true, minLength: 2 })}
          />

          <input
            type="submit"
            class="pl-2/4 mt-10 w-96 rounded-md bg-blue-700 text-white"
          />
        </form>
      </div>
    </>
  );
};

export default Inputfield;
