import React from "react";

function Button({ text, type, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="color-delay rounded-full px-4 py-2 text-sm font-medium bg-main hover:bg-sub2 text-font3"
        >
            {text}
        </button>
    );
}

export default Button;
