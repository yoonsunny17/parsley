import React, { useState } from "react";

function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSearch = () => {
        setIsOpen((current) => !current);
    };

    const searchEnter = (e) => {
        if (e.key === "Enter") {
            isEnter();
        }
    };

    const isEnter = () => {
        console.log("hello");
    };

    return (
        <div className="flex">
            <button onClick={toggleSearch} className="flex items-center">
                <i className="bx bx-search text-3xl"></i>
            </button>
            {isOpen && (
                <input
                    onKeyPress={searchEnter}
                    className="rounded-md ml-2 bg-extra4 px-3 py-1 input-border input-placeholder"
                    type="text"
                />
            )}
        </div>
    );
}

export default SearchBar;
