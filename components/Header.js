import React from "react";
import Link from "next/link";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi";
import Auth from "./Auth";
import { useCart } from "../context/CartContext";
import Image from "next/image";

function Header() {
  const { cart, favorites } = useCart();

  return (
    <div className="sticky top-0 grid grid-cols-3 items-center p-3 z-50 bg-gray-100">
      <div className="flex gap-6">
       <Link href="/"><div className="relative h-7 w-7 md:pl-3"> <Image src="/favicon.ico" alt="logo" fill style={{objectFit: "contain"}} /></div></Link> 
        <ul className="flex gap-6">
          <li className="hover:text-gray-500">
            <Link href="/">About</Link>
          </li>
          <li className="hover:text-gray-500">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className=" flex justify-center"></div>

      <div className="flex gap-6 justify-end items-center md:pr-4">
      <div className="relative">
      <Link href="/favorites">
          {" "}
          <span className="absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] w-4 h-4 text-white flex items-center justify-center border">
            {favorites.length}
          </span>
        
            <HiOutlineHeart className="h-6 w-6 text-gray-600" />
          </Link>
        </div>
        <div className="relative">
        <Link href="/cart">
          {" "}
          <span className="absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] w-4 h-4 text-white flex items-center justify-center border">
            {cart.length}
          </span>
         
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
