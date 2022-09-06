import { useContext, useEffect, useState } from "react";
import { NftContext } from "../nftContext/context";
import { useForm } from "react-hook-form";
import ipfs from "../pages/api/ipfs/ipfs";

const Inputfield = () => {
  const { register, handleSubmit } = useForm();
  const { setOpenModal, openModal } = useContext(NftContext);
  const [imageFile, setImageFile] = useState("");
  const [imageIpfs, setImageIpfs] = useState("");
  const [data, setData] = useState("");

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
    reader.onloadend = () => {
      ipfs.add(Buffer(reader.result), (error, result) => {
        setImageIpfs(result[0].hash);
      });
    };
    handleMetadata();
  };
  const handleMetadata = async () => {
    console.log({ data });
    const currImage = `https://ipfs.io/ipfs/${imageIpfs}`;
    const newImage = JSON.stringify(currImage);
    const metadata = {
      title: data.nft,
      description: data.description,
      price: data.price,
      royalty: data.royalty,
      Copies: data.copies,
      image: newImage,
    };
    try {
      console.log(
        "Buffer.from(JSON.stringify(metadata)",
        Buffer.from(JSON.stringify(metadata))
      );
      const hashResult = await ipfs.add(Buffer.from(JSON.stringify(metadata)));
      console.log("hashResult ->", hashResult);
    } catch (e) {
      console.log("error ->", e);
    }
  };
  return (
    <>
      <div class="h-full w-full content-center rounded-md bg-blue-600">
        <h1
          class="mt-5 ml-20 w-0 cursor-pointer bg-slate-400 text-white"
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

          <label class="flex items-start text-white " for="first">
            Price
          </label>
          <input
            class="w-full rounded-md px-4"
            type="number"
            id="price"
            price="second"
            {...register("price", { required: true, minLength: 1 })}
          />

          <label class="text-white" for="first">
            Copies
          </label>
          <input
            class="rounded-md px-4"
            type="number"
            id="royalty"
            name="third"
            {...register("royalty", { required: true, maxLength: 3 })}
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
            Duration
          </label>
          <input class="rounded-md px-4" type="date" id="date" name="fourth" />

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
            class="pl-2/4 mt-10 rounded-md bg-blue-700 text-white"
          />
        </form>
      </div>
    </>
  );
};

export default Inputfield;
