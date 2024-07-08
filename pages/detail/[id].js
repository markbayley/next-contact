import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.js";
import {
  HiArrowRight,
  HiHeart,
  HiOutlineHeart,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiShoppingCart,
} from "react-icons/hi";

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const {
    cart,
    favorites,
    option,
    error,
    addToCart,
    handleFavoriteClick,
    updateOption,
    setOption,
    products,
    removeFromFavorites,
    updateQuantity
  } = useCart();
  const product = products.find((item) => item.id === parseInt(id));
  const isAdded = cart.some(
    (item) => item.id === product.id && item.option === option
  );

  const isFavorited = favorites.find((item) => item.id === product.id);

  const isOption = favorites.some((item) => item.option === option);

  const similarProducts = products.filter(
    (item) => item?.category === product?.category && item.id !== product.id
  );

  const [selectedImage, setSelectedImage] = useState([product?.image, 0]);

  if (!product) {
    return (
      <div className="flex flex-col w-full min-h-screen items-center justify-center">
        <p> No product selected</p>
        <Link href="/">
          <div className="button mt-4 text-white">Continue Shopping</div>
        </Link>
      </div>
    );
  }

  console.log("productID", product);

  console.log("isFavorited", isFavorited);

  return (
    <div className="flex ">
      {/* Mid */}
      <div className="flex flex-col  xl:items-end  items-center 2xl:gap-2 w-full border-2 bg-white shadow-sm rounded-md">
        {/* Mid-heading */}
        <div className="flex lg:hidden styleRow p-1 lg:px-4 border-b  3xl:text-xl 4xl:text-2xl">
          <h2 className=" text-gray-500 ">
            <Link href="/" className="hover:text-gray-400">
              Shop{" "}
            </Link>{" "}
            / <strong>Detail</strong>
          </h2>
          <h2 className="flex xl:gap-2">
            <Link href="/cart">
              <div className="flex items-center button rounded-full px-5 text-white  3xl:text-xl 4xl:text-2xl">
              <HiShoppingCart className="h-4 w-4 ml-1" />
                View Cart
               
              </div>
            </Link>
          </h2>
        </div>

        {/* Mid-Main */}
        <div className="px-1 md:py-6 lg:p-4 ">
          <div className="grid md:grid-cols-2 gap-4 animate-fade ">
            {/* left side */}
            <div>
              <div className="relative w-full xl:w-full xl:max-h-[70vh] aspect-square">
                <Image
                  src={selectedImage[0]}
                  alt="detail-image"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
              </div>

              <div className="w-full bg-white shadow-sm rounded-md lg:pt-0 flex justify-evenly lg:justify-between animate-fade">
                <div className="grid grid-cols-5 gap-4 pt-4 w-full">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage([product.image, i])}
                      className={`${
                        i === selectedImage[1]
                          ? "ring-2 ring-amber-500 rounded-md"
                          : ""
                      } relative aspect-square hover:opacity-95 cursor-pointer active:scale-95 transition duration-200 ease-out`}
                    >
                      <Image
                        src={product.image}
                        alt="detail-image"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-1 md:p-0 flex flex-col justify-between 3xl:px-6 max-h-[1000px]">
              <div className="">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl 3xl:text-3xl">
                      {product.title} 
                    </h1>
                    <h2 className="font-semibold text-md 3xl:text-2xl text-gray-500">
                      {product?.category}
                    </h2>
                  </div>
                  {option === "" ? (
                    <button className="hover:bg-gray-200 rounded-full p-2 active:scale-95 transition duration-200 ease-out">
                      <HiOutlineHeart className="h-8 w-8 3xl:h-10 3xl:w-10 4xl:h-12 4xl:w-12 text-gray-500 " />
                    </button>
                  ) : (
                    <button className="hover:bg-gray-200 rounded-full p-2 active:scale-95 transition duration-200 ease-out">
                      {isFavorited ? (
                        <HiHeart
                          onClick={() => removeFromFavorites(product)}
                          className="h-8 w-8 3xl:h-10 3xl:w-10 4xl:h-12 4xl:w-12 text-red-500 "
                        />
                      ) : (
                        <HiOutlineHeart
                          onClick={(event) =>
                            handleFavoriteClick(event, product)
                          }
                          className="h-8 w-8 3xl:h-10 3xl:w-10 4xl:h-12 4xl:w-12 text-red-500 "
                        />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div>
                <p className="py-2 xl:text-xl 2xl:text-2xl 3xl:text-3xl 3xl:leading-10 4xl:text-4xl">
                  {product.description}
                </p>
              </div>

              <div className="">
                <h4
                  className={
                    error !== ""
                      ? "text-md 3xl:text-2xl text-red-500 font-semibold"
                      : "text-md 3xl:text-2xl text-gray-500 font-semibold"
                  }
                >
                  Select an option
                </h4>
                <div className="flex gap-4 py-2 3xl:text-xl 4xl:text-2xl">
                  <button
                    value="Option A"
                    className={`button rounded-full border-2 4xl:py-3 ${
                      option === "Option A"
                        ? "bg-indigo-500 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => updateOption(product.id, "Option A")}
                  >
                    Option A
                  </button>
                  <button
                    value="Option B"
                    className={`button rounded-full border-2 4xl:py-3 ${
                      option === "Option B"
                        ? "bg-indigo-500 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => updateOption(product.id, "Option B")}
                  >
                    Option B
                  </button>
                  <button
                    value="Option C"
                    className={`button rounded-full border-2 4xl:py-3 ${
                      option === "Option C"
                        ? "bg-indigo-500 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => updateOption(product.id, "Option C")}
                  >
                    Option C
                  </button>
                </div>
              </div>

          

              <div className="flex justify-between items-end py-2 md:pb-0">
                <div>
                  <p className="text-md 3xl:text-2xl text-gray-500 font-semibold">
                    {product.quantity > 0 ? "In Stock" : "In Stock"}
                  </p>
                  <h2 className="flex text-xl 3xl:text-3xl">
                    ${product.price}
                  </h2>
                </div>
                <div className="flex gap-1">
                  {isFavorited && isOption ? (
                    <button className="flex button bg-gray-200 3xl:text-xl 4xl:text-2xl 4xl:py-3">
                      {error ? "Select Option" : "Item Favorited"}
                    </button>
                  ) : (
                    <button
                      onClick={(event) => handleFavoriteClick(event, product)}
                      className="flex button 3xl:text-xl 4xl:text-2xl text-white 4xl:py-3"
                    >
                      {isFavorited ? "Update Favorite" : "Add Favorite"}
                    </button>
                  )}

                  <button
                    onClick={() => addToCart(product)}
                    className={
                      isAdded
                        ? "flex button bg-gray-200 3xl:text-xl 4xl:text-2xl 4xl:py-3"
                        : "flex button 3xl:text-xl 4xl:text-2xl 4xl:py-3 text-white"
                    }
                  >
                    {isAdded ? "Item In Cart" : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full border-t p-4 text-xl 3xl:text-3xl">
          <h2 className="">Similar Items</h2>
        </div>

        <div className="flex w-full px-2 ">
          {similarProducts?.map((item) => (
            <div key={item.id + item.option} className="grid px-2 pb-4 ">
              <div
                onClick={() => {
                  setOption(item.option), setSelectedImage([item.image, 0]);
                }}
                className={
                  item.id === product.id && item.option === option
                    ? "relative max-w-80 aspect-square hover:opacity-95 ring-2 ring-amber-500 rounded-md"
                    : "relative max-w-80 aspect-square hover:opacity-95  "
                }
              >
                <Link href={`/detail/${item.id}`}>
                  <Image
                    src={item.image}
                    alt="fav-image"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-md animate-fade active:scale-95 transition duration-150 ease-out"
                  />
                </Link>
              </div>

              <div
                className={
                  item.id === product.id && item.option === option
                    ? " text-md 3xl:text-lg text-gray-700 min-w-52"
                    : " text-md 3xl:text-lg text-gray-500 min-w-52"
                }
              >
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="hidden lg:grid w-full bg-gray-100 shadow rounded-md max-w-[20vw]">
        {cart.length > 0 ? (
          <div>
            <Link
              href="/cart"
              className="flex items-center px-6 py-2 m-2 text-white text-md 3xl:text-xl 4xl:text-2xl 4xl:py-3 border-2 bg-amber-500 rounded-full w-fit"
            >
              <HiShoppingCart />
              <h4>View Cart</h4>
            </Link>

            {cart.map((item) => (
              <div
                key={item.id + item.option}
                className="grid w-full px-2 pb-4"
              >
                <div
                  onClick={() => {
                    setOption(item.option), setSelectedImage([item.image, 0]);
                  }}
                  className={
                    item.id === product.id && item.option === option
                      ? "relative aspect-square hover:opacity-95 ring-2 ring-amber-500 rounded-md active:scale-95 transition duration-150 ease-out"
                      : "relative aspect-square hover:opacity-95  active:scale-95 transition duration-150 ease-out"
                  }
                >
                  <Link href={`/detail/${item.id}`}>
                    <Image
                      src={item.image}
                      alt="fav-image"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-md animate-fade "
                    />
                  </Link>
                </div>

                <div
                  className={
                    item.id === product.id && item.option === option
                      ? " text-md 3xl:text-2xl text-gray-700"
                      : " text-md 3xl:text-2xl text-gray-500"
                  }
                >
                  {item.title + " (" + item.option + ") "}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <h4 className="px-2 font-semibold text-gray-500 text-lg">Cart</h4>
            <div className="flex min-w-[200px] h-80 items-center justify-center">
              Cart is empty
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
