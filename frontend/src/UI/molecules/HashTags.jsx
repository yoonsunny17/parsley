import { useState } from "react";

function HashTags() {
  const [hashTag, setHashTag] = useState("");
  const [hashTagList, setHashTagList] = useState([]);

  const onChangeHashTag = (event) => {
    // event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.value.length);

    if (event.target.value.length !== 0 && event.key === "Enter") {
      saveHashTag();
    }
  };

  const saveHashTag = () => {
    const updatedHashTagList = [...hashTagList];
    updatedHashTagList.push(hashTag);
    setHashTagList(updatedHashTagList);
    setHashTag("");
  };

  const deleteHashTag = (event) => {
    // const deleteHashTag = event.target.parentElement.firstChild.innerText;
    const deleteHashTag = event.target.parentElement.parentElement.firstChild;
    const filteredHashTagList = hashTagList.filter(
      (hashTag) => hashTag !== deleteHashTag
    );
    setHashTagList(filteredHashTagList);
    console.log(event.target.parentElement.parentElement.firstChild);
  };

  return (
    <div className="">
      <div className="flex items-center flex-wrap h-10 px-3 input-border rounded-md bg-extra4 ">
        {hashTagList.map((hashTag, idx) => {
          return (
            <div
              className="flex items-center justify-between m-1 p-1 rounded-lg bg-sub1 text-sm"
              key={idx}
            >
              {hashTag}
              <button
                className="flex justify-center items-center w-4 h-4"
                onClick={deleteHashTag}
              >
                <i className="bx bx-x"></i>
              </button>
            </div>
          );
        })}
        <input
          className="inline-flex cursor-text focus:outline-none text-md pl-1 w-auto h-auto rounded-md bg-extra4 input-placeholder"
          type="text"
          placeholder="해시태그를 추가하세요"
          tabIndex={2}
          value={hashTag}
          onChange={(event) => setHashTag(event.target.value)}
          onKeyPress={onChangeHashTag}
        />
      </div>
    </div>
  );
}

export default HashTags;
