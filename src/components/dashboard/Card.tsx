import React from "react";
import Image from "next/image";
import { useToggle } from "usehooks-ts";
import { CardServiceResponseDto } from "@/lib/services/cards/schema";
import { ChipCard } from "../common/Chips";
import Avatar from "../common/Avatar";
import TaskModal from "../modal/task";

interface CardProps {
  cardData: CardServiceResponseDto;
}

const Card = ({ cardData }: CardProps) => {
  const [taskModalValue, taskToggle] = useToggle();
  const { nickname, profileImageUrl } = cardData.assignee;
  const noTagsClassName = cardData.tags.length === 0 ? "hidden" : null;

  return (
    <div
      className="flex flex-col w-full p-12 bg-white border cursor-pointer pc:flex-col tablet:flex-row pc:gap-y-12 tablet:gap-x-20 tablet:p-20 gap-y-10 rounded-6 border-gray-D9D9 pc:px-20"
      onClick={taskToggle}>
      {cardData.imageUrl && (
        <div className="relative w-full overflow-hidden shrink-0 pc:w-274 tablet:w-91 h-152 pc:h-160 tablet:h-53 rounded-6">
          <Image fill src={cardData.imageUrl} alt="카드 이미지" style={{ objectFit: "cover" }} />
        </div>
      )}
      <div className="flex flex-wrap w-full pc:flex-col tablet:flex-row tablet:gap-y-10 gap-y-6">
        <h2 className="w-full font-medium tablet:text-16 text-14 text-black-3332 tablet:h-19 h-17">{cardData.title}</h2>
        <div className={`flex items-center mr-16 tablet:w-auto w-[26rem] ${noTagsClassName}`}>
          {cardData.tags.map((tag, index) => (
            <ChipCard key={index} tag={tag} index={index} short />
          ))}
        </div>
        <div className="flex items-center justify-between grow">
          <div className="flex content-center gap-4 tablet:gap-6">
            <div className="relative tablet:size-18 size-14">
              <Image fill src="/images/calendar.png" alt="달력 아이콘 이미지" />
            </div>
            <p className="font-medium tablet:text-12 text-10 text-gray-7874">
              {!cardData.dueDate ? "마감기한 없음" : (cardData.dueDate as string)}
            </p>
          </div>
          <Avatar nickname={nickname} profileImageUrl={profileImageUrl} avatarType="card" />
        </div>
      </div>
      {taskModalValue && (
        <TaskModal
          taskData={cardData}
          onClose={(e) => {
            e?.stopPropagation();
            taskToggle();
          }}
        />
      )}
    </div>
  );
};

export default Card;
