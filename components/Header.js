import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  HiHeart,
  HiHome,
  HiInformationCircle,
  HiMail,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineMail,
  HiOutlineShoppingCart,
  HiShoppingCart,
} from "react-icons/hi";
import Auth from "./Auth";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/router";

function Header() {
  const { cart, favorites } = useCart();

  const [flashFav, setFlashFav] = useState(false);
  const [flashCart, setFlashCart] = useState(false);

  const router = useRouter() 
  const route = router.asPath

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
          <div className="relative h-8 w-8 4xl:h-10 4xl:w-10 md:mx-3 4xl:mx-4 active:scale-95 transition duration-150 ease-out">
            {" "}
            <Image
              src="/favicon.ico"
              alt="logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
        <ul className="flex gap-4 items-center">
          <li className="hidden md:inline-flex text-gray-600 hover:text-gray-500 active:scale-95 transition duration-150 ease-out">
            <Link className="flex items-center" href="/">
            { route === "/" ? <HiHome className="h-6 w-6 4xl:h-8 4xl:w-8 " />:

              <HiOutlineHome className="h-6 w-6 4xl:h-8 4xl:w-8 " />}
              <span className="hidden md:flex">Shop</span>{" "}
            </Link>
          </li>
          <li className="text-gray-600 hover:text-gray-500 active:scale-95 transition duration-150 ease-out">
            <Link className="flex items-center" href="/about">
            { route === "/about" ?            <HiInformationCircle className="h-6 w-6 4xl:h-8 4xl:w-8  " />
           :   <HiOutlineInformationCircle className="h-6 w-6 4xl:h-8 4xl:w-8  " />}
              <span className="hidden md:flex">About</span>{" "}
            </Link>
          </li>
          <li className="text-gray-600 hover:text-gray-500 active:scale-95 transition duration-150 ease-out">
            <Link className="flex items-center" href="/contact">
            { route === "/contact" ?
             <HiMail className="h-6 w-6 4xl:h-8 4xl:w-8 " /> :
              <HiOutlineMail className="h-6 w-6 4xl:h-8 4xl:w-8 " />}
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
                  ? "w-4 h-4 4xl:w-5 4xl:h-5 transition duration-500 scale-150 ease-out absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] 4xl:text-[14px] text-white flex items-center justify-center border"
                  : "w-4 h-4 4xl:w-5 4xl:h-5 transition duration-500 scale-100 ease-out absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] 4xl:text-[14px] text-white flex items-center justify-center border"
              }
            >
              {favorites.length}
            </span>
            { route === "/favorites" ? <HiHeart className="h-6 w-6 4xl:h-8 4xl:w-8   text-gray-600 active:scale-125 transition duration-500 ease-out hover:text-gray-500" />
           : <HiOutlineHeart className="h-6 w-6 4xl:h-8 4xl:w-8   text-gray-600 active:scale-125 transition duration-500 ease-out hover:text-gray-500" />}
         
            </Link>
        </div>
        <div className="relative">
          <Link href="/cart">
            {" "}
            <span
              className={
                flashCart
                  ? "w-4 h-4 4xl:w-5 4xl:h-5 transition duration-500 scale-150 ease-out absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] 4xl:text-[14px] text-white flex items-center justify-center border"
                  : "w-4 h-4 4xl:w-5 4xl:h-5 transition duration-500 scale-100 ease-out absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] 4xl:text-[14px] text-white flex items-center justify-center border"
              }
            >
              {cart.length}
            </span>
            { route === "/cart" ?
            <HiShoppingCart className="h-6 w-6 4xl:h-8 4xl:w-8   text-gray-600 active:scale-125 transition duration-500 ease-out hover:text-gray-500" />
            :<HiOutlineShoppingCart className="h-6 w-6 4xl:h-8 4xl:w-8   text-gray-600 active:scale-125 transition duration-500 ease-out hover:text-gray-500" />
            }
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
