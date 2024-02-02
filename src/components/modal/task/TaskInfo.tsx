import ProfileLabel from "@/components/common/ProfileLabel";

interface ProfileData {
  nickname: string;
  profileImageUrl: string;
}

interface TaskInfoProps {
  data: ProfileData;
}

function TaskInfo({ data }: TaskInfoProps) {
  return (
    <div className="flex justify-between w-full p-12 border-1 tablet:justify-center tablet:gap-30 tablet:p-16 tablet:flex-col tablet:h-155 shrink-0 rounded-8 border-gray-D9D9">
      <div className="flex flex-col justify-center gap-6 m-auto tablet:m-0 tablet:gap-6">
        <span className="font-semibold leading-normal text-black font-Pretendard text-10 tablet:leading-5 tablet:text-12">
          담당자
        </span>
        <ProfileLabel data={data} avatarType="modal" />
      </div>
      <div className="flex flex-col justify-center gap-10 m-auto tablet:m-0 tablet:gap-6">
        <span className="font-semibold leading-normal text-black font-Pretendard text-10 tablet:leading-5 tablet:text-12">
          마감일
        </span>
        <div className="font-normal text-black font-Pretendard text-14">2022.12.30 19:00</div>
      </div>
    </div>
  );
}

export default TaskInfo;
