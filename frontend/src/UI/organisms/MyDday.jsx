import React, { useState } from "react";
import Button from "../atoms/Button";
import moment from "moment"
import 'moment/locale/ko'


function MyDday() {
  const [showModal, setShowMdoal] = React.useState(false);
  const onChange = () => {
    setShowMdoal((current) => !current);
  };
  


  const Dday = () => {
    if (document.querySelector("#targetDate").value === ""){
      document.querySelector("#resultDiv").textContent = ("invalid Date")
    } else {
        let firstDate = moment().format("YYYY-MM-DD")
        let secondDate = moment(document.querySelector("#targetDate").value)
        let diff = secondDate.diff(firstDate,'days')
        document.querySelector("#resultDiv").textContent = ("D-day  " + diff)
    }
  }

  const [dday, setDday] = useState('')
  const ddaysave = () => {
    const firstDate = moment().format("YYYY-MM-DD")
    let secondDate = moment(document.querySelector("#targetDate").value)
    let diff = secondDate.diff(firstDate, 'days')
    // if (diff === 0) {
    //   console.log("day")
    //   diff = 'day'
    // }

    
    if ( diff > 0 ) {
      diff =  diff * -1
    } else if ( diff === 0 ) {
      diff = 'day'
    } else {
      diff = '+'+ diff*-1
    }

    setDday(diff)
    console.log(dday)
  }

  return (
    <div className="rounded-2xl w-full md:w-[32%] shadow px-8 py-5">
      <div>
        <div className="my-2 font-bold">{moment().format("YYYY. M. D (ddd)")}</div>
      </div>
      <div>
        <div className="my-6 text-2xl font-bold">
          <h3 className="">두근두근 코테</h3>
          <h3 className="">D {dday}</h3>
        </div>
      </div>
      <div className="flex items-end justify-end mt-16">
        <button
          onClick={onChange}
          className="transition duration-0 rounded-full px-4 py-2 text-sm font-semibold bg-main hover:bg-sub2 hover:duration-500 text-font3"
        >
          <span className="align-middle">
            <i className="bx bx-cog mr-[2px]"></i>디데이 설정
          </span>
        </button>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5">
                  <h3 className="font-basic text-3xl font-semibold">D-Day 설정</h3>
                </div>
                {/*body*/}
                <div className="relative w-[480px] p-[30px] flex-auto">
                  <input type="date" id="targetDate" />
                  {/* <button onClick={ddaysave}>gdgd</button> */}
                  <button id="resultBtn" onClick={Dday}>결과</button>
                  <div id="resultDiv"></div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6  gap-[10px]">
                  <Button onClick={onChange} text={"취소"} />
                  <Button onClick={ddaysave} text={"디데이 저장"} />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default MyDday;
