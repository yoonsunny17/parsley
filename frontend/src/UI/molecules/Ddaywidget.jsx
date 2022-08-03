import moment from "moment"
import 'moment/locale/ko'

function Ddaywidget() {
  return (
    <div className="w-[100%] h-[80px] bg-[#25262D] flex items-center justify-between py-0 px-[20px] mb-[15px]
    shadow-[0_4px_10px_rgba(0,0,0,0.35)] font-basic rounded-[25px]">
      <div className="text-font3 text-[15px]">{moment().format("YYYY. M. D (ddd)")}</div>
      <div className="text-font3 font-bold text-[20px] mr-[25px]">D-Day</div>
    </div>
  )
}

export default Ddaywidget