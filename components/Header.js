import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineShoppingCart, HiUserCircle } from "react-icons/hi";
import Auth from "./Auth";
import { useCart } from "../pages/context/CartContext";


function Header() {
  const { cart } = useCart();


  return (
    <div className="sticky top-0 grid grid-cols-3 items-center p-3 z-50 bg-gray-100">
      <div className="flex gap-6">
        <div className="md:pl-3"> Logo</div>
        <ul className="flex gap-6">
          <li className="hover:text-gray-500">
            <Link href="/">Home</Link>
          </li>
          {/* <li className="hover:text-gray-500">
            <Link href="/about">About</Link>
          </li> */}
          <li className="hover:text-gray-500">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className=" flex justify-center"></div>

      <div className="flex gap-6 justify-end items-center md:pr-4">
        <div className="relative">
          {" "}
          <span className="absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] px-1 text-white">
            {cart.length}
          </span>
          <Link href="/cart">
            <HiOutlineShoppingCart className="h-6 w-6 text-gray-600" />
          </Link>
        </div>

        <div>
          {" "}
          <Auth />
        </div>
      </div>

      
    </div>
  );
}

export default Header;
