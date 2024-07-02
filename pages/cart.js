import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight, HiOutlineMinus, HiOutlinePlus, HiOutlineX } from "react-icons/hi";
import { useRouter } from "next/router";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const router = useRouter()

  if (cart.length === 0) {
    return (
      <div className="flex flex-col w-full min-h-screen items-center justify-center">
        <p> Your cart is empty</p>
        <Link href="/">
          <div className="button mt-4">Continue Shopping</div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <div className="max-w-[850px] animate-fade">
        <div className="styleRow max-w-[850px] mb-2">
          <h2 className="text-xl text-gray-500 "><Link href="/" className="hover:text-gray-400">Shop </Link>/ <span className="cursor-pointer hover:text-gray-400" onClick={() => router.back()}>Detail</span> / <strong>Cart</strong></h2>
          <h2 className="flex gap-2">
          {/* <Link href="/">
            <div className="flex items-center button text-white ">View Shop</div>
          </Link> */}
          <Link href="/cart">
            <div className="flex items-center button text-white">Checkout <HiArrowRight className="h-4 w-4 ml-1"/></div>
          </Link>
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {cart.map((product) => (
            <div
              key={product.id}
              className="w-full md:border-2 bg-gray-100 shadow-sm rounded-md grid md:grid-cols-3 p-1"
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
                  onClick={() => removeFromCart(product.id)}
                  className="m-1"
                >
                  <HiOutlineX className="h-6 w-6 p-1 button rounded shadow-sm bg-gray-100" />
                </button>
              </div>
              <div className="flex flex-col justify-between p-2  ">
                <h2 className="font-semibold">{product.title}</h2>
                <h3>{product.description.substring(0, 70)}...</h3>
                <h5 className="pt-2 md:pb-2 text-md">${product.price}</h5>
              </div>
              <div className="styleCol justify-between p-2">
                <div className="styleRow">
                  <div className="flex items-center space-x-2 ">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, product.quantity - 1)
                      }
                      className=""
                    >
                      <HiOutlineMinus className="h-6 w-6 p-1 button" />
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(product.id, product.quantity + 1)
                      }
                      className=" "
                    >
                      <HiOutlinePlus className="h-6 w-6 p-1 button" />
                    </button>
                  </div>
                </div>

                <div className="styleRow ">
                  <h2>
                    Total: ${(product.price * product.quantity).toFixed(2)}
                  </h2>
                  <Link href="/">
                    <div className="button">Buy Now</div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
