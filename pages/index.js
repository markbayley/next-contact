import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import {
  HiHeart,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineReply,
  HiOutlineSearch,
  HiSortAscending,
  HiSortDescending,
} from "react-icons/hi";
import Image from "next/image";
import { useCart } from "../context/CartContext.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { favorites, handleFavoriteClick, setOption, products } = useCart();

  const [allProducts, setAllProducts] = useState(products);
  const [searchedProducts, setSearchedProducts] = useState(products);
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSort = (order) => {
    const sortedData =
      order === "ascending"
        ? [...searchedProducts].sort((a, b) => b.price - a.price)
        : [...searchedProducts].sort((b, a) => b.price - a.price);
    setSearchedProducts(sortedData);
  };

  const handleSearch = () => {
    const searchResults = allProducts.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||  item.category.toLowerCase().includes(searchValue.toLowerCase()) ||  item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (searchValue === "") {
      setSearchedProducts(products);
    } else {
      setSearchedProducts(searchResults);
    }
  };

  if (searchedProducts.length === 0) {
    return (
      <div className="flex flex-col w-full min-h-screen items-center justify-center">
        <p> No matching results found</p>
       
          <div onClick={() => {
                    setSearchedProducts(allProducts), setSearchValue("");
                  }} className="button mt-4">Continue Shopping</div>
       
      </div>
    );
  }

  return (
    <div className="pt-4">
      <main className={`flex styleCol ${inter.className}`}>
        <div>
          <div className="styleRow">
            <div className="flex justify-center">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="pl-4 py-2 rounded-l w-56 outline-none text-gray-700"
              />
              {searchedProducts.length < allProducts.length ? (
                <button
                  onClick={() => {
                    setSearchedProducts(allProducts), setSearchValue("");
                  }}
                  className="button rounded-l-none"
                >
                  <HiOutlineReply className="h-5 w-5 text-white" />
                </button>
              ) : (
                <button
                  onClick={handleSearch}
                  className="button rounded-l-none"
                >
                  <HiOutlineSearch className="h-5 w-5 text-white" />
                </button>
              )}
            </div>

            <div className="">
              {sortOrder === "descending" ? (
                <div>
                  <button
                    onClick={() => {
                      handleSort("ascending"), setSortOrder("ascending");
                    }}
                    className="button bg-indigo-500 text-white"
                  >
                    <HiSortDescending className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      handleSort("descending"), setSortOrder("descending");
                    }}
                    className="button bg-indigo-500 text-white"
                  >
                    <HiSortAscending className="h-6 w-6" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-8 animate-fade">
            {searchedProducts.map((item) => {
                 const isFavorited = favorites.some(
                  (favItem) =>
                    favItem.id === item.id 
                );
                return (
              <div
                className="shadow-sm bg-gray-100 rounded-md p-1"
                key={item.id}
                onClick={() => setOption("")}
              >
                <Link href={`/detail/${item.id}`}>
                  <div className="styleCenter border relative w-full md:w-72 h-72 text-white text-lg hover:opacity-90 active:scale-95 transition duration-50 ease-out">
                    <div className="styleCenter text-gray-500 text-lg z-20 opacity-0 hover:opacity-100 transition duration-500 ease-out">
                      <HiOutlineEye className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute top-2 right-2 z-20">
                      <button
                        className="hover:bg-gray-200 rounded-full p-2 active:scale-95 transition duration-200 ease-out"
                        onClick={(event) => handleFavoriteClick(event, item)}
                      >
                        {isFavorited ? (
                          <HiHeart className="h-8 w-8 text-red-500" />
                        ) : (
                          <HiOutlineHeart className="h-8 w-8 text-red-500" />
                        )}
                      </button>
                    </div>
         
                    <Image
                      src={item.image}
                      alt="product-image"
                      fill
                      style={{ objectFit: "cover" }}
                      className="hover:opacity-95 rounded-t-md"
                    />
                
                  </div>
                </Link>
                <div className="p-2">
                  <div className="text-gray-500 text-md font-semibold">
                    {item.title}
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="text-gray-400">{item.category}</span>
                    <span className="text-gray-800">${item.price}</span>
                  </div>
                </div>
              </div>
                );
})}
          </div>
        </div>
      </main>
    </div>
  );
}
