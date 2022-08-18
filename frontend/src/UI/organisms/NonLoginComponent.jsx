import React from "react";

function NonLoginComponent() {
  return (
    <div className="w-full mb-5 rounded-3xl bg-white drop-shadow px-6 py-5 lg:w-2/3 lg:mb-0">
      <div className="font-bold text-3xl">
        <span className="text-sub1 hover:text-main">PARSLEY</span>의{" "}
        <span className="text-main hover:text-sub1">PLAYERS</span>가 되어보세요
        <img className="relative w-12" src="/parsley_logo.png" alt="logo" />
      </div>
      <div className="flex"></div>
    </div>
  );
}

export default NonLoginComponent;
