import React from "react";
import { useSelector } from "react-redux/es/exports";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

function DailyStudy() {
    const data = useSelector((state) => state.study.weekly);

    let sortData;

    if (data) {
        let sortingField = "hour";
        sortData = data.slice();
        sortData.sort(function (a, b) {
            return a[sortingField] - b[sortingField];
        });
    }

    return (
        <div className="rounded-2xl shadow px-8 py-5 w-full lg:w-2/3 mb-4">
            <div className="font-semibold text-base">요일별 공부량</div>
            <div className="mt-2">
                <span className="font-bold text-sm">
                    {sortData[6]?.day}요일
                </span>
                에 가장 열심히 공부했네요!
            </div>
            <div className="flex justify-center mt-[30px] text-center">
                <LineChart
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
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="hour" stroke="#628D54" />
                </LineChart>
            </div>
        </div>
    );
}

export default DailyStudy;
