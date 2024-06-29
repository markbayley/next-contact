import React from "react";
import Component from "./login-btn";

function Header() {
  return (
    <div className="sticky top-0 grid grid-cols-3 items-center p-3 bg-gray-900">
      <div>Logo</div>
      <div className="flex justify-center gap-1">
        <input placeholder="Search..." className="hidden md:flex pl-4 py-2 rounded xl:min-w-60 outline-none text-gray-700"/>
        <button className="bg-blue-600 rounded py-2 px-4 hover:bg-blue-500 active:scale-95 transition duration-150 font-semibold ">Search</button>
      </div>
      <div className="flex justify-end"><Component /></div>
    </div>
  );
}

export default Header;
