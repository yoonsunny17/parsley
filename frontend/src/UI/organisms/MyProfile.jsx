import React, { useState } from "react";
import Button from "../atoms/Button";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../services/user";

function MyProfile() {
    const user = useSelector((state) => state.user.user);
    const today = new Date();
    const regDate = new Date(user?.regDate);
    const togetherDays = parseInt(
        (today.getDate() - regDate.getDate() + 1000 * 60 * 60 * 9) /
            (1000 * 60 * 60 * 24) +
            1
    );

    const initialValue = {
        name: user ? user.name : "",
        description: user ? user.description : "",
        profileImgUrl: user ? user.profileImgUrl : "",
    };

    const [newUser, setNewUser] = useState(initialValue);
    const [updateUser] = useUpdateUserMutation();
    const [edit, setEdit] = useState(false);

    const onCancel = () => {
        setEdit(false);
    };

    const handleChange = ({ target }) => {
        setNewUser((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(newUser);
        setEdit(false);
    };

    const handleEnter = (e) => e.key === "Enter" && e.preventDefault();

    return (
        <div className="rounded-2xl w-full mb-4 md:w-2/3 md:mb-0 shadow px-8 py-8 relative flex flex-col gap-5">
            <div className="text-lg font-semibold">
                파슬리와 함께한지 {togetherDays}일째!
            </div>
            <form
                onSubmit={handleSubmit}
                onKeyPress={handleEnter}
                className="flex flex-col gap-3"
            >
                <div className="flex gap-8 w-full">
                    <img
                        className="inline-block h-32 w-32 rounded-full ring-4 ring-main"
                        src="https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80"
                        alt="profileImg"
                    />

                    <div className="flex flex-col gap-4">
                        {/* 닉네임 */}
                        <div className="">
                            <p className="text-font2 text-xs mb-1">닉네임</p>
                            <input
                                disabled={!edit}
                                onChange={handleChange}
                                type="text"
                                name="name"
                                className={
                                    `rounded-lg bg-white` +
                                    (edit ? `border-[2px] border-main` : ``)
                                }
                                value={newUser?.name}
                            />
                        </div>
                        {/* 자기소개 */}
                        <div className="">
                            <p className="text-font2 text-xs mb-1">자기소개</p>
                            <input
                                disabled={!edit}
                                onChange={handleChange}
                                type="text"
                                name="description"
                                className={
                                    `rounded-lg bg-white` +
                                    (edit ? `border-[2px] border-main` : ``)
                                }
                                value={newUser?.description}
                            />
                        </div>
                        {/* 포인트 */}
                        <div className="">
                            <p className="text-font2 text-xs mb-1">
                                슬리 / 도감 포인트
                            </p>
                            <span className="text-base">
                                {user?.currentSley} Sley /{" "}
                                {user?.currentBookPoint} P
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer: 버튼 */}
                <div className="w-full flex justify-end">
                    {edit && (
                        <>
                            {" "}
                            <button
                                onClick={onCancel}
                                className="bg-sub1 mr-[10px] text-font3 text-sm font-semibold rounded-full transition duration-0 w-[96px] py-2  hover:bg-sub2 hover:duration-500"
                            >
                                취소
                            </button>
                            <button
                                disabled={
                                    user?.name?.length === 0 &&
                                    user?.description?.length === 0
                                        ? true
                                        : false
                                }
                                type="submit"
                                className="color-delay rounded-full px-4 py-2 text-sm font-semibold bg-main hover:bg-sub2 text-font3"
                            >
                                프로필 저장
                            </button>
                        </>
                    )}
                    {!edit && (
                        <Button
                            text={"프로필 편집"}
                            onClick={() => setEdit(true)}
                        />
                    )}
                </div>
            </form>
        </div>
    );
}

export default MyProfile;
