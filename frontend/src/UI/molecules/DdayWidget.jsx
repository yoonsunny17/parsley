import moment from "moment";
import "moment/locale/ko";

function DdayWidget() {
    return (
        <div className="w-100 items-center justify-between p-6 shadow font-basic rounded-3xl">
            {/* 날짜 표시 */}
            <div className="text-font1 text-xl font-bold mb-4">
                {moment().format("YYYY. M. D (ddd)")}
            </div>
            {/* 디데이 표시 */}
            <div className="flex justify-end text-extra5 font-semibold text-[20px]">
                D - 365
            </div>
        </div>
    );
}

export default DdayWidget;
