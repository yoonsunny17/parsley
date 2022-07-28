import React from "react";

function Button({ text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="color-delay rounded-full px-4 py-2 text-sm font-semibold bg-main hover:bg-sub2 text-font3"
        >
            {text}
        </button>
    );
}

export default Button;
