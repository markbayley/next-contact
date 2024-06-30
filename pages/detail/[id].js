import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { products } from './../products.js';
import React from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { useCart } from './../context/CartContext';

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    router.push('/cart');
  };

  return (
    <div className="min-h-screen justify-center mt-16 lg:mx-16 mx-3">
      <div className="2xl:mx-64">
        <h2 className="text-white text-2xl flex justify-between">
          DETAIL
          <Link href="/">
            <HiOutlineX className="h-6 w-6 p-1 bg-blue-500 rounded-sm hover:bg-blue-400 transition duration-150 ease-out" />
          </Link>
        </h2>
        <div className="grid md:grid-cols-2 justify-center gap-6 mt-4 ">
          <div className="relative rounded min-h-96 bg-white flex items-center">
            <Image src={product.image} alt="detail-image" layout="fill" style={{ objectFit: 'cover' }} />
          </div>
          <div className="rounded min-h-96 p-2 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl pb-4">{product.title}</h3>
              <p>{product.description}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <div className="flex text-xl mt-6">${product.price}</div>
              <button
                onClick={handleAddToCart}
                className="flex bg-blue-600 rounded py-2 px-4 mt-2 text-white hover:bg-blue-500 active:scale-95 transition duration-150"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;

