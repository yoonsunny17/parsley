<div className="shadow rounded-xl lg:w-[300px] h-auto my-3 ml-10 py-3">
  <p className="text-lg mt-4 font-semibold text-center">구매 목록</p>
  <div className="mt-6 flex flex-col ">
    {/* 씨앗 선택 내역 */}
    <div className="flex mb-3 items-center justify-around">
      <div className="flex flex-row items-center">
        <HerbItemAvatar
          imgUrl={
            "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          }
        />
      </div>
      <div>
        <p>{selectedItemsArr[0]}</p>
        <span className="flex badge">{selectedItemsPriceArr[0]} 슬리</span>
      </div>
    </div>

    {/* 비료 선택 내역 */}
    <div className="flex mb-3 items-center justify-around">
      <div className="flex flex-row items-center">
        <HerbItemAvatar
          imgUrl={
            "https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }
        />
        <p>{selectedItemsArr[1]}</p>
      </div>
      <span className="flex badge">{selectedItemsPriceArr[1]} 슬리</span>
    </div>

    {/* 물뿌리개 선택 내역 */}
    <div className="flex items-center justify-around">
      <div className="flex flex-row items-center">
        <HerbItemAvatar
          imgUrl={
            "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80"
          }
        />
        {/* <p>{selectedwater} 물뿌리개</p> */}
        <p>{selectedItemsArr[2]}</p>
      </div>
      <span className="flex badge">{selectedItemsPriceArr[2]} 슬리</span>
    </div>
  </div>
  <div className="m-10 font-semibold text-center text-xl">
    총 {totalSley} 슬리 입니다
    <p className="text-base font-normal py-3">이제 심으러 가볼까요?</p>
  </div>
  <div className="flex items-center justify-evenly">
    <button
      // onClick={handleReset}
      className="color-delay rounded-full px-4 py-2 text-sm font-semibold bg-main hover:bg-sub2 text-font3"
    >
      초기화 <i class="bx bx-revision"></i>
    </button>
    <button className=" color-delay rounded-full text-sm font-semibold bg-main hover:bg-sub2 text-font3">
      <label
        htmlFor="my-modal-3"
        className="cursor-pointer px-4 py-2"
        // onClick={handleChange}
      >
        선택 완료{/* <i class="bx bx-x bx-sm"></i> */}
      </label>
    </button>
  </div>
</div>;
