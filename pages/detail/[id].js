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
    <div className="min-h-screen justify-center mt-16 lg:mx-16 mx-3">
      <div className="2xl:mx-64 md:border-2 md:border-gray-500 rounded-md md:p-6">
        <h2 className=" text-2xl flex justify-between">
          DETAIL
          <Link href="/">
            <HiOutlineX className="h-6 w-6 p-1 button" />
          </Link>
        </h2>
        <div className="grid md:grid-cols-2 justify-center gap-6 mt-4 ">
          <div className="relative rounded min-h-96 bg-white flex items-center">
            <Image
              src={product.image}
              alt="detail-image"
              layout="fill"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="rounded min-h-96 p-2 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl pb-4">{product.title}</h3>
              <p>{product.description}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <div className="flex text-xl mt-6">${product.price}</div>
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
