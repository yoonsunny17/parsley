function HerbItemAvatar({ imgUrl }) {
  return (
    <img
      className="inline-block mt-3 mb-3 mr-3 h-12 w-12 rounded-full ring-2 ring-white"
      src={imgUrl}
      alt="avatar"
    />
  );
}

export default HerbItemAvatar;
