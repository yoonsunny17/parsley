import Button from "../atoms/Button";

function Studywidget() {
    return (
        <div className="flex flex-col justify-between w-100 h-72 min-h-fit rounded-3xl p-6 shadow">
            <div className="">
                <div className="text-font1 text-xl font-bold mb-4">
                    오늘의 스터디
                </div>
                {/* 목표 시간 있는 경우 */}

                {/* 목표 시간 없는 경우 */}
                <div className="text-extra5 text-base font-semibold">
                    오늘의 목표 시간을
                    <br />
                    설정해주세요
                </div>
            </div>
            <div className="flex justify-end">
                <Button text={"목표 설정"}></Button>
            </div>
        </div>
    );
}

export default Studywidget;
