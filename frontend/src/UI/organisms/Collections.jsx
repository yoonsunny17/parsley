import { useState } from "react";
import CollectionItem from "../molecules/CollectionItem";
// import CollectionItem from "../molecules/CollectionItem";

function Collections() {
    const username = "유교보이";

    const [myHerb, setMyHerb] = useState(0);
    const tabHerbHandler = (index) => {
        setMyHerb(index);
    };

    return (
        <div className="w-full mb-5 rounded-3xl bg-white drop-shadow px-8 py-5 lg:w-2/3 lg:mb-0">
            <header className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{username} 님의 도감</h3>
                {/* <button className="rounded-full px-2 py-1 bg-main hover:bg-sub2 text-font3 text-sm mr-11 mt-11">
                    내 농장 가기
                </button> */}
                <button className="rounded-full px-2 py-1 bg-main hover:bg-sub2 text-font3 text-sm visible sm:invisible">
                    더보기
                </button>
            </header>
            {/* <div className="flex flex-wrap flex-row items-center justify-around"> */}
            {/* <div className="grid lg:grid-cols-2"> */}
            <div className="grid lg:grid-cols-largeCollections items-center justify-center">
                <div className="flex flex-col items-center mt-5">
                    <img
                        className="rounded-full w-32 h-32"
                        src="https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        alt="profileHerb"
                    />
                    <div className="my-3">먹다남긴상추</div>
                </div>
                <div className="px-6 pt-8 md:px-10 w-full grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-x-1 gap-y-5 md:gap-x-5 lg:px-0 lg:mx-1 lg:pt-4 lg:gap-y-3">
                    {tabHerbArr[myHerb].herbCollectionList.map((info, idx) => {
                        return <CollectionItem info={info} key={idx} />;
                    })}
                </div>
            </div>
        </div>
    );
}

const tabHerbArr = [
    {
        title: "허브 도감",
        herbCollectionList: [
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
            {
                name: "멍멍이",
                imageUrl:
                    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            },
        ],
    },
];

export default Collections;

// class="md:px-10 w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-2 md:gap-x-5"
