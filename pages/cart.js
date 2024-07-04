import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineX,
} from "react-icons/hi";
import { useRouter } from "next/router";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col w-full min-h-screen items-center justify-center">
        <p> Your cart is empty</p>
        <Link href="/">
          <div className="button mt-4 text-white">Continue Shopping</div>
        </Link>
      </div>
    );
  }

  console.log("cart", cart);

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
            / <strong>Cart</strong>
          </h2>
          <h2 className="flex gap-2">
            <Link href="/cart">
              <div className="flex items-center button text-white">
                Checkout <HiArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {cart.map((product) => (
            <div
              key={product.id+product.option}
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
                  onClick={() => removeFromCart(product)}
                  className="m-1"
                >
                  <HiOutlineX className="h-6 w-6 p-1 button rounded shadow-sm bg-gray-200" />
                </button>
              </div>
              <div className="flex flex-col justify-between p-2  ">
                <h2 className="font-semibold">
                  {product.title + " (" + product?.option + ") "}
                </h2>
                <h3>{product.description.substring(0, 70)}...</h3>
                <h5 className="pt-2 md:pb-2 text-md">${product.price}</h5>
              </div>
              <div className="styleCol justify-between p-2">
                <div className="styleRow">
                  <div className="flex items-center space-x-2 ">
                    <button
                      onClick={() =>
                        updateQuantity(product, product.quantity - 1)
                      }
                      className=""
                    >
                      <HiOutlineMinus className="h-6 w-6 p-1 button bg-indigo-500 text-white" />
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(product, product.quantity + 1)
                      }
                      className=" "
                    >
                      <HiOutlinePlus className="h-6 w-6 p-1 button bg-indigo-500 text-white" />
                    </button>
                  </div>
                </div>

                <div className="styleRow ">
                  <h2>
                    Total: ${(product.price * product.quantity).toFixed(2)}
                  </h2>
                  <Link href="/">
                    <div className="button text-white">Buy Item</div>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="grid md:grid-cols-3 bg-white rounded-md items-center p-4">
            <div className=" font-semibold">
              {" "}
              <h2>Cart Total</h2>
            </div>
            <div>
              {" "}
              {/* <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.title} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul> */}
            </div>

            <div className="flex items-center w-full justify-between font-semibold  ">
              <h3 className="md:pl-3">Total: ${getTotalPrice().toFixed(2)}</h3> 
             
            <Link href="/cart">
              <div className="flex items-center button text-white">
                Buy All <HiArrowRight className="h-4 w-4 " />
              </div>
            </Link>
      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
