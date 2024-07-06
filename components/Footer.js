import React from "react";

function Footer() {
  return (
    <div className=" flex w-full min-h-40 bg-gray-900 justify-center text-gray-400 mt-8">
      <div className=" grid grid-cols-3 px-2  w-full  lg:max-w-[850px] items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="">
            <h5 className="font-semibold text-gray-300">Support</h5>
            <div className="flex flex-col gap-1 mt-1">
              <div>Data Policy</div>
              <div>Returns</div>
              <div>Information</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="">
            <h5 className="font-semibold text-gray-300">Legal</h5>
            <div className="flex flex-col gap-1 mt-1">
              <div>Data Policy</div>
              <div>Returns</div>
              <div>Information</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="">
            <h5 className="font-semibold text-gray-300">Social</h5>
            <div className="flex flex-col gap-1  mt-1">
              <div>Data Policy</div>
              <div>Returns</div>
              <div>Information</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
