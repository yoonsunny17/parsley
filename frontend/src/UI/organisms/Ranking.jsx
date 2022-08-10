import { useState } from "react";

function Ranking() {

  const [rank, setRank] = useState(10)
  const [point, setPoint] = useState(10000)

  return (
    <div className="bg-white rounded-3xl drop-shadow px-8 py-5 w-full md:w-[32%]">
      <h3 className="text-xl font-bold text-center mb-4">
        오늘의 농부왕
      </h3>
      <ul className="list-none">
        <li className="flex items-center justify-around mb-8">
          <i className='bx bx-medal text-[#D5A11E] text-[48px]'></i>
          <div className="w-[50px] h-[50px] rounded-[50%] bg-main"></div>
          <span>슬리파슬리</span>
          <span>{point}점</span>
        </li>
        <li className="flex items-center justify-around mb-8">
          <i className='bx bx-medal text-[#A3A3A3] text-[48px]'></i>
          <div className="w-[50px] h-[50px] rounded-[50%] bg-main"></div>
          <span>슬리파슬리</span>
          <span>{point}점</span>
        </li>
        <li className="flex items-center justify-around mb-8">
          <i className='bx bx-medal text-[#CD7F32] text-[48px]'></i>
          <div className="w-[50px] h-[50px] rounded-[50%] bg-main"></div>
          <span>슬리파슬리</span>
          <span>{point}점</span>
        </li>
        <li className="flex items-center justify-around mb-8 ">
          {rank}등
          <div className="ml-[15px] w-[50px] h-[50px] rounded-[50%] bg-main"></div>
          <span>슬리파슬리</span>
          <span>{point}점</span>
        </li>
      </ul>
    </div>
  );
}

export default Ranking;