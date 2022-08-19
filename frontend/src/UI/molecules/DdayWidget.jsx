import React, { useState, useEffect } from "react";
import { useCreateDDayMutation } from "../../services/study";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import "moment/locale/ko";

function DdayWidget() {
  const [showModal, setShowMdoal] = React.useState(false);
  const handleModal = () => {
    setShowMdoal((current) => !current);
  };

  const user = useSelector((state) => state.user.user);
  const pastDDay = user?.dDay;
  const [dDay, setDDay] = useState(null);
  const [dDayDate, setDDayDate] = useState("디데이를 설정해 주세요");

  const [createDDay] = useCreateDDayMutation();

  const calcDiff = (curDDay) => {
    const today = new Date();
    const realToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const diff = parseInt(
      (new Date(curDDay).getTime() - realToday.getTime() - 1000 * 60 * 60 * 9) /
        (1000 * 60 * 60 * 24)
    );
    let diffText;

    if (diff > 0) {
      diffText = diff * -1;
    } else if (diff === 0) {
      diffText = "-day";
    } else {
      diffText = "+" + diff * -1;
    }
    return diffText;
  };

  let curr = new Date();
  curr.setDate(curr.getDate());
  let date = curr.toISOString().substring(0, 10);

  useEffect(() => {
    if (pastDDay) {
      const diffText = calcDiff(pastDDay);
      setDDay(pastDDay);
      setDDayDate("D " + diffText);
      // setText(pastDDay + " D" + diffText);
    }
  });

  return (
    <div className="rounded-2xl w-full mb-4 md:mb-0 shadow py-4 flex justify-center">
      <div className="flex">
        <div className="my-2 font-bold">{dDay}</div>
        <div className="my-6 text-xl font-bold">{dDayDate}</div>
      </div>
      <div className="relative left-6">
        <Link to="/me">
          <FaCog color="#333333" size={14} />
        </Link>
      </div>
    </div>
  );
}

export default DdayWidget;
