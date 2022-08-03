import React, { useEffect } from "react";

function TodayStudy() {
  const ResizedComponent = () => {
    const handleResize = () => {
      console.log(
        `browser window x-axis size: ${window.innerWidth}, y-axis size: ${window.innerHeight}`
      );
    };

    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  };
  return (
    <div className="rounded-2xl mb-4 shadow px-8 py-5 w-full md:w-[32%] md:mb-0">
      <h3 className="text-xl font-bolds">오늘의 스터디</h3>
      {/* circle progress bar: daisyUI*/}

      <div
        className={
          window.innerWidth > 1035
            ? "ml-6 mt-6 mb-5 text-main radial-progress [--value:70] [--size:12rem]"
            : "ml-6 mt-6 mb-5 text-main radial-progress [--value:70] [--size:6rem]"
        }
      >
        70%
      </div>
      <div>
        브라우저 화면 사이즈 x: {window.innerWidth}, y:{window.innerHeight}
      </div>
    </div>
  );
}

export default TodayStudy;
