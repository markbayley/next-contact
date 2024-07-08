import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiHeart, HiOutlineX } from "react-icons/hi";
import { useRouter } from "next/router";

const Favorites = () => {
  const {
    cart,
    removeFromFavorites,
    favorites,
    addToCart,
    setOption,
    transferToCart,
  } = useCart();

  const router = useRouter();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col w-full min-h-screen items-center justify-center">
        <p>No favorites selected</p>
        <Link href="/">
          <div className="button mt-4 text-white">Continue Shopping</div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full pt-2">
      <div className="max-w-[850px] animate-fade">
        <div className="styleRow max-w-[850px] mb-2 px-2 lg:px-0">
          <h2 className="text-lg text-gray-500">
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
            / <strong>Favs</strong>
          </h2>
          <h2 className="flex gap-2">
            <Link href="/cart">
              <div className="flex items-center button rounded-full text-white">
                View Cart <HiArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {favorites.map((product) => {
            const isAdded = cart.some(
              (cartItem) =>
                cartItem.id === product.id && cartItem.option === product.option
            );

            return (
              <div
                key={product.id + product.option}
                className="w-full md:border-2 bg-gray-100 shadow-sm rounded-md grid md:grid-cols-2 p-1"
                onClick={() => setOption(product.option)}
              >
                <div className="relative w-full h-40">
                  <Link href={`/detail/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-l-md active:scale-95 transition duration-150 ease-out"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromFavorites(product)}
                    className="m-1"
                  >
                    <HiOutlineX className="h-6 w-6 p-1 button rounded shadow-sm bg-gray-100" />
                  </button>
                </div>
                <div className="flex flex-col justify-between p-2">
                  <h2 className="font-semibold">
                    {product.title}{" "}
                    <span className="whitespace-nowrap">
                      {" (" + product.option + ") "}
                    </span>
                  </h2>
                  {/* <h3>{product?.description?.substring(0, 70)}...</h3> */}
                  <div className="flex w-full justify-end md:justify-start items-center py-2">
                    <h5 className="text-md">${product.price}</h5>
                  </div>

                  <div className="flex  w-full justify-between items-end py-2">
                    <span className="text-red-600  font-semibold">
                      {product.category === "Health & Beauty"
                        ? "Save 10%"
                        : product.category === "Home Decor"
                        ? "Save 15%"
                        : product.category === "Skin Care"
                        ? "Save 19%"
                        : "Save 24%"}
                      <div className="font-semibold text-md 4xl:text-lg text-gray-500">
                        {product.category}
                      </div>
                    </span>
                    <div className="">
                      {product.option && product.option !== "" ? (
                        isAdded ? (
                          <div className="button bg-gray-200 text-black">
                            Item In Cart
                          </div>
                        ) : (
                          // <Link href="/cart">
                          <div
                            onClick={() => transferToCart(product)}
                            className="button text-white"
                          >
                            Add To Cart
                          </div>
                          // </Link>
                        )
                      ) : (
                        <Link href={`/detail/${product.id}`}>
                          <div className="button text-amber-500 font-medium bg-white ring-2 ring-amber-500">
                            Select Option
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
