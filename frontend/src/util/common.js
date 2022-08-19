import Swal from "sweetalert2";

export const parseJwt = (token) => {
    const base64Url = token.split(".")[1]; // payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map((c) => {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(payload);
};

export const Toast = Swal.mixin({
    toast: true,
    width: 320,
    position: "top-right",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});
