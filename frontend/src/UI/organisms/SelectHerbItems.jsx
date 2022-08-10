import HerbItemCard from "../atoms/HerbStoreItemCard";
import SelectItemList from "./SelectItemList";
import EmptyHerb from "../atoms/EmptyHerb";

// TODO: 나뭇잎 버튼을 클릭했을 때 모달창 띄워지고, 아이템 선택창 나옴
// FIXME: HerbItems 파일로 분리 해야 함

function HerbItemsStore() {
  return (
    <div>
      <label
        htmlFor="my-modal-5"
        className="btn btn-ghost text-main modal-button tooltip"
        data-tip="자네..허브를 심어보지 않겠나?"
      >
        <EmptyHerb />
      </label>

      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl p-8">
          <h3 className="font-bold text-2xl py-2">허브 심기</h3>
          {/* <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p> */}
          {/* <div className="grid grid-cols-2"> */}
          <div className="flex">
            <div>
              {/* 씨앗 */}
              <div className="py-4">
                <p className="font-semibold">STEP 1. 씨앗을 구매해요!</p>
                {/* flex-wrap을 할지 아니면 화면 크기 작아졌을 때 버튼 크기도 작아지게 할지 고민중 */}
                <div className="flex flex-wrap">
                  <HerbItemCard
                    imgUrl={
                      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    }
                    title={"일반 씨앗"}
                    price={"0"}
                    item={"seed"}
                  />
                  <HerbItemCard
                    imgUrl={
                      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    }
                    title={"희귀 씨앗"}
                    price={"100"}
                    item={"seed"}
                  />
                  <HerbItemCard
                    imgUrl={
                      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    }
                    title={"영웅 씨앗"}
                    price={"200"}
                    item={"seed"}
                  />
                  <HerbItemCard
                    imgUrl={
                      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    }
                    title={"전설 씨앗"}
                    price={"300"}
                    item={"seed"}
                  />
                  <HerbItemCard
                    imgUrl={
                      "https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    }
                    title={"미스테리 씨앗"}
                    price={"150"}
                    item={"seed"}
                  />
                </div>
              </div>

              {/* 비료 */}
              <div className="py-4">
                <p className="font-semibold">STEP2. 비료를 구매해요!</p>
                <div className="flex flex-wrap">
                  <HerbItemCard
                    imgUrl={
                      "https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }
                    title={"일반 비료"}
                    price={"50"}
                    item={"fertilizer"}
                  />
                  <HerbItemCard
                    imgUrl={
                      "https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }
                    title={"고급 비료"}
                    price={"100"}
                    item={"fertilizer"}
                  />
                  <HerbItemCard
                    imgUrl={
                      "https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }
                    title={"프로틴 비료"}
                    price={"200"}
                    item={"fertilizer"}
                  />
                  <HerbItemCard
                    imgUrl={
                      "https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }
                    title={"최상급 비료"}
                    price={"300"}
                    item={"fertilizer"}
                  />
                </div>
              </div>
              {/* 물뿌리개 */}
              <div className="py-4">
                <p className="font-semibold">STEP3. 물뿌리개를 구매해요!</p>
                <div className="flex flex-wrap">
                  <HerbItemCard
                    imgUrl={
                      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80"
                    }
                    title={"일반 물뿌리개"}
                    price={"100"}
                    item={"water"}
                  />
                  <HerbItemCard
                    imgUrl={
                      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80"
                    }
                    title={"고급 물뿌리개"}
                    price={"200"}
                    item={"water"}
                  />
                </div>
              </div>
            </div>
            <div>
              <SelectItemList />
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-5" className="btn">
              심으러 가기
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HerbItemsStore;
