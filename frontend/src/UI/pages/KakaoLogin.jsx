import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, token } from "../../modules/userReducer";
import { useKakaoLoginQuery } from "../../services/user";

function KakaoLogin() {
    const location = useLocation();
    const navigate = useNavigate();
    const code = location.search.split("=")[1];
    const { data, isLoading } = useKakaoLoginQuery(code);

    if (!isLoading) {
        if (data?.statusCode === 200) {
            login();
            token(data?.accessToken);
        } else {
            // TODO: 예외 처리
            console.log("예외 발생");
        }
        navigate(-1);
    }

    return <div>카카오 로그인중...</div>;
}

export default KakaoLogin;
