import React from "react";
import { useCart } from "./context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineX } from "react-icons/hi";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

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
      <div className="max-w-[850px]">
      <h2 className="text-2xl pb-4">Cart</h2>
      <div className="flex flex-col gap-4">
        {cart.map((product) => (
          <div
            key={product.id}
            className="w-full md:border-2 bg-gray-100 shadow-sm rounded-md grid md:grid-cols-3"
          >
            <div className="relative w-full md:w-40 h-40">
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-l-md"
              />
            </div>
            <div className="flex flex-col justify-between p-2">
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

                <button onClick={() => removeFromCart(product.id)} className="">
                  <HiOutlineX className="h-6 w-6 p-1 button rounded shadow-sm bg-gray-200" />
                </button>
              </div>

              <div className="styleRow ">
                <h2>Total: ${(product.price * product.quantity).toFixed(2)}</h2>
                <Link href="/">
                  <div className="button">Buy Now</div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="styleRow pt-4">
        <Link href="/">
          <div className="button">Continue Shopping</div>
        </Link>
        <Link href="/">
          <div className="button">BUY ALL</div>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Cart;
