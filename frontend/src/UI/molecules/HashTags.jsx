import { useState } from "react";

function HashTags(props) {
    const [hashTag, setHashTag] = useState("");
    const [hashTagList, setHashTagList] = useState([]);

    const saveHashTag = () => {
        const updatedHashTagList = [...hashTagList, `${hashTag}`];
        setHashTagList(updatedHashTagList);
        props.setRoom((prev) => ({
            ...prev,
            hashtags: updatedHashTagList,
        }));
        setHashTag("");
    };

    const deleteHashTag = (event) => {
        const removeHashTag = event.target.innerText;
        const filteredHashTagList = hashTagList.filter(
            (hashTag) => hashTag !== removeHashTag
        );
        setHashTagList(filteredHashTagList);
        props.setRoom((prev) => ({
            ...prev,
            hashtags: filteredHashTagList,
        }));
    };

    const handleChange = (event) => {
        if (event.target.value.length !== 0 && event.key === "Enter") {
            saveHashTag();
        }
    };

    return (
        <div className="w-full">
            <div className="flex content-center items-center flex-wrap border-2 h-auto w-fit px-3 input-border rounded-md bg-extra4 ">
                {hashTagList.map((hashTag, idx) => {
                    return (
                        <div
                            onClick={deleteHashTag}
                            className="flex items-center justify-between m-1 p-1 rounded-lg bg-sub1 text-sm cursor-pointer"
                            key={idx}
                        >
                            {`# ${hashTag}`}
                        </div>
                    );
                })}

                <input
                    className="inline-flex cursor-text focus:outline-none text-md pl-1 w-fit h-8 rounded-md bg-extra4 input-placeholder"
                    type="text"
                    placeholder="해시태그를 추가하세요"
                    tabIndex={2}
                    value={hashTag}
                    onChange={(event) => setHashTag(event.target.value)}
                    onKeyPress={handleChange}
                />
            </div>
        </div>
    );
}

export default HashTags;
