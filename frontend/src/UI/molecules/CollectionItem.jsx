import React from "react";

function CollectionItem({
  info: { name, imageUrl, grade, description, isOpened },
}) {
  return (
    <img
      src={imageUrl}
      alt="herb"
      className="mx-[5px] my-[3px] inline-block h-10 w-10 rounded-full ring-2 ring-sub1"
    />
  );
}

export default CollectionItem;
