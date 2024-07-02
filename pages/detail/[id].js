import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { products } from "./../products.js";
import React, { useEffect, useState } from "react";
import { useCart } from "./../context/CartContext";
import { HiArrowRight, HiHeart, HiOutlineHeart } from "react-icons/hi";

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { cart, favorites, addToCart, updateFavorite } = useCart();
  const product = products.find((item) => item.id === parseInt(id));

  const similarProducts = products.filter((item) => item?.category === product?.category && item.id !== product.id);
  const favoritedProducts = products.filter((item) => favorites.includes(item.id));


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
    event.stopPropagation();
    const isFavorited = favorites.includes(product.id);
    updateFavorite(product.id, !isFavorited);
  };

  useEffect(() => {
    if (showCart) {
      const timer = setTimeout(() => {
        setShowCart(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showCart]);

  console.log("favorites", favorites);
  console.log("isFavorited", isFavorited);


  return (
    <div className="flex">

      {/* Left */}
      <div className="hidden flex-none xl:flex bg-white shadow rounded-md min-w-[200px]">
        <div className="flex flex-col">
      
        {favoritedProducts.length > 0 ?
        <div>
           <h4 className="px-2  font-semibold text-gray-500 text-lg">Favorites</h4>
          {favoritedProducts.map((item) => (
            <div key={item.id} className="flex w-full mb-2 px-2 justify-center">
              <Link href={`/detail/${item.id}`}>
              <div className="relative h-52 w-52">
                <Image
                  src={item.image}
                  alt="fav-image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              </Link>
            </div>
          ))}
          </div>
          :
          <div>
              <h4 className="px-2  font-semibold text-gray-500 text-lg">Similar Products</h4>
          {similarProducts.map((item) => (
            <div key={item.id} className="flex w-full mb-2 px-2 justify-center">
               <Link href={`/detail/${item.id}`}>
              <div className="relative h-52 w-52">
                <Image
                  src={item.image}
                  alt="fav-image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              </Link>
            </div>
          ))}
          </div>
}

        </div>
      </div>
       {/* Mid */}
      <div className="flex flex-col justify-center xl:items-end xl:mx-2 items-center 2xl:gap-2 w-full border-2 bg-gray-100 shadow-sm rounded-md">

        {/* Cart Popflash */}
        <div
          className={`transition-all duration-500 absolute top-14 right-1 bg-gray-100 rounded-md w-48 shadow-lg ${
            showCart ? "opacity-100 z-50" : "opacity-0"
          }`}
        >
          <h2 className="px-2">Added To Cart</h2>
          <div
            key={product.id}
            className="w-full grid gap-2 mb-1 rounded-md px-2 py-1"
          >
            <div>
              <div className="relative w-full md:w-44 h-44">
                <Image
                  alt="cart-flash-image"
                  src={product.image}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-l-md"
                />
              </div>
              <div className="flex flex-col justify-between">
                <h2 className="font-semibold text-sm">{product.title}</h2>
              
                <h5 className="w-full flex justify-between text-xs">
                  <span>{product.category}</span> <span> ${product.price}</span>
                </h5>
              </div>
            </div>
          </div>
        </div>


       {/* Mid-heading */}
        <div className="styleRow p-2 xl:p-4">
          <h2 className="text-xl text-gray-500 ">
            <Link href="/">Shop </Link> / <strong>Detail</strong>
          </h2>
          <h2 className="flex xl:gap-2">
            <Link href="/cart">
              <div className="flex items-center button text-white">
                View Cart
                <HiArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          </h2>
        </div>

          {/* Mid-Main */}
        <div className="md:border-2  md:px-2 md:pt-6 lg:p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative w-full h-80 lg:w-96 lg:h-96 xl:w-full xl:h-auto aspect-square">
              <Image
                src={product.image}
                alt="detail-image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <div className="p-2 md:p-0 flex flex-col justify-between">
              <div className="">
                <div className="flex justify-between items-center">
                  <div>
                  <h1 className="text-2xl">{product.title}</h1>
                  <h2 className="font-semibold text-sm text-gray-500">{product.category}</h2>
                  </div>
                  <button
                    className="hover:bg-gray-300 rounded-full p-2 transition duration-500 ease-out"
                    onClick={(event) => handleFavoriteClick(event, product.id)}
                  >
                    {favorites.includes(product.id) ? (
                      <HiHeart className="h-8 w-8 text-red-500" />
                    ) : (
                      <HiOutlineHeart className="h-8 w-8 text-red-500" />
                    )}
                  </button>
                </div>
                <p className="pt-4 text-auto 2xl:text-2xl">{product.description}</p>
                <p className="py-4  2xl:text-2xl text-gray-500 font-semibold">{product.quantity > 0 ? "In stock" : "Preorder"}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <h2 className="flex text-xl">${product.price}</h2>
                <button onClick={handleAddToCart} className="flex button">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Mid-bottom */}
        <div className="md:border-2 w-full bg-gray-100 shadow-sm rounded-md lg:p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 lg:gap-6">
            <div className="relative w-36 lg:w-40 h-36 xl:w-full">
              <Image
                src={product.image}
                alt="detail-image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <div className="relative w-36 lg:w-40 h-36 xl:w-full">
              <Image
                src={product.image}
                alt="detail-image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <div className="relative w-36 lg:w-40 h-36 xl:w-full">
              <Image
                src={product.image}
                alt="detail-image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <div className="relative w-36 lg:w-40 h-36 xl:w-full">
              <Image
                src={product.image}
                alt="detail-image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <div className="relative w-36 lg:w-40 h-36 xl:w-full">
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
      <div className="hidden flex-none xl:flex bg-white shadow rounded-md min-w-[200px]">
        
        {cart.length > 0 ?
        <div className="flex flex-col">
        <h4 className="px-2  font-semibold text-gray-500 text-lg">Cart</h4>
          {cart.map((item) => (
            <div key={item.id} className="grid  gap-2 w-full px-2 mb-2 justify-center">
                 <Link href={`/cart`}>
              <div className="relative h-52 w-52">
                <Image
                  src={item.image}
                  alt="fav-image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              </Link>
            </div>
          ))}
        </div>
        :
        <div className="flex flex-col">
        <h4 className="  px-2  font-semibold text-gray-500 text-lg">Cart</h4>
        <div className="flex min-w-[200px] h-80 items-center justify-center">Cart is empty</div>
        </div>
}
      </div>
    </div>
  );
}

export default Detail;
