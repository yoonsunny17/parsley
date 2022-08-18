import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetNongbuRankingQuery } from "../../services/ranking";
import { BiMedal } from "react-icons/bi";

function Ranking() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const { data: getNongbuRankings } = useGetNongbuRankingQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [rank, setRank] = useState(999);
  const [point, setPoint] = useState(10000);

  console.log(getNongbuRankings);
  const color = ["gold", "silver", "bronze"];

  function topRank() {
    let array = [];
    if (getNongbuRankings) {
      let length = getNongbuRankings?.topRank.length;
      for (let i = 0; i < 3; i++) {
        array.push(
          <li key={i} className="flex items-center justify-between mb-2">
            <span className="w-16 inline-block text-center">
              <BiMedal className={`bx bx-medal text-${color[i]} text-3xl`} />
            </span>
            <span className="w-2/5 text-start truncate">
              {length <= i ? "--" : getNongbuRankings?.topRank[i].name}
            </span>
            <span className="w-1/3 text-end">
              {length <= i ? "--" : getNongbuRankings?.topRank[i].score} 점
            </span>
          </li>
        );
      }
    }

    return array;
  }

  return (
    <div className="bg-white rounded-3xl drop-shadow px-8 py-5 w-full lg:w-[32%]">
      <h3 className="text-lg font-bold text-center mb-4">오늘의 농부왕</h3>
      <ul className="list-none text-sm w-full">
        {topRank()}
        <li className="flex items-center justify-between mb-2"></li>
        <li className="flex items-center justify-between mt-4">
          {getNongbuRankings?.myRank.name === "guest" ? (
            <div className="flex justify-center w-full">
              회원가입 후 등수를 알아보세요
            </div>
          ) : (
            <>
              <span className="w-16 text-center">
                {getNongbuRankings?.myRank.rank === null
                  ? "랭킹\n없음"
                  : getNongbuRankings?.myRank.rank + "등"}
              </span>
              <span className="w-2/5 text-start">나</span>
              <span className="w-1/3 text-end">
                {getNongbuRankings?.myRank.score} 점
              </span>
            </>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Ranking;
