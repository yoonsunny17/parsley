import React from "react";
import { TbPlant } from "react-icons/tb";

function NonLoginComponent() {
  return (
    <div className="cursor-default w-full mb-5 rounded-3xl bg-white drop-shadow px-8 py-6 lg:w-2/3 lg:mb-0">
      <div className="font-bold text-3xl my-2 ">
        <span className="text-sub1 hover:text-main">PARSLEY</span>의{" "}
        <span className="text-main hover:text-sub1">PLAYERS</span>가 되어보세요
      </div>
      <div className="my-4">
        <ol>
          <li className="flex mb-2">
            <img className="w-11" src="/parsley_logo.png" alt="logo" />
            <span className="pt-2">
              공부를 하고 얻은 슬리로 허브를 심어보세요
            </span>
          </li>
          <li className="flex mb-2">
            <img className="w-11" src="/parsley_logo.png" alt="logo" />
            <span className="pt-2">
              심은 허브를 수확하여 다양한 허브 도감을 모아보세요
            </span>
          </li>
          <li className="flex">
            <img className="w-11" src="/parsley_logo.png" alt="logo" />
            <span className="pt-2">
              열심히 공부해서 공부왕 / 농부왕이 되어보세요
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default NonLoginComponent;
