function TodayStudyTime() {
  const FULL_MINUTES = 1440;
  const DAILY_STUDY_LOG = [
    {
      startTime: "2022-08-13 00:02:30.271000",
      endTime: "2022-08-13 00:32:33.271000",
    },
    {
      startTime: "2022-08-13 00:38:36.205000",
      endTime: "2022-08-13 01:21:39.533000",
    },
    {
      startTime: "2022-08-13 02:29:36.205000",
      endTime: "2022-08-13 04:24:39.533000",
    },
    {
      startTime: "2022-08-13 04:29:36.205000",
      endTime: "2022-08-13 04:59:39.533000",
    },
    {
      startTime: "2022-08-13 05:29:36.205000",
      endTime: "2022-08-13 05:59:39.533000",
    },
    {
      startTime: "2022-08-13 15:29:36.205000",
      endTime: "2022-08-13 16:59:39.533000",
    },
  ];

  const STUDY_CLASS_NAME_DICT = {};

  DAILY_STUDY_LOG.forEach((e) => {
    const START_TIME = new Date(e.startTime);
    const END_TIME = new Date(e.endTime);

    const START_HOUR_TO_MINUTE =
      START_TIME.getHours() * 60 + START_TIME.getMinutes();
    const END_HOUR_TO_MINUTE = END_TIME.getHours() * 60 + END_TIME.getMinutes();

    const start_id_num = parseInt(START_HOUR_TO_MINUTE / 10) * 10;
    const end_id_num = parseInt(END_HOUR_TO_MINUTE / 10) * 10;

    for (
      let study_id_num = start_id_num;
      study_id_num <= end_id_num;
      study_id_num = study_id_num + 10
    ) {
      let now_block_min = 10;
      if (study_id_num === start_id_num) {
        now_block_min = 10 - (START_HOUR_TO_MINUTE % 10);
      } else if (study_id_num === end_id_num) {
        now_block_min = END_HOUR_TO_MINUTE % 10;
      }

      const now_block_opacity = now_block_min * 10;
      if (STUDY_CLASS_NAME_DICT[study_id_num]) {
        STUDY_CLASS_NAME_DICT[study_id_num] =
          STUDY_CLASS_NAME_DICT[study_id_num] + now_block_opacity;
      } else {
        STUDY_CLASS_NAME_DICT[study_id_num] = now_block_opacity;
      }
    }
  });

  const BOX_RENDER_LIST = new Array(FULL_MINUTES / 10)
    .fill(null)
    .map((_, index) => index * 10);
  const MINUTE = [];

  while (BOX_RENDER_LIST.length) {
    MINUTE.push(BOX_RENDER_LIST.splice(0, 6));
  }

  return (
    <div className="rounded-2xl shadow px-8 py-5 w-full lg:w-2/3 md:w-[100%] p-[28px_30px]">
      <div className="font-basic text-[24px] font-bold mb-[40px] ">
        오늘의 공부량
      </div>
      <div className=" flex flex-col items-center justify-center">
        <div className="flex justify-center ml-[-115px] gap-[100px] text-[14px] font-bold">
          <div>0h</div>
          <div>6h</div>
          <div>12h</div>
          <div>18h</div>
        </div>
        <div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-[100px] mr-[20px] text-[14px] font-bold">
              <div>10m</div>
              <div>60m</div>
            </div>
            {MINUTE.map((min) => (
              <div className="flex flex-col">
                {min.map((v) => (
                  <div
                    className={`${v} w-[15px] h-[15px] rounded-[4px] border-[0.5px] border-font2 bg-[#D9D9D9] relative m-[4px] overflow-hidden`}
                  >
                    {/* for문으로 스타트타임 분으로 환산한것을 이차원 배열에서 위치 찾을때 까지 돌려서
                                       찾으면 그때부터 칠하기 시작, 엔드 타임 나올때까지 칠하고, */}
                    <div
                      className="bg-sub1 absolute left-0 top-0 w-full h-full"
                      style={{
                        opacity: STUDY_CLASS_NAME_DICT[v]
                          ? STUDY_CLASS_NAME_DICT[v] / 100
                          : 0,
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TodayStudyTime;
