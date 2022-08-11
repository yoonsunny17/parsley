// 농장 상점 모달 페이지에서 우측의 구매 목록의 avatar

function HerbItemAvatar({ imgUrl }) {
  return (
    <img
      className="inline-block mt-3 mb-3 mr-3 h-10 w-10 rounded-full ring-2 ring-sub1"
      src={imgUrl}
      alt="avatar"
    />
  );
}

export default HerbItemAvatar;
