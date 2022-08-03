import React, { useState } from 'react';

function CompareWeekStudy() {
  const[value, setValue] = useState(0);
  const onChange = () => {
    setValue(value + 1);
  }
  
  return (
    <div className="mx-0 shadow-sm rounded-md px-4 py-3 w-full lg:w-[32%]">
      <div className="text-base font-semibold">주간 공부량 비교
      <div>
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