import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { products } from "../../data/products.js";
import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.js";
import {
  HiArrowRight,
  HiClipboardCheck,
  HiHeart,
  HiOutlineEye,
  HiOutlineHeart,
  HiShoppingCart,
} from "react-icons/hi";

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { cart, favorites, option, addToCart, updateFavorite, updateOption} = useCart();
  const product = products.find((item) => item.id === parseInt(id));

  const isFavorited = favorites.includes(parseInt(id));
  const [showCart, setShowCart] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setShowCart(true);
  };

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isFavorited = favorites.includes(product.id);
    updateFavorite(product.id, !isFavorited);
  };

  console.log("favorites", favorites);
  console.log("isFavorited", isFavorited);


  

  return (
    <div className="flex">
 
      {/* Mid */}
      <div className="flex flex-col  xl:items-end xl:mx-2 items-center 2xl:gap-2 w-full border-2 bg-white shadow-sm rounded-md">

        {/* Mid-heading */}
        {/* <div className="styleRow p-2 xl:p-4">
          <h2 className="text-xl text-gray-500 ">
            <Link href="/" className="hover:text-gray-400">Shop </Link> / <strong>Detail</strong>
          </h2>
          <h2 className="flex xl:gap-2">
            <Link href="/cart">
              <div className="flex items-center button text-white">
                View Cart
                <HiArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          </h2>
        </div> */}

        {/* Mid-Main */}
        <div className="md:px-2 md:pt-6 lg:p-4">
          <div className="grid md:grid-cols-2 gap-4 animate-fade">
            <div className="relative w-full lg:w-96 lg:h-96 xl:w-full xl:h-auto aspect-square">
              <Image
                src={product.image}
                alt="detail-image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md "
              />
            </div>
            <div className="p-2 md:p-0 flex flex-col justify-between">
              <div className="">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl">{product.title}</h1>
                    <h2 className="font-semibold text-md text-gray-500">
                      {product.category}
                    </h2>
                  </div>
                  <button
                    className="hover:bg-gray-200 rounded-full p-2 transition duration-500 ease-out"
                    onClick={(event) => handleFavoriteClick(event, product.id)}
                  >
                    {favorites.includes(product.id) ? (
                      <HiHeart className="h-8 w-8 text-red-500" />
                    ) : (
                      <HiOutlineHeart className="h-8 w-8 text-red-500" />
                    )}
                  </button>
                </div>
                <p className="py-2 text-auto 2xl:text-2xl">
                  {product.description}
                </p>
              </div>

              <div className="flex gap-4 py-5">
              <button
        value="Option A"
        className={`button rounded-full border-2 ${option === "Option A" ? "bg-indigo-500 text-white" : "bg-white"} bg-white`}
        onClick={() => updateOption(product.id, "Option A")}
      >
        Option A
      </button>
      <button
        value="Option B"
        className={`button rounded-full border-2 ${option === "Option B" ? "bg-indigo-500 text-white" : "bg-white"} bg-white`}
        onClick={() => updateOption(product.id,"Option B")}
      >
        Option B
      </button>
      <button
        value="Option C"
        className={`button rounded-full border-2 ${option === "Option C" ? "bg-indigo-500 text-white" : "bg-white"} bg-white`}
        onClick={() => updateOption(product.id,"Option C")}
      >
        Option C
      </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-md text-gray-500 font-semibold">
                    {product.quantity > 0 ? "In Stock" : "Preorder"}
                  </p>
                  <h2 className="flex text-2xl">${product.price}</h2>
                </div>
                <button onClick={handleAddToCart} className="flex button">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Mid-bottom */}
        <div className="w-full bg-white shadow-sm rounded-md lg:p-4 lg:pt-0 flex justify-evenly lg:justify-between animate-fade">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2 py-4 xl:py-0 lg:gap-16 xl:gap-6">

            <div className="relative w-36 aspect-square hover:opacity-95 cursor-pointer">
              <Image
                src={product.image}
                alt="detail-image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <div className="relative w-36 aspect-square hover:opacity-95 cursor-pointer">
              <Image
                src={product.image}
                alt="detail-image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <div className="relative w-36 aspect-square hover:opacity-95 cursor-pointer">
              <Image
                src={product.image}
                alt="detail-image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <div className="relative w-36 aspect-square hover:opacity-95 cursor-pointer">
              <Image
                src={product.image}
                alt="detail-image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <div className="relative w-36 aspect-square hover:opacity-95 cursor-pointer">
              <Image
                src={product.image}
                alt="detail-image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="hidden flex-none xl:flex bg-gray-100 shadow rounded-md min-w-[220px]">
        {cart.length > 0 ? (
          <div className="flex flex-col">
            <div className="flex items-center p-2 font-semibold text-gray-500 text-lg">
              <HiShoppingCart />
              <h4>Cart</h4>
            </div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid gap-2 w-full px-2 pb-8 justify-center"
              >
                <Link href={`/cart`}>
                  <div className="relative h-52 w-52 hover:opacity-95">
                    <Image
                      src={item.image}
                      alt="fav-image"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-md animate-fade"
                    />
                  </div>
                  <div className="absolute text-gray-500">
                    {item.title}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <h4 className="  px-2  font-semibold text-gray-500 text-lg">
              Cart
            </h4>
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
