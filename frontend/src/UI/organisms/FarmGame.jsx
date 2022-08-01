function FarmGame() {
  const username = "유교보이";
  const sley = 1000;
  return (
    <div className="flex justify-between px-[30px] py-[35px] w-[70%] bg-white rounded-[30px] drop-shadow-[4px_4px_20px_rgba(0,0,0,0.1)]">
      <div className="font-basic text-[20px] font-bold">
        {username} 님의 농장
      </div>
      <div className="font-basic text-[20px] font-bold">{sley} 슬리</div>
    </div>
  );
}

export default FarmGame;
