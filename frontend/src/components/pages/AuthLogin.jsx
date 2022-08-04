import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AuthLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];

  // 이거 써줘야하는건지 모르겠으나 안써주면 error 나서 써줌
  const REST_API_KEY = "c363c1414c4795051bf51aea0b37c03d";
  const REDIRECT_URI = "http://localhost:8080/user/login";

  // save TOKEN
  const getKakaoToken = () => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
        } else {
          navigate("/");
        }
      });
  };

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken();
  }, []);

  return <div>KAKAO LOGIN</div>;
}

export default AuthLogin;
