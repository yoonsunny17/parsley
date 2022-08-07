import React from "react";

function StudyRoomItem({
    info: {
        name,
        imageUrl,
        mode,
        hashTags,
        description,
        maxPopulation,
        isPublic,
    },
}) {
    return (
        <div className="cursor-pointer rounded-2xl w-full aspect-square shadow overflow-hidden relative brightness-[0.98] min-w-[180px] hover:scale-[1.02] duration-150">
            <img
                src={imageUrl}
                alt=""
                className="w-full h-full absolute object-cover"
            />
            {/* <div className="absolute top-0 left-0 w-full h-full z-20 font-semibold text-white"></div> */}
            <div className="absolute flex flex-col justify-between top-0 left-0 w-full h-full px-4 py-3 z-10 bg-extra5 bg-opacity-[0.22] font-semibold text-white">
                <div className="w-full flex justify-between text-sm">
                    <span className="bg-extra5 bg-opacity-50 w-5/12 lg:w-2/5 2xl:w-1/4 rounded-md text-center">
                        {/* {isPublic ? "공개" : "비공개"} */}
                        {isPublic ? <i className="bx bxs-lock"></i> : null}
                        {mode === 0 ? " 손꾸락" : " 얼구리"}
                    </span>
                </div>
                <div className="w-full flex justify-between">
                    <div className="w-2/3">
                        <div className="w-full truncate text-sm md:text-base xl:text-lg">
                            {name}
                        </div>
                        <div className="w-full truncate text-xs xl:text-sm">
                            {description}
                        </div>
                    </div>
                    <div>{maxPopulation}명</div>
                </div>
            </div>
        </div>
    );
}

export default StudyRoomItem;
