import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSearchListQuery } from "../../services/room";
import { history } from "../../modules/store";

function SearchBar() {
  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    navigate(`/room/search?word=`);
  };

  const [search, setSearch] = useState("");

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
          <form
            action={`/room/search/${search}`}
            method="GET"
            onSubmit={(e) => {
              e.preventDefault();
              history.push(`/room/search/${search}`);
              setSearch("");
              console.log(search);
            }}
            onKeyPress={searchEnter}
          >
            <input
              value={search}
              // onKeyPress={searchEnter}
              className="rounded-md bg-extra4 px-3 py-1 input-border input-placeholder"
              type="text"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
