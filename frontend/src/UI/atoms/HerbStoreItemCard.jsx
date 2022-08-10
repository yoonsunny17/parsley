// TODO: 클릭하면 강조되어야 하고, 구매 내역에 작성되어야 함

import React, { useState } from "react";

function HerbStoreItemCard({ imgUrl, title, price, grade, item }) {
  return (
    <div className="card w-28 bg-base-100 shadow m-1 cursor-pointer card-border">
      <img src={imgUrl} alt="" />
      <div className="card-body p-2">
        <div className="flex justify-between card-title text-[13px]">
          {title}
          {/* <i className="bx bxs-star text-yellow-400"></i> */}
        </div>
        <p className="text-xs">{price} 슬리</p>
      </div>
    </div>
  );
}

export default HerbStoreItemCard;
