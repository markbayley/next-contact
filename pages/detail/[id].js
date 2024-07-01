import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { products } from "./../products.js";
import React from "react";
import { HiOutlineX } from "react-icons/hi";
import { useCart } from "./../context/CartContext";

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
    router.push("/cart");
  };

  return (
    <div className="flex justify-center w-full">
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
          <div className="px-2 flex flex-col justify-between">
            <div>
              <div className="flex justify-between">
                <h1 className="text-2xl">{product.title}</h1>
                <Link href="/">
                  <HiOutlineX className="h-6 w-6 p-1  button rounded shadow-sm bg-gray-200" />
                </Link>
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
    </div>
  );
}

export default Detail;
