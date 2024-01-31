import ProfileLabel from "@/components/common/ProfileLabel";

function TaskInfo() {
  return (
    <div className="flex justify-between w-full p-12 border-1 tablet:justify-center tablet:gap-30 tablet:p-16 tablet:flex-col tablet:h-155 shrink-0 rounded-8 border-gray-D9D9">
      <div className="flex flex-col justify-center gap-6 m-auto tablet:m-0 tablet:gap-6">
        <span className="font-semibold leading-5 text-black font-Pretendard text-12">담당자</span>
        <ProfileLabel />
      </div>
      <div className="flex flex-col justify-center gap-10 m-auto tablet:m-0 tablet:gap-6">
        <span className="font-semibold leading-5 text-black font-Pretendard text-12">마감일</span>
        <div className="font-normal text-black font-Pretendard text-14">2022.12.30 19:00</div>
      </div>
    </div>
  );
}

export default TaskInfo;
