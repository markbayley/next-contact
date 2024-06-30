import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import {
  HiFilter,
  HiOutlineArrowLeft,
  HiOutlineEye,
  HiOutlineReply,
  HiOutlineSearch,
  HiSortAscending,
  HiSortDescending,
} from "react-icons/hi";
import { products } from "./products.js";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [allProducts, setAllProducts] = useState(products);
  const [searchedProducts, setSearchedProducts] = useState(products);
  const [searchValue, setSearchValue] = useState('');
  const [sortOrder, setSortOrder] = useState('')

  const handleSort = (order) => {
    const sortedData =
      order === "ascending"
        ? [...searchedProducts].sort((a, b) => b.price - a.price)
        : [...searchedProducts].sort((b, a) => b.price - a.price);
    setSearchedProducts(sortedData);
  };

  const handleSearch = () => {
    const searchResults = allProducts.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (searchValue === "") {
      setSearchedProducts(products);
    } else {
      setSearchedProducts(searchResults);
    }
  };

  // console.log("products", products)

  return (
    <div className="">
      <main
        className={`flex min-h-screen flex-col items-center  pt-16 ${inter.className}`}
      >
        <h2 className="text-white text-2xl">SEARCH</h2>

        <div>
          <div className="flex flex-col gap-4 md:flex-row w-full items-center justify-between  mt-6">
            <div className="flex justify-center gap-1 ">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className=" pl-4 py-2 rounded xl:min-w-60 outline-none text-gray-700"
              />
              {searchedProducts.length < allProducts.length ? (
                <button
                  onClick={() => {
                    setSearchedProducts(allProducts), setSearchValue("");
                  }}
                  className="bg-blue-600 rounded py-2 px-4 hover:bg-blue-500 active:scale-95 transition duration-150 font-semibold "
                >
                  <HiOutlineReply className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={(e) => handleSearch(e.target.value)}
                  className="bg-blue-600 rounded py-2 px-4 hover:bg-blue-500 active:scale-95 transition duration-150 font-semibold "
                >
                  <HiOutlineSearch className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="flex gap-5">
              {/* <div>
                <button
                  onClick={handleSort}
                  className="bg-blue-600 rounded py-2 px-4 hover:bg-blue-500 active:scale-95 transition duration-150 font-semibold "
                >
                  <HiFilter className="h-6 w-6 " />
                </button>
              </div> */}
              { sortOrder === "descending" ?
              <div>
                <button
                  onClick={() => { handleSort("ascending"), setSortOrder('ascending')}}
                  className="bg-blue-600 rounded py-2 px-4 hover:bg-blue-500 active:scale-95 transition duration-150 font-semibold "
                >
                  <HiSortDescending className="h-6 w-6 " />
                </button>
              </div>
              :
              <div>
                <button
                  onClick={() => { handleSort("descending"), setSortOrder('descending')}}
                  className="bg-blue-600 rounded py-2 px-4 hover:bg-blue-500 active:scale-95 transition duration-150 font-semibold "
                >
                  <HiSortAscending className="h-6 w-6 " />
                </button>
              </div>
}
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-16">
            {searchedProducts.map((item) => (
              <Link href={`/detail/${item.id}`} key={item.id}>
                <div className="border relative rounded w-80 h-80 flex justify-center items-center text-white text-lg hover:opacity-90 transition duration-150 ease-out">
                  <div className=" w-full h-full flex items-center justify-center text-gray-500 text-lg z-50 opacity-0 hover:opacity-100 transition duration-1000 ease-out">
                    <HiOutlineEye className="h-16 w-16" />
                  </div>
                  <Image
                    src={item.image}
                    alt="product-image"
                    fill
                    style={{ objectFit: "cover" }}
                    className="hover:opacity-75"
                  />

                  <div className="text-gray-800  absolute bottom-1 left-2 text-md">
                    {item.title}
                  </div>

                  <div className="text-gray-800 absolute bottom-1 right-2 text-md">
                    ${item.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
