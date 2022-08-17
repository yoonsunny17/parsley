import React from "react";
import { FaCrown } from "react-icons/fa";
import { useSelector } from "react-redux";

function StudyRoomItem({
    info: {
        name,
        imageUrl,
        mode,
        hostUser,
        hashTags,
        description,
        maxPopulation,
        public: isPublic,
    },
}) {
    const user = useSelector((state) => state.user.user);

    return (
        <div className="cursor-pointer rounded-2xl w-full aspect-square shadow overflow-hidden relative brightness-[0.98] min-w-[180px] hover:scale-[1.02] duration-150">
            <img
                src={imageUrl}
                alt=""
                className="w-full h-full absolute object-cover"
            />
            <div className="absolute flex flex-col justify-between top-0 left-0 w-full h-full px-4 py-3 z-10 bg-extra5 bg-opacity-[0.22] font-medium text-white">
                <div className="w-full flex justify-between text-sm">
                    <span className="bg-extra5 bg-opacity-50 w-5/12 lg:w-2/5 2xl:w-1/4 rounded-md text-center">
                        {!isPublic ? (
                            ""
                        ) : (
                            <i className="bx bxs-lock align-middle"></i>
                        )}
                        {mode === 0 ? " 손꾸락" : " 얼구리"}
                    </span>
                    <span>
                        {hostUser.id === user.id && (
                            <FaCrown className="text-lg text-yellow-300" />
                        )}
                    </span>
                </div>
                <div className="w-full flex justify-between">
                    <div className="w-2/3">
                        <div className="w-full truncate text-sm md:text-base xl:text-lg font-semibold">
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
