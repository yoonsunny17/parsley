function Studywidget() {
  return (
    <div className="flex flex-col justify-between w-[100%] h-[300px] bg-[#25262D] rounded-[25px] p-[25px_12px_20px_12px]
    shadow-[0_4px_10px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-[130px]">
        <div className="widget-word">
          <div className="text-font4 text-[18px] mb-[15px]">
            오늘의 스터디
          </div>
          <div className="text-font3">
            스터디 목표시간을 <br />
            설정해주세요
          </div>
        </div>
      </div>
      <div className="stt">
        <button className="text-font3 tracking-[-1px] text-[14px] bg-main rounded-[30px] p-[8px_19px] hover:bg-sub2">
          목표 설정
        </button>
      </div>
    </div>
  )
}

export default Studywidget