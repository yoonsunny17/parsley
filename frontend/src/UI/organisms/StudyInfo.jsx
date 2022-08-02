function StudyInfo() {
  return (
    <div className="container max-auto">
      <div className="flex gap-[90px] mb-[80px]">
        <div className="w-[540px] h-[540px] border-4 border-sub1 rounded-[15px] shadow-[0_4px_8px_rgba(0,0,0,0.25)] ">
          스터디 이미지
        </div>
        <div className="study-contents">
          <div className="text-[36px] font-normal mb-[25px]">
            모각코 스터디 모여라!
          </div>
          <div className="text-[24px] font-normal mb-[25px]">
            인원 : 4/6
          </div>
          <div className="mb-[50px] ">
            <span className="text-[22px] font-normal bg-sub1 text-font3 rounded-[10px] px-[5px] py-[3px] mr-[5px]">#모각코</span>
            <span className="text-[22px] font-normal bg-sub1 text-font3 rounded-[10px] px-[5px] py-[3px] mr-[5px]">#취뽀</span>
            <span className="text-[22px] font-normal bg-sub1 text-font3 rounded-[10px] px-[5px] py-[3px] mr-[5px]">#개발자</span>
          </div>
          <div className="study-rule">
            <div className="text-[28px] font-bold mb-[10px]">
              스터디 규칙 안내
            </div>
            <div className="text-font1 text-[24px] font-normal mb-[100px]">
              <li className="list-none">1. 오전 9시부터 오후 6시까지 필참!</li>
              <li className="list-none">2. 방장 말이 곧 법이다.</li>
              <li className="list-none">3. 지각 시 1분당 1000원</li>
            </div>
          </div>
          <div className="flex items-center gap-[10px] ">
            <button className="text-white bg-main hover:bg-sub2 text-[18px] px-[34px] py-[12px] rounded-[50px]">
              참가하기
            </button>
            <button className="w-[50px] h-[50px] text-[30px] text-font1 rounded-[50px]">
              <i className='bx bx-link' ></i>
            </button>
            <button className="w-[50px] h-[50px] text-[30px] text-[rgb(243_87_87)] rounded-[50px]">
              <i className='bx bx-heart'></i>
            </button>
            {/* axios처리할거 */}
            <button className="w-[50px] h-[50px] text-[30px] text-[rgb(243_87_87)] rounded-[50px]">
              <i className='bx bxs-heart' ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyInfo