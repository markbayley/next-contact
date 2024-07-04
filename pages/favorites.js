import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import {
  HiArrowLeft,
  HiArrowRight,
  HiHeart,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineX,
} from "react-icons/hi";
import { useRouter } from "next/router";
import { products } from "../data/products.js";

const Favorites = () => {
  const { removeFromFavorites, favorites, addToCart, setOption } = useCart();

  const router = useRouter();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col w-full min-h-screen items-center justify-center">
        <p> No favorites selected</p>
        <Link href="/">
          <div className="button mt-4 text-white">Continue Shopping</div>
        </Link>
      </div>
    );
  }
  console.log("favorites", favorites)

  return (
    <div className="flex justify-center w-full pt-2">
      <div className="max-w-[850px] animate-fade">
        <div className="styleRow max-w-[850px] mb-2 px-2 lg:px-0">
          <h2 className="text-lg text-gray-500 ">
            <Link href="/" className="hover:text-gray-400">
              Shop{" "}
            </Link>
            /{" "}
            <span
              className="cursor-pointer hover:text-gray-400"
              onClick={() => router.back()}
            >
              Detail
            </span>{" "}
            / <strong>Favorites</strong>
          </h2>
          <h2 className="flex gap-2">
            {/* <Link href="/">
            <div className="flex items-center button text-white ">View Shop</div>
          </Link> */}
            <Link href="/cart">
              <div className="flex items-center button text-white">
                Checkout <HiArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="w-full md:border-2 bg-gray-100 shadow-sm rounded-md grid md:grid-cols-3 p-1"
              onClick={() => setOption("")}
            >
              <div className="relative w-full h-40">
                <Link href={`/detail/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-l-md"
                  />
                </Link>
                <button
                  onClick={() => removeFromFavorites(product.id)}
                  className="m-1"
                >
                  <HiOutlineX className="h-6 w-6 p-1 button rounded shadow-sm bg-gray-100" />
                </button>
              </div>
              <div className="flex flex-col justify-between p-2  ">
                <h2 className="font-semibold">  {product.title + " (" + product.option + ") "}</h2>
                <h3>{product?.description?.substring(0, 70)}...</h3>
                <h5 className="pt-2 md:pb-2 text-md">${product.price}</h5>
              </div>
              <div className="styleCol justify-between p-2">
                <div className="styleRow ">
                  {" "}
                  <h2></h2>
                  <HiHeart className=" h-7 w-7 z-50 text-red-500" />
                </div>

                <div className="styleRow ">
                  <h2></h2>
                  { product.option !== undefined ?
                  <Link href="/cart">
                    <div onClick={() => addToCart(product)} className="button text-white">Add To Cart</div>
                  </Link>
                  :
                  <Link href={`/detail/${product.id}`}>
                  <div  className="button text-white">Select Option</div>
                </Link>

}
                </div>
              </div>
            </div> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
