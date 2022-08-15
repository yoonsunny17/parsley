import { useState } from "react";

function StudyKing() {
    const [activeIndex, setActiveIndex] = useState(0);

    const tabClickHandler = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="bg-white rounded-3xl border-4 border-main w-full relative">
            {/* Tab */}
            <div className="absolute top-[-44px] left-[40px]">
                <div className="flex list-none text-lg gap-[10px]">
                    {tabContArr.map(({ title }, idx) => (
                        <button
                            key={`tab-` + idx}
                            onClick={() => tabClickHandler(idx)}
                            className={
                                (activeIndex === idx
                                    ? "bg-main "
                                    : "bg-sub2 hover:bg-main ") +
                                "color-delay cursor-pointer text-font3 font-semibold text-base rounded-t-2xl h-[44px] px-3"
                            }
                        >
                            {title}
                        </button>
                    ))}
                </div>
            </div>
            {/* Content */}
            <div className="px-6 md:px-10 py-6 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 md:gap-x-5">
                스터디 내 공부왕 순위
            </div>
        </div>
    );
}

const tabContArr = [{ title: "공부왕" }, { title: "농부왕" }];

export default StudyKing;
