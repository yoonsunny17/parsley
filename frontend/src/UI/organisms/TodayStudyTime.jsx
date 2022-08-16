import { useGetLogQuery } from "../../services/study";

function TodayStudyTime() {
    const FULL_MINUTES = 1440;
    const { data } = useGetLogQuery({}, { refetchOnMountOrArgChange: true });

    const STUDY_CLASS_NAME_DICT = {};

    data?.dailyStudyLogs.forEach((e) => {
        const START_TIME = new Date(e.startTime);
        const END_TIME = new Date(e.endTime);

        const START_HOUR_TO_MINUTE =
            START_TIME.getHours() * 60 + START_TIME.getMinutes();
        const END_HOUR_TO_MINUTE =
            END_TIME.getHours() * 60 + END_TIME.getMinutes();

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
    // console.log(MINUTE); // 한 줄 한 시간

    // MORNING, AFTERNOON, NIGHT
    const MORNING = [];
    const AFTERNOON = [];
    const NIGHT = [];
    for (let i = 0; i < MINUTE.length; i++) {
        if (i <= 7) {
            MORNING.push(MINUTE[i]);
        }
    }
    for (let i = 8; i <= MINUTE.length; i++) {
        if (i <= 15) {
            AFTERNOON.push(MINUTE[i]);
        }
    }
    for (let i = 16; i <= MINUTE.length; i++) {
        if (i <= 23) {
            NIGHT.push(MINUTE[i]);
        }
    }

    // console.log(MORNING);
    // console.log(AFTERNOON);
    // console.log(NIGHT);

    return (
        <div className="rounded-2xl shadow px-8 py-5 w-full lg:w-2/3 md:w-[100%]">
            <div className="text-xl font-bold">오늘의 공부 기록</div>

            <div className="flex flex-wrap justify-center mt-6 mb-3">
                {/* MORNING */}
                <div className="mx-6 xl:mx-10">
                    <div className="">morning</div>
                    {MORNING.map((min, idx) => (
                        <div key={idx} className="flex flex-row">
                            {min.map((v, idx) => (
                                <div
                                    key={idx}
                                    className={`${v} w-6 h-6 border-[0.5px] border-[#FAF5E4] bg-[#FEFBF6] relative overflow-hidden`}
                                >
                                    <div
                                        className="bg-[#FFD24C] absolute left-0 top-0 w-full h-full"
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
                {/* AFTERNOON */}
                <div className="mx-6 xl:mx-10">
                    <div className="">afternoon</div>

                    {AFTERNOON.map((min, idx) => (
                        <div key={idx} className="flex flex-row">
                            {min.map((v, idx) => (
                                <div
                                    key={idx}
                                    className={`${v} w-6 h-6 border-[0.5px] border-[#FAF5E4] bg-[#FEFBF6] relative overflow-hidden`}
                                >
                                    <div
                                        className="bg-[#FFD24C] absolute left-0 top-0 w-full h-full"
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
                {/* NIGHT */}
                <div className="mx-6 xl:mx-10">
                    <div className="">night</div>

                    {NIGHT.map((min, idx) => (
                        <div key={idx} className="flex flex-row">
                            {min.map((v, idx) => (
                                <div
                                    key={idx}
                                    className={`${v} w-6 h-6 border-[0.5px] border-[#FAF5E4] bg-[#FEFBF6] relative overflow-hidden`}
                                >
                                    <div
                                        className="bg-[#FFD24C] absolute left-0 top-0 w-full h-full"
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
    );
}
export default TodayStudyTime;
