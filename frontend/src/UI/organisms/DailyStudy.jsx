// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
// } from "recharts";

import React, { PureComponent } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "월",
        hour: 4,
        amt: 2400,
    },
    {
        name: "화",
        hour: 1.3,
        amt: 2210,
    },
    {
        name: "수",
        hour: 12,
        amt: 2290,
    },
    {
        name: "목",
        hour: 7,
        amt: 2000,
    },
    {
        name: "금",
        hour: 8,
        amt: 2181,
    },
    {
        name: "토",
        hour: 9,
        amt: 2500,
    },
    {
        name: "일",
        hour: 9,
        amt: 2100,
    },
];
var sortingField = "hour";
const sortData = data.slice();
sortData.sort(function (a, b) {
    return a[sortingField] - b[sortingField];
});

console.log(sortData);
function DailyStudy() {
    return (
        <div className="flex flex-col shadow-sm rounded-[10px] px-4 py-3 w-full mb-2 lg:w-2/3 lg:mb-0 border-[2px] border-sub1">
            <div className="font-semibold text-base">요일별 공부량</div>
            <div className="">
                <span className="font-bold text-sm">
                    {sortData[6].name}요일
                </span>
                에 가장 열심히 공부했네요!
            </div>
            <div className="flex justify-center mt-[30px] text-center">
                {/* <BarChart
          width={650}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hour" fill="#8EC281" />
        </BarChart> */}
            </div>
        </div>
    );
}

export default DailyStudy;
