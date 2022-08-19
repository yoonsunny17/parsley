// TODO: 클릭하면 강조되어야 하고, 구매 내역에 작성되어야 함

import React, { useState } from "react";

function HerbStoreItemCard({ imgUrl, title, price, grade, item }) {
  return (
    <div className="card w-28 h-30 bg-base-100 shadow m-1 cursor-pointer">
      <img src={imgUrl} alt="itemStore" />
      <div className="card-body p-1">
        <div className="flex justify-between card-title text-[12px] ml-1">
          {title}
          {/* <i className="bx bxs-star text-yellow-400"></i> */}
        </div>
        <p className="text-[11px] ml-1">{price} 슬리</p>
      </div>
    </div>
  );
}

export default HerbStoreItemCard;
