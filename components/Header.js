import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineMail,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import Auth from "./Auth";
import { useCart } from "../context/CartContext";
import Image from "next/image";

function Header() {
  const { cart, favorites } = useCart();

  const [flashFav, setFlashFav] = useState(false);
  const [flashCart, setFlashCart] = useState(false);

  useEffect(() => {
    if (favorites.length > 0) {
      setFlashFav(true);
      const timeoutIdFav = setTimeout(() => {
        setFlashFav(false);
      }, 500);

      return () => clearTimeout(timeoutIdFav);
    }
  }, [favorites.length, favorites]);

  useEffect(() => {
    if (cart.length > 0) {
      setFlashCart(true);
      const timeoutIdCart = setTimeout(() => {
        setFlashCart(false);
      }, 500);

      return () => clearTimeout(timeoutIdCart);
    }
  }, [cart.length]);

  return (
    <div className="sticky top-0 grid grid-cols-3 items-center p-3 z-50 bg-gray-100 shadow-sm">
      <div className="flex gap-4">
        <Link href="/">
          <div className="relative h-7 w-7 md:pl-3 active:scale-95 transition duration-150 ease-out">
            {" "}
            <Image
              src="/favicon.ico"
              alt="logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
        <ul className="flex gap-4 pt-[2px]">
          <li className="hidden md:flex text-gray-600 hover:text-gray-500 active:scale-95 transition duration-150 ease-out">
            <Link className="flex" href="/">
              <HiOutlineHome className="h-6 w-6 " />
              <span className="hidden md:flex">Home</span>{" "}
            </Link>
          </li>
          <li className="text-gray-600 hover:text-gray-500 active:scale-95 transition duration-150 ease-out">
            <Link className="flex" href="/about">
              <HiOutlineInformationCircle className="h-6 w-6 " />
              <span className="hidden md:flex">About</span>{" "}
            </Link>
          </li>
          <li className="text-gray-600 hover:text-gray-500 active:scale-95 transition duration-150 ease-out">
            <Link className="flex" href="/contact">
              <HiOutlineMail className="h-6 w-6 " />
              <span className="hidden md:flex">Contact</span>{" "}
            </Link>
          </li>
        </ul>
      </div>
      <div className=" flex justify-center"></div>

      <div className="flex gap-6 justify-end items-center md:pr-4">
        <div className="relative">
          <Link href="/favorites">
            {" "}
            <span
              className={
                flashFav
                  ? "w-4 h-4 transition duration-500 scale-150 ease-out absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] text-white flex items-center justify-center border"
                  : "w-4 h-4 transition duration-500 scale-100 ease-out absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] text-white flex items-center justify-center border"
              }
            >
              {favorites.length}
            </span>
            <HiOutlineHeart className="h-6 w-6 text-gray-600 active:scale-125 transition duration-500 ease-out hover:text-gray-500" />
          </Link>
        </div>
        <div className="relative">
          <Link href="/cart">
            {" "}
            <span
              className={
                flashCart
                  ? "w-4 h-4 transition duration-500 scale-150 ease-out absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] text-white flex items-center justify-center border"
                  : "w-4 h-4 transition duration-500 scale-100 ease-out absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] text-white flex items-center justify-center border"
              }
            >
              {cart.length}
            </span>
            <HiOutlineShoppingCart className="h-6 w-6 text-gray-600 active:scale-125 transition duration-500 ease-out hover:text-gray-500" />
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
