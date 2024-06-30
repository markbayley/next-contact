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
    <div className="min-h-screen justify-center mt-8 lg:mx-16 mx-3">
      <h2 className="text-2xl mb-4">Cart</h2>
      <div className="flex flex-col gap-6">
        {cart.map((product) => (
          <div
            key={product.id}
            className="w-full border-2 border-gray-500 grid md:grid-cols-3"
          >
            <div className="relative w-full md:w-40 h-40">
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex flex-col justify-between p-2">
              <h2 className="font-semibold">{product.title}</h2>
              <h3>{product.description.substring(0, 70)}...</h3>
              <h5 className="mt-2 md:mb-2 text-md">${product.price}</h5>
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
                  <HiOutlineX className="h-6 w-6 p-1 button bg-gray-300" />
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
      <div className="styleRow mt-4">
        <Link href="/">
          <div className="button">Continue Shopping</div>
        </Link>
        <Link href="/">
          <div className="button">BUY ALL</div>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
