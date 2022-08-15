// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function AuthLogin() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const KAKAO_CODE = location.search.split("=")[1];

//     const REST_API_KEY = "c363c1414c4795051bf51aea0b37c03d";
//     const REDIRECT_URI = "http://localhost:8080/user/login";

//     // save TOKEN
//     const getKakaoToken = () => {
//         fetch(`https://kauth.kakao.com/oauth/token`, {
//             method: "POST",
//             headers: { "Content-Type": "application/x-www-form-urlencoded" },
//             body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.access_token) {
//                     localStorage.setItem("token", data.access_token);
//                 } else {
//                     navigate("/");
//                 }
//             });
//     };

//     useEffect(() => {
//         if (!location.search) return;
//         getKakaoToken();
//     }, []);

//     // 444를 만나면 유저가 에러상황인지 못하게 user/refresh로 GET요청 보내기
//     getKakaoToken.interceptors.response.use(
//         function (response) {
//             return response;
//         },

//         async function (error) {
//             const { config, response } = error;
//             const originalRequest = config;
//             if (response.data.status === 444) {
//                 await getKakaoToken.get(`/user/refresh`).then(
//                     ({ data }) => {
//                         getKakaoToken.defaults.headers.Authorization = `Bearer ${data}`;
//                         originalRequest.headers.Authorization = `Bearer ${data}`;
//                         return getKakaoToken(originalRequest).then((response) =>
//                             console.log(
//                                 response.status === 200 ? "성공" : "실패"
//                             )
//                         );
//                     },
//                     async ({ response }) => {
//                         if (response.data.status === 445) {
//                             if (originalRequest.url !== "/user/refresh") {
//                                 alert(response.data.message);
//                                 location.href = `http://localhost:8080/`;
//                             }
//                         }
//                         return Promise.reject(error);
//                     }
//                 );
//             }
//         }
//     );
//     // 445를 만나면 alert방식으로 로그인 필요하다는 걸 알려주고 메인페이지나 이 전 페이지로 보내기.

//     return <div>KAKAO LOGIN</div>;
// }

// export default AuthLogin;
