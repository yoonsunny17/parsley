import React, { useState } from 'react';

function CompareWeekStudy() {
  const[value, setValue] = useState(0);
  const onChange = () => {
    setValue(value + 1);
  }
  
  return (
    <div className="mx-0 shadow-sm rounded-[10px] px-4 py-3 w-full lg:w-[32%] border-[2px] border-sub1">
      <div className="text-base font-semibold text-[20px]">
        <i className='bx bxs-hot text-[#FF5B23]'></i>STUDY
        <p>이번주 평균 공부량이 지난주보다 줄었습니다.</p> {/*데이터 비교해서 넣기 (줄었습니다, 늘었습니다 부분) */}
      <div>
        <hr />
        <button onClick={onChange} className="bg-gray-300">test btn</button>
        <div>percentage: {value}%</div>
        <progress className="progress progress-success w-full" value={value} max="100"></progress>
        <div>auto progress bar</div>
        <progress className="progress progress-success w-full" max="100"></progress>
      </div>
      </div>
    </div>

  );
}

export default CompareWeekStudy;