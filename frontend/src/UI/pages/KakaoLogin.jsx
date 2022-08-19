import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useKakaoLoginQuery } from "../../services/auth";
import { useLazyGetUserQuery } from "../../services/user";

function KakaoLogin() {
    const location = useLocation();
    const navigate = useNavigate();

    const code = location.search.split("=")[1];
    const { isLoading, isSuccess, error } = useKakaoLoginQuery(code);
    const [getUser] = useLazyGetUserQuery();

    useEffect(() => {
        if (!isLoading) {
            if (isSuccess) {
                getUser();
            }
            navigate("/");
        }
    });

    return <div>카카오 로그인중...</div>;
}

export default KakaoLogin;
