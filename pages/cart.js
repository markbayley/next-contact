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
    <div className="flex justify-center w-full pt-2 text-md 4xl:text-2xl">
      <div className="max-w-[850px] animate-fade">
        <div className="styleRow max-w-[850px] mb-2 px-2 lg:px-0 text-md 3xl:text-xl 4xl:text-2xl">
          <h2 className=" text-gray-500 ">
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
              <div className="flex items-center button rounded-full text-white text-md 3xl:text-xl 4xl:text-2xl px-4">
                Checkout <HiArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          </h2>
        </div>
        <div className="flex flex-col gap-4 ">
          {cart.map((product) => (
            <div
              key={product.id + product.option}
              className="w-full md:border-2 bg-gray-100 shadow-sm rounded-md grid md:grid-cols-2 p-1"
            >
              {/* leftSide */}
              <div className="">
                <div className="relative w-full h-40 4xl:h-60">
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
                    onClick={() => removeFromCart(product)}
                    className="m-1"
                  >
                    <HiOutlineX className="h-6 w-6 4xl:h-8 4xl:w-8 p-1 button rounded shadow-sm bg-gray-200" />
                  </button>
                </div>
              </div>

              {/* rightSide */}

              <div className="flex flex-col justify-between px-2  ">
                <div className="styelCol md:styleRow">
                  <h2 className="font-semibold py-2">
                    {product.title}{" "}<span className="whitespace-nowrap">{" (" + product.option + ") "}</span>
                  </h2>
                
                </div>

                {/* <h3 className="py-2">
                  {product.description.substring(0, 70)}...
                </h3> */}

                <div className="styleRow py-2">
                  {" "}
                  <h5 className="text-md">${product.price}</h5>
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
                  <h2>
                    Total: ${(product.price * product.quantity).toFixed(2)}
                  </h2>
                </div>

                <div className="styleRow py-2 font-semibold">
                  <span className="text-red-600">
                    {product.category === "Health & Beauty"
                      ? "Save 10%"
                      : product.category === "Home Decor"
                      ? "Save 15%"
                      : product.category === "Skin Care"
                      ? "Save 19%"
                      : "Save 24%"}
                     <div className="font-semibold text-md 4xl:text-xl text-gray-500">
                    { product.category}
                  </div>
                  </span>
                  <Link href="/">
                    <div className="button font-normal text-md 4xl:text-2xl  text-white">Buy Item</div>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-3 bg-white rounded-md items-center p-4">
            <div className=" font-semibold text-md text-md 4xl:text-2xl">
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
                <h3 className="md:pl-3 text-center text-md 4xl:text-2xl">${getTotalPrice().toFixed(2)}</h3>
            </div>

            <div className="flex items-center w-full justify-end   ">
            

              <Link href="/cart">
                <div className="flex items-center button text-md 4xl:text-2xl  text-white">
                  Buy All 
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
