import React from "react";

function Footer() {
  return (
    <div className=" flex w-full min-h-40 bg-gray-900 mt-36 justify-center">
      <div className=" grid grid-cols-3 px-8  w-full  lg:w-3/4 items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="">
            Support
            <div className="flex flex-col gap-1 text-gray-400 mt-1">
              <div>Data Policy</div>
              <div>Returns</div>
              <div>Other information</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="">
            Legal
            <div className="flex flex-col gap-1 text-gray-400 mt-1">
              <div>Data Policy</div>
              <div>Returns</div>
              <div>Other information</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="">
            Social
            <div className="flex flex-col gap-1 text-gray-400 mt-1">
              <div>Data Policy</div>
              <div>Returns</div>
              <div>Other information</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
