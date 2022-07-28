import React from "react";

function CollectionItem({ info: { name, imageUrl, isOpened } }) {
  return (
    <img
      src={imageUrl}
      alt="herb"
      className="mx-[6px] my-[6px] inline-block h-10 w-10 rounded-full ring-2 hover:scale-105 duration-100"
    />
  );
}

export default CollectionItem;
