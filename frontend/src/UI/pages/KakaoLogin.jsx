import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useKakaoLoginQuery } from "../../services/user";

function KakaoLogin() {
    const location = useLocation();
    const navigate = useNavigate();

    const code = location.search.split("=")[1];
    const { isLoading } = useKakaoLoginQuery(code);

    if (!isLoading) {
        navigate("/");
    }

    return <div>카카오 로그인중...</div>;
}

export default KakaoLogin;
