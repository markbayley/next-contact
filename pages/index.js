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

 // const [allProducts, setAllProducts] = useState(products);
  const [searchedProducts, setSearchedProducts] = useState(products);
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categoryValue, setCategoryValue] = useState("All");

  const handleSort = (order) => {
    const sortedData =
      order === "ascending"
        ? [...searchedProducts].sort((a, b) => b.price - a.price)
        : [...searchedProducts].sort((b, a) => b.price - a.price);
    setSearchedProducts(sortedData);
  };

  const handleSearch = () => {
    const searchResults = products.filter(
      (item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (searchValue === "") {
      setSearchedProducts(products);
    } else {
      setSearchedProducts(searchResults);
    }
  };

  const handleCategory = (value) => {
    setCategoryValue(value);
    const categoryResults =
      value === "All"
        ? products
        : products.filter((item) => item.category === value);
    setSearchedProducts(categoryResults);
  };

  if (searchedProducts.length === 0) {
    return (
      <div className="flex flex-col w-full min-h-screen items-center justify-center">
        <p> No matching results found</p>

        <div
          onClick={() => {
            setSearchedProducts(products), setSearchValue("");
          }}
          className="button mt-4"
        >
          Continue Shopping
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <main className={`flex styleCol ${inter.className}`}>
        <div className="">
          <div className="styleCol md:styleRow">
            <div className="styleRow justify-start">
              <div className="flex justify-center">
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search..."
                  className="pl-4 py-2 rounded-l min-w-64  outline-none text-gray-700"
                />
                {searchedProducts.length < products.length &&
                searchValue !== "" ? (
                  <button
                    onClick={() => {
                      setSearchedProducts(products), setSearchValue("");
                    }}
                    className="button rounded-l-none px-4"
                  >
                    <HiOutlineReply className="h-5 w-5  text-white" />
                  </button>
                ) : (
                  <button
                    onClick={handleSearch}
                    className="button rounded-l-none px-4"
                  >
                    <HiOutlineSearch className="h-5 w-5 text-white" />
                  </button>
                )}
              </div>
            </div>

            <div className="styleRow justify-between md:justify-end">
              <div className="">
                {sortOrder === "descending" ? (
                  <div>
                    <button
                      onClick={() => {
                        handleSort("ascending"), setSortOrder("ascending");
                      }}
                      className="button bg-indigo-500 text-white px-4"
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
                      className="button bg-indigo-500 text-white px-4"
                    >
                      <HiSortAscending className="h-6 w-6" />
                    </button>
                  </div>
                )}
              </div>
              <select
                value={categoryValue}
                onChange={(e) => handleCategory(e.target.value)}
                className="styleRow md:w-44 bg-amber-500 p-2 rounded-md text-white border-2 border-amber-500 outline-white"
              >
                <option value="All">All Categories</option>
                <option value="Gifts">Gifts</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Skin Care">Skin Care</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-8 animate-fade">
            {searchedProducts.map((item) => {
              const isFavorited = favorites.some(
                (favItem) => favItem.id === item.id
              );
              return (
                <div
                  className="shadow-sm bg-gray-100 rounded-md "
                  key={item.id}
                  onClick={() => setOption("")}
                >
                  <Link href={`/detail/${item.id}`}>
                    <div className="styleCenter border relative w-full md:w-72 h-72 text-white text-lg hover:opacity-90 ">
                      <div className="styleCenter text-gray-500 text-lg z-20 opacity-0 hover:opacity-100 transition duration-500 ease-out">
                        <HiOutlineEye className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute top-2 right-2 z-20">
                        <button
                          className="hover:bg-gray-200 rounded-full p-2 active:scale-95 transition duration-200 ease-out"
                          //onClick={(event) => handleFavoriteClick(event, item)}
                        >
                          {isFavorited ? (
                            <HiHeart className="h-8 w-8 text-red-500" />
                          ) : (
                            //<HiOutlineHeart className="h-8 w-8 text-red-500" />
                            ""
                          )}
                        </button>
                      </div>

                      <Image
                        src={item.image}
                        alt="product-image"
                        fill
                        style={{ objectFit: "cover" }}
                        className="hover:opacity-95 rounded-t-md active:scale-95 transition duration-150 ease-out"
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
