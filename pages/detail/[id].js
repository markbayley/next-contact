import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { products } from "./../products.js";
import React, { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { useCart } from "./../context/CartContext";

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart, updateQuantity } = useCart();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    //router.push("/cart");
    //updateQuantity(product.id, product.quantity + 1)
    setShowCart(true);
  };

  useEffect(() => {
    if (showCart) {
      const timer = setTimeout(() => {
        setShowCart(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showCart]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <div
        className={`transition-all duration-500 absolute top-14 right-1 bg-gray-100 rounded-md w-48 shadow-lg   ${
          showCart ? "opacity-100 z-50" : "opacity-0"
        }`}
      >
        <h2 className="px-2">Added To Cart </h2>
        {/* {cart.map((product) => ( */}
        <div
          key={product.id}
          className="w-full grid gap-2 mb-1 rounded-md px-2 py-1"
        >
          <div>
            <div className="relative w-full md:w-44 h-44">
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-l-md"
              />
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="font-semibold text-sm">{product.title}</h2>
              {/* <h3>{product.description.substring(0, 70)}...</h3> */}
              <h5 className="w-full flex justify-between text-xs">
                <span>{product.category}</span> <span> ${product.price}</span>
              </h5>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>

      <div className="styleRow max-w-[850px]">
      <h2 className="text-2xl text-gray-400 font-semibold">Detail</h2>
        <Link href="/">
          <div className="button text-white ">View Shop</div>
        </Link>
        <Link href="/cart">
          <div className="button text-white">View Cart</div>
        </Link>
      </div>

      <div className="md:border-2 max-w-[850px] bg-gray-100 shadow-sm rounded-md md:p-6 ">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative w-full h-80 lg:w-full lg:h-96">
            <Image
              src={product.image}
              alt="detail-image"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
          <div className="p-2 flex flex-col justify-between">
            <div>
              <div className="flex justify-between">
                <h1 className="text-2xl">{product.title}</h1>
                {/* <Link href="/">
                  <HiOutlineX className="h-6 w-6 p-1  button rounded shadow-sm bg-gray-200" />
                </Link> */}
              </div>
              <p className="py-4">{product.description}</p>
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

      <div className="md:border-2 max-w-[850px] bg-gray-100 shadow-sm rounded-md lg:p-4 ">
        <div className="grid md:grid-cols-5 gap-6 ">
          <div className="relative w-80 h-80  md:w-36 md:h-36">
            <Image
              src={product.image}
              alt="detail-image"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
          <div className="relative  w-80 h-80 md:w-36 md:h-36">
            <Image
              src={product.image}
              alt="detail-image"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
          <div className="relative  w-80 h-80 md:w-36 md:h-36">
            <Image
              src={product.image}
              alt="detail-image"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
          <div className="relative  w-80 h-80 md:w-36 md:h-36">
            <Image
              src={product.image}
              alt="detail-image"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
          <div className="relative  w-80 h-80  md:w-36 md:h-36">
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
  );
}

export default Detail;
