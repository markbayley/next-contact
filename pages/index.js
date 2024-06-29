import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="">
      <main
        className={`flex min-h-screen flex-col items-center  pt-16 ${inter.className}`}
      >
        <h2 className="text-white text-2xl">SEARCH</h2>
        <div className="flex justify-center gap-1 pt-6">
          <input
            placeholder="Search..."
            className="hidden md:flex pl-4 py-2 rounded xl:min-w-60 outline-none text-gray-700"
          />
          <button className="bg-blue-600 rounded py-2 px-4 hover:bg-blue-500 active:scale-95 transition duration-150 font-semibold ">
            Search
          </button>
        </div>
      </main>
    </div>
  );
}
