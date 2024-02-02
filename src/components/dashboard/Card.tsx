import { formatDate } from "@/lib/util/formatDate";
import { ChipCard } from "../common/Chips";
import Image from "next/image";

interface CardProps {
  id: number;
  title: string;
  tags: string[];
  dueDate: string | null;
  assignee: {
    id: number;
    profileImageUrl: string | null;
    nickname: string;
  };
  imageUrl: string | null;
}

function Card({ title, tags, dueDate, assignee, imageUrl, id }: CardProps) {
  const firstLetter = assignee.nickname[0].toUpperCase();
  const noTagsClassName = tags.length === 0 ? "hidden" : null;
  const noDueDate = dueDate === null;

  const handleCardClick = () => {
    console.log(id);
  };

  return (
    <div
      className="flex flex-col w-full p-12 bg-white border cursor-pointer pc:flex-col tablet:flex-row pc:gap-y-12 tablet:gap-x-20 tablet:p-20 gap-y-10 rounded-6 border-gray-D9D9 pc:px-20"
      onClick={handleCardClick}>
      {imageUrl && (
        <div className="relative w-full overflow-hidden shrink-0 pc:w-274 tablet:w-91 h-152 pc:h-160 tablet:h-53 rounded-6">
          <Image fill src={imageUrl} alt="카드 이미지" style={{ objectFit: "cover" }} />
        </div>
      )}
      <div className="flex flex-wrap w-full pc:flex-col tablet:flex-row tablet:gap-y-10 gap-y-6">
        <h2 className="w-full font-medium tablet:text-16 text-14 text-black-3332 tablet:h-19 h-17">{title}</h2>
        <div className={`flex items-center mr-16 tablet:w-auto w-[26rem] ${noTagsClassName}`}>
          {tags.map((tag, index) => (
            <ChipCard key={index} tag={tag} index={index} short />
          ))}
        </div>
        <div className="flex items-center justify-between grow">
          <div className="flex content-center gap-4 tablet:gap-6">
            <div className="relative tablet:size-18 size-14">
              <Image fill src="/images/calendar.png" alt="달력 아이콘 이미지" />
            </div>
            <p className="font-medium tablet:text-12 text-10 text-gray-7874">
              {noDueDate ? "마감기한 없음" : formatDate(dueDate)}
            </p>
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
