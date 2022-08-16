import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import { useSelector } from "react-redux";

function MyProfile() {
    const [username, setUserName] = useState("");
    const handleName = (e) => {
        setUserName(e.target.value);
    };

    const [message, setMessage] = useState("");
    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const [edit, setEdit] = useState(false);
    const clickedEdit = () => {
        setEdit((current) => !current);
    };

    const onCancel = () => {
        setEdit(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const user = useSelector((state) => state.user.user);
    const today = new Date();
    const regDate = new Date(user.regDate);
    const togetherDays = parseInt((today.getTime() - regDate.getTime())/(1000*60*60*24)+1);

    return (
        <div className="rounded-2xl w-full mb-4 md:w-2/3 md:mb-0 shadow px-8 py-8 flex relative">
            <div className="flex">
                <img
                    className="inline-block h-32 w-32 rounded-full ring-4 ring-main mt-4 ml-2 mr-10"
                    src="https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80"
                    alt="profileImg"
                />
                <div className="flex">
                    <form onSubmit={onSubmit} className="flex">
                        <div>
                            <div className="mt-2">
                                <p className="text-font2 text-xs mb-[5px]">
                                    닉네임
                                </p>
                                {edit ? (
                                    <input
                                        onChange={handleName}
                                        type="text"
                                        className="border-[2px] border-main rounded-[10px] p-[1px_5px]"
                                        value={user.name}
                                    />
                                ) : (
                                    <>
                                        <h2 className="font-bold">
                                            {user.name}
                                        </h2>
                                    </>
                                )}
                            </div>
                            <div className="my-5">
                                {/* <p className="mt-5 text-font2 text-xs">상태 메세지</p> */}
                                <p className="mt-5 text-font2 text-xs">
                                    자기소개
                                </p>
                                {edit ? (
                                    <input
                                        onChange={handleMessage}
                                        type="text"
                                        className="border-[2px] border-main rounded-[10px] p-[1px_5px]"
                                        value={user.description}
                                    />
                                ) : (
                                    <>
                                        <h2 className="font-bold">{user.description ? user.description : "자기소개를 등록해보세요!"}</h2>
                                    </>
                                )}
                            </div>
                            <div className="my-5">
                                <p className="mt-5 text-font2 text-xs">
                                    슬리 / 도감 포인트
                                </p>
                                <h2 className="font-bold">{user.currentBookPoint}Sley / {user.currentBookPoint}P</h2>
                            </div>
                            <div>
                            <p className="text-xs">
                                파슬리와 함께한지 {togetherDays}일째!
                            </p>
                        </div>
                        </div>
                        <div className="absolute bottom-[20px] right-[32px]">
                            {edit ? (
                                <button
                                    onClick={onCancel}
                                    className="bg-sub1 mr-[10px] text-font3 text-sm font-semibold rounded-full transition duration-0 w-[96px] py-2  hover:bg-sub2 hover:duration-500"
                                >
                                    취소
                                </button>
                            ) : null}
                            {edit ? (
                                <button
                                    disabled={
                                        username.length === 0 &&
                                        message.length === 0
                                            ? true
                                            : false
                                    }
                                    type="submit"
                                    onClick={clickedEdit}
                                    className="color-delay rounded-full px-4 py-2 text-sm font-semibold bg-main hover:bg-sub2 text-font3"
                                >
                                    프로필 저장
                                </button>
                            ) : (
                                <button onClick={clickedEdit}>
                                    <FaCog />
                                </button>
                                // <button
                                //     onClick={clickedEdit}
                                //     className="color-delay rounded-full px-4 py-2 text-sm font-semibold bg-main hover:bg-sub2 text-font3"
                                // >
                                //     프로필 편집
                                // </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
