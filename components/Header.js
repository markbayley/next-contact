import React from "react";
import Link from "next/link";
import { HiOutlineShoppingCart, HiUserCircle } from "react-icons/hi";
import Auth from "./Auth";

function Header() {
  return (
    <div className="sticky top-0 grid grid-cols-3 items-center p-3 bg-gray-900">
      <div className="flex gap-6">
        <div className="pl-3"> Logo</div>
        <ul className="flex gap-6">
          <li className="hover:text-gray-300">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-300">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-gray-300">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className=" flex justify-center"></div>

      <div className="flex gap-6 justify-end items-center pr-4">
        <div>
          {" "}
          <Link href="/cart">
            <HiOutlineShoppingCart className="h-5 w-5" />
          </Link>
        </div>

        <div>
          {" "}
          <Link href="/auth">
            <Auth />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
