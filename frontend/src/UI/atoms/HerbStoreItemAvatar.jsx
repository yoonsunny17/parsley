// 허브 상점에서 아이템 선택 라디오 버튼으로 보이는 아바타!
import React from "react";

function HerbStoreItemAvatar({ imgUrl, title, price, checked }) {
  return (
    <>
      <div className="avatar mx-3 mt-4 mb-3 cursor-pointer">
        {/* <div className="w-16 rounded-xl"> */}
        <div
          className={`w-16 rounded-full ring-offset-base-100 ring-2 hover:ring-sub1 color-delay ${
            checked ? "ring-sub1" : "ring-extra1"
          }`}
        >
          <img src={imgUrl} alt="itemStore" />
        </div>
      </div>
      <div className="text-xs font-semibold text-center">{title}</div>
      <div className="text-xs font-semibold text-center">{price} 슬리</div>
    </>
  );
}

export default HerbStoreItemAvatar;
