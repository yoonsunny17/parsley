import React, { useState } from "react";
import Button from "../atoms/Button";
import kakao_oauth from "../../assets/kakao_login_large_narrow.png";
import DdayWidget from "../molecules/DdayWidget";
import StudyWidget from "../molecules/StudyWidget";
import { Link } from "react-router-dom";

function Drawer({ children }) {
    // kakao social login
    const REST_API_KEY = "c363c1414c4795051bf51aea0b37c03d";
    const REDIRECT_URI = "http://localhost:8080/user/login";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

    const [isLogin, setIsLogin] = useState(false);

    const userSley = 10000;
    const bookPoint = 9500;
    const user = "유교보이";

    const loginHandler = () => {
        window.location.href = KAKAO_AUTH_URL;
    };
    const logoutHandler = () => {
        setIsLogin(false);
    };

    return (
        <div className="text-font1 drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">{children}</div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                {/* 로그인한 사용자인 경우 */}
                {isLogin && (
                    <div className="p-10 overflow-y-auto w-[380px] bg-bg rounded-tl-3xl rounded-bl-3xl">
                        <div className="flex justify-between text-sub1">
                            <i className="bx bxs-user-circle text-5xl"></i>
                            <div className="text-font5 font-normal text-base mb-6">
                                <span className="flex justify-end font-semibold">{`${userSley} 슬리`}</span>
                                <span className="flex justify-end font-semibold">{`${bookPoint} 포인트`}</span>
                            </div>
                        </div>

                        <div className="text-font1 font-bold text-2xl mb-3">
                            <div>
                                {user} 님 <br />
                                항상 잘 하고 있어요!
                            </div>
                        </div>
                        <div className="mb-6 flex justify-start gap-3">
                            <Link to="/me">
                                <Button text={"마이페이지"} />
                            </Link>
                            <Button text={"로그아웃"} onClick={logoutHandler} />
                        </div>

                        {/* ========위젯========= */}
                        <div className="flex flex-col gap-5">
                            <DdayWidget />
                            <StudyWidget />
                        </div>
                    </div>
                )}
                {/* 로그인하지 않은 사용자인 경우 */}
                {!isLogin && (
                    <div className="p-10 pt-24 overflow-y-auto w-[380px] bg-bg rounded-tl-3xl rounded-bl-3xl">
                        <div className="text-center text-3xl font-bold text-font1 mb-6 font-basic">로그인</div>
                        <div className="text-center text-lg font-normal text-font5 mb-16">
                            파슬리와 함께 공부하면서 <br />
                            허브 도감을 채워보세요!
                        </div>
                        <div className="flex justify-center">
                            <button className="w-48 h-12" onClick={loginHandler}>
                                <img src={kakao_oauth} alt="카카오 로그인" className="kakao object-fill" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drawer;
