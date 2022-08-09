import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login, setToken, setUserId } from "../../modules/userReducer";
import { useKakaoLoginQuery } from "../../services/user";
import { parseJwt } from "../../util/common";

function KakaoLogin() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const code = location.search.split("=")[1];
    const { data, isLoading } = useKakaoLoginQuery(code);

    if (!isLoading) {
        if (data?.statusCode === 200) {
            dispatch(login());
            dispatch(setToken(data?.accessToken));
            dispatch(setUserId(parseJwt(data?.accessToken)));
        } else {
            // TODO: 예외 처리
            console.log("예외 발생");
        }
        navigate("/");
    }

    return <div>카카오 로그인중...</div>;
}

export default KakaoLogin;
