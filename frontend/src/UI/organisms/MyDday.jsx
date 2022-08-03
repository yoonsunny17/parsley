import React from "react";
import Button from "../atoms/Button";

function MyDday() {
  const [showModal, setShowMdoal] = React.useState(false);
  const onChange = () => {
    setShowMdoal((current) => !current);
  };

  return (
    <div className="rounded-2xl w-full md:w-[32%] shadow px-8 py-5">
      <div>
        <div className="my-2 font-bold">2022.07.24(일)</div>
      </div>
      <div>
        <div className="my-6 text-2xl font-bold">
          <h3 className="">두근두근 코테</h3>
          <h3 className="">D-60</h3>
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
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onChange}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    디데이 변경 (props로 데이터 보내기)
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <Button onClick={onChange} text={"취소"} />
                  <Button onClick={onChange} text={"디데이 저장"} />
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
