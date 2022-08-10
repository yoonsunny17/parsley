// 농장 페이지 우측에 있는 도감 컴포넌트의 아바타 atomic components
import React from "react";

// FIXME: tooltip으로 허브 설명 보여주고 싶은데 daisyui tooltip이 너무 안예쁨
function FarmCollectionAvartar({ info: { imgUrl, description } }) {
  return (
    // <div className="tooltip" data-tip={description}>
    <img
      className="cursor-pointer inline-block mt-3 mb-3 mr-3 h-12 w-12 rounded-full ring-2 ring-sub1"
      src={imgUrl}
      alt="avatar"
    />
    // </div>
  );
}

export default FarmCollectionAvartar;
