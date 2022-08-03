import React, { useState } from "react";
import Button from "../atoms/Button";

function MyProfile() {
  const username = "유교보이";
  const email = "dev.1upright@gmail.com";
  const message = "나는야 유교보이! 가보자고~";

  const [edit, setEdit] = useState(false);
  const clickedEdit = () => {
    setEdit((current) => !current);
  };

  return (
    <div className="rounded-2xl w-full mb-4 md:w-2/3 md:mb-0 shadow px-8 py-5">
      <div className="flex flex-wrap">
        <img
          className="inline-block h-32 w-32 rounded-full ring-4 ring-main mt-4 ml-2 mr-10"
          src="https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80"
          alt="profileImg"
        />
        <div>
          <div className="mt-2">
            <p className="text-font2 text-xs">닉네임</p>
            <h2 className="font-bold">{username}</h2>
          </div>
          <div className="my-5">
            <p className="text-font2 text-xs">이메일</p>
            <h2 className="font-bold">{email}</h2>
            <p className="mt-5 text-font2 text-xs">상태 메세지</p>
            <h2 className="font-bold">{message}</h2>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end">
        {edit ? null : (
          <button className="bg-sub1 text-font3 text-sm font-semibold rounded-full transition duration-0 w-[96px] py-2 mx-3 hover:bg-sub2 hover:duration-500">
            취소
          </button>
        )}
        <Button
          onClick={clickedEdit}
          text={edit ? "프로필 편집" : "프로필 저장"}
        />
      </div>
    </div>
  );
}

export default MyProfile;
