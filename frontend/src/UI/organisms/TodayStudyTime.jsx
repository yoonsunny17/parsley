function TodayStudyTime() {
	const FULL_MINUTES = 1440;
  const NOW_TIME = 50;

	const BOX_RENDER_LIST = new Array(FULL_MINUTES / 10)
		.fill(null)
		.map((_, index) => (index) * 10);
	const MINUTE = [];

	while (BOX_RENDER_LIST.length) {
		MINUTE.push(BOX_RENDER_LIST.splice(0, 6));
	}

  console.log(NOW_TIME)
	return (
		<div className="rounded-2xl shadow px-8 py-5 w-full md:w-2/3 p-[28px_30px]">
			<div className="font-basic text-[24px] font-bold mb-[40px] ">오늘의 공부량</div>
      <div className="flex justify-center ml-[-76px] gap-[136px] text-[14px] font-bold">
        <div>0h</div>
        <div>6h</div>
        <div>12h</div>
        <div>18h</div>
      </div>
      <div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-[110px] mr-[20px] text-[14px] font-bold">
            <div>10m</div>
            <div>60m</div>
          </div>
          {MINUTE.map((v) => (
            <div className="flex flex-col">
              {v.map((v) => (
                <div className="w-[18px] h-[18px] rounded-[4px] border-[0.5px] border-font2 bg-[#D9D9D9] relative m-[4px] overflow-hidden">
                  <div className={`absolute left-0 top-0 bg-sub1 w-full h-full ${NOW_TIME - v >= 10 ? 'opacity-100' : NOW_TIME-v >= 5 ? 'opacity-50' : 'opacity-0'}`} />
                </div> 
              ))}
            </div>
          ))}
        </div>
      </div>
		</div>
	);
}
// ${NOW_TIME -v >= 10 ? 1 : NOW_TIME - v >= 5 ? 0.5: 0}
export default TodayStudyTime;

// <div className="w-16 h-16 rounded-md bg-gray-500 relative mb-4">
// <div className={`absolute w-full h-[${v - NOW_TIME > 10 ? '100%' : `${v - NOW_TIME < 0 ? 0 : NOW_TIME - v * 10}%`}]`} />
// </div>
