import React from "react";
import Component from "./login-btn";
import Link from "next/link";

function Header() {
  return (
    <div className="sticky top-0 grid grid-cols-3 items-center p-3 bg-gray-900">
      <div className="flex gap-6">
      <div className="pl-3"> Logo</div>
      <ul className="flex gap-6">
      <li className="hover:text-gray-300">
        <Link href="/">Home</Link>
      </li>
      <li className="hover:text-gray-300">
        <Link href="/about">About</Link>
      </li>
      <li className="hover:text-gray-300">
        <Link href="/contact">Contact</Link>
      </li>
      {/* <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li> */}
    </ul>
    </div>
      <div className=" flex justify-center">
  


      </div>
      <div className="flex justify-end"><Component /></div>
    </div>
  );
}

export default Header;
