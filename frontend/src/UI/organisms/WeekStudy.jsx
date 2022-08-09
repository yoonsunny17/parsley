import DailyStudy from "./DailyStudy";
import CompareWeekStudy from "./CompareWeekStudy";

function WeekStudy() {
  return (
    <div className="rounded-2xl shadow px-8 py-5 w-full">
      <h3 className="text-[24px] font-bold mb-4">주간 스터디 통계</h3>
      <div className="flex gap-[20px]">
        <DailyStudy />
        <CompareWeekStudy />
      </div>
    </div>
  );
}

export default WeekStudy;