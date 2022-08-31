import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div class="h-35 top-0 flex items-center justify-around rounded-sm bg-blue-600">
      <div class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md text-white">
        <Link href="/">HOME</Link>
      </div>
      <div class="flex w-1/2 justify-end space-x-10 ">
        <div class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md text-white">
          <Link href="/market">MARKET</Link>
        </div>
        <div class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md text-white">
          <Link href="/profile/profile">PROFILE</Link>
        </div>
        <div class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md text-white">
          CONNECT
        </div>
      </div>
    </div>
  );
};

export default Navbar;
