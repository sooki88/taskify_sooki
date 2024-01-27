import { formatDate } from "@/lib/util/formatDate";
import { ChipCard } from "../common/Chips";
import Image from "next/image";

interface CardProps {
  title: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
  };
  imageUrl?: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function Card({ title, tags, dueDate, assignee, imageUrl, onClick }: CardProps) {
  const firstLetter = assignee.nickname[0].toUpperCase();

  return (
    <div
      className="flex flex-col p-12 bg-white border pc:flex-col tablet:flex-row pc:gap-y-12 tablet:gap-x-20 tablet:p-20 gap-y-10 pc:w-314 tablet:w-544 w-284 rounded-6 border-gray-D9D9"
      onClick={onClick}>
      {imageUrl && (
        <div className="relative overflow-hidden shrink-0 pc:w-274 tablet:w-91 w-26 h-152 pc:h-160 tablet:h-53 rounded-6">
          <Image fill src={imageUrl} alt="카드 이미지" style={{ objectFit: "cover" }} />
        </div>
      )}
      <div className="flex flex-wrap w-full pc:flex-col tablet:flex-row tablet:gap-y-10 gap-y-6">
        <h2 className="w-full font-medium tablet:text-16 text-14 tablet:h-19 h-17 text-black-3332">{title}</h2>
        <div className="flex items-center h-20 mr-16 tablet:h-24 pc:h-22 tablet:w-auto w-[26rem]">
          {tags?.map((tag, index) => <ChipCard key={index} tag={tag} index={index} short />)}
        </div>
        <div className="flex items-center justify-between grow">
          <div className="flex content-center gap-4 tablet:gap-6">
            <div className="relative tablet:size-18 size-14">
              <Image fill src="/images/calendar.png" alt="달력 아이콘 이미지" />
            </div>
            <p className="tablet:text-12 text-10 text-gray-7874">{formatDate(dueDate)}</p>
          </div>
          <div className="relative bg-[#A3C4A2] tablet:size-24 size-22 rounded-99 flex justify-center items-center overflow-hidden">
            {assignee.profileImageUrl ? (
              <Image fill src={assignee.profileImageUrl} alt="담당자 프로필 이미지" style={{ objectFit: "cover" }} />
            ) : (
              <span className="font-semibold text-white tablet:text-12 text-10">{firstLetter}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
