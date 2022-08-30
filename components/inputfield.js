import { useContext } from "react";
import { NftContext } from "../nftContext/context";

const Inputfield = () => {
  const { setOpenModal, openModal } = useContext(NftContext);
  return (
    <>
      <div class="h-full w-full content-center rounded-md bg-blue-600">
        <h1
          class="mt-5 ml-20 cursor-pointer text-white"
          onClick={() => {
            setOpenModal(false);
            console.log({ openModal });
          }}
        >
          X
        </h1>
        <div class="m-20 mb-20 mt-10 flex flex-col">
          <label class="text-white" for="first">
            NFT
          </label>
          <input class="w-2/4 rounded-md" type="text" id="name" name="first" />

          <label class="text-white" for="first">
            Price
          </label>
          <input class="rounded-md" type="text" id="number" price="second" />

          <label class="text-white" for="first">
            Royalty
          </label>
          <input class="rounded-md" type="text" id="range" name="third" />

          <label class="text-white" for="first">
            Duration
          </label>
          <input class="rounded-md" type="number" id="date" name="fourth" />

          <label class="text-white" for="first">
            Description
          </label>
          <input
            class="mr-2 h-24 rounded-md"
            type="text"
            id="text"
            name="fifth"
          />

          <label class="text-white" for="first">
            Image
          </label>
          <input
            class="rounded-md text-white"
            type="file"
            id="duration"
            name="fourth"
          />
          <button class="pl-2/4 mt-10 rounded-md bg-blue-700 text-white">
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
};

export default Inputfield;
