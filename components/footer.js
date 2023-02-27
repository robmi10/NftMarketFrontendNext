import React from "react";
import { GiEgyptianProfile } from "react-icons/gi";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div class="bottom-0  flex w-full justify-start bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 shadow-lg shadow-[#185ee041] dark:from-indigo-800 dark:via-purple-600 dark:to-pink-400 lg:h-48 lg:items-center">
      <div class="mt-2 flex h-full w-1/3 items-center justify-center lg:mt-0 ">
        <GiEgyptianProfile size={58} />
      </div>
      <div class="flex h-full w-1/3 justify-center">
        <ul class="mt-2">
          <h1>Overview</h1>
          <li class="mt-2 lg:mt-8">About</li>
          <li class="cursor-pointer">Careers</li>
          <li class="cursor-pointer">Privacy Policy</li>
          <li class="cursor-pointer">Terms Of Use</li>
        </ul>
      </div>

      <div class="flex h-full w-1/3 justify-center ">
        <ul class="mt-2">
          <h1>Follow us</h1>
          <div class="flex w-full flex-col items-center gap-2 ">
            <li class="mt-2 cursor-pointer lg:mt-8">
              <BsFacebook />
            </li>
            <li class="cursor-pointer">
              <AiFillInstagram />
            </li>
            <li class="cursor-pointer">
              <FaDiscord />
            </li>
            <li class="cursor-pointer">
              <AiOutlineTwitter />
            </li>
          </div>
        </ul>
      </div>
      <div class="flex h-full w-1/3 justify-center">
        <ul class="mt-2">
          <h1>Contact</h1>
          <li class="mt-2 lg:mt-8">Support</li>
          <li class="cursor-pointer">Email</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
