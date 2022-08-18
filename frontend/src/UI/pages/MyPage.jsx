import MyProfile from "../../UI/organisms/MyProfile";
import MyDday from "../../UI/organisms/MyDday";
import TodayStudy from "../../UI/organisms/TodayStudy";
import TodayStudyTime from "../../UI/organisms/TodayStudyTime";
import WeekStudy from "../../UI/organisms/WeekStudy";
import Navbar from "../organisms/Navbar";
import DailyStudy from "../../UI/organisms/DailyStudy";
import CompareWeekStudy from "../../UI/organisms/CompareWeekStudy";
import { useGetWeeklyQuery } from "../../services/study";

function MyPage() {
  const { data } = useGetWeeklyQuery({}, { refetchOnMountOrArgChange: true });

  return (
    <div className="text-font1 h-100">
      <Navbar />
      <div className="w-full flex flex-col h-full gap-4">
        <div className="flex flex-wrap justify-between w-full">
          <MyProfile />
          <MyDday />
        </div>
        <div className="flex flex-wrap justify-between w-full">
          {/* <TodayStudy /> */}
          <TodayStudyTime />
        </div>
        <div className="flex flex-wrap justify-between w-full">
          {/* <WeekStudy /> */}
          <DailyStudy />
          <CompareWeekStudy />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
