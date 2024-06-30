import React from 'react';
import { useCart } from './context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineMinus, HiOutlinePlus, HiOutlineX } from 'react-icons/hi';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return <div className='flex flex-col w-full min-h-screen items-center justify-center'>
       <p> Your cart is empty</p>
        <Link href="/">
          <div className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-150 mt-4">
            Continue Shopping
          </div>
        </Link>
    
    </div>;
  }

  return (
    <div className="min-h-screen justify-center mt-16 lg:mx-16 mx-3">
      <h2 className="text-white text-2xl mb-4">Cart</h2>
      <div className="flex flex-col gap-6">
        {cart.map((product) => (
          <div key={product.id} className="w-full border border-gray-500 grid grid-cols-3 p-4 gap-4">
            <div className="relative w-40 h-40">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="flex flex-col justify-between p-2">
              <h2>{product.title}</h2>
              <h3>{product.description.substring(0, 50)}...</h3>
              <h5>${product.price}</h5>
            </div>
            <div className="flex flex-col justify-between items-end p-2">

            <div className="flex justify-between w-full">
            <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(product.id, product.quantity - 1)} className="bg-gray-500 rounded-sm">
                <HiOutlineMinus className='h-6 w-6 p-1'/>
                </button>
                <span>{product.quantity}</span>
                <button onClick={() => updateQuantity(product.id, product.quantity + 1)} className="bg-gray-500 rounded-sm ">
                  <HiOutlinePlus className='h-6 w-6 p-1'/>
                </button>
              </div>


              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-600 text-white rounded hover:bg-red-500 transition duration-150"
              >
                <HiOutlineX className="h-6 w-6 p-1" />
              </button>
           </div>
        
              <div className="flex items-center justify-between w-full mt-4">
                <h2>Total: ${(product.price * product.quantity).toFixed(2)}</h2>
                <Link href="/">
                  <div className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-150">
                    BUY NOW
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Link href="/">
          <div className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-150">
            Continue Shopping
          </div>
        </Link>
        <Link href="/">
          <div className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-150">
            BUY ALL
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cart;

