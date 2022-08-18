import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSearchListQuery } from "../../services/room";
import { history } from "../../modules/store";

function SearchBarTest() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleSearch = () => {
    setIsOpen((current) => !current);
  };

  const onSubmit = async (e) => {
    // 엔터를 치면 내가 검색하려는 검색어에 해당하는 주소로 이동
    handleEnter();
    const { word } = await getSearchList().unwrap(); // data 보내줘
    navigate(`/room/search?search_word=${word}`);
  };

  const handleEnter = (e) => e.key === "Enter" && e.preventDefault();

  return (
    <div className="flex">
      <button
        onClick={toggleSearch}
        className="text-3xl mr-1 flex items-center"
      >
        <i className="bx bx-search"></i>
      </button>
      {isOpen ? (
        <div>
          <form onSubmit={onSubmit} onKeyPress={handleEnter}>
            <input
              type="text"
              className="rounded-md bg-extra4 px-3 py-1 input-border input-placeholder"
            />
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default SearchBarTest;
