import Image from "next/image";
import { formatDate } from "@/lib/util/formatDate";
import { ChipCard } from "../common/Chips";
import { CardServiceResponseDto } from "@/lib/services/cards/schema";
import Avatar from "../common/Avatar";
import { useToggle } from "usehooks-ts";
import TaskModal from "../modal/task";
import { useEffect, useState } from "react";
import { card } from "@/lib/services/cards";
import { useTrigger } from "../contexts/TriggerContext";

interface CardProps {
  cardData: CardServiceResponseDto;
  cardTitle: string;
  columnId: number;
}

function Card({ cardData: { title, tags, dueDate, assignee, imageUrl, id }, cardTitle }: CardProps) {
  const [taskData, setTaskData] = useState<CardServiceResponseDto>({} as CardServiceResponseDto);
  const [taskModalValue, taskToggle, setTaskModalValue] = useToggle();
  const { isTriggered } = useTrigger();
  const { nickname, profileImageUrl } = assignee;
  const noTagsClassName = tags.length === 0 ? "hidden" : null;
  const noDueDate = dueDate === null;

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      await card("get", id).then(({ data }) => setTaskData(data as CardServiceResponseDto));
    };
    fetch();
  }, [id, isTriggered]);

  if (taskData)
    return (
      <div
        className="flex flex-col w-full p-12 bg-white border cursor-pointer pc:flex-col tablet:flex-row pc:gap-y-12 tablet:gap-x-20 tablet:p-20 gap-y-10 rounded-6 border-gray-D9D9 pc:px-20"
        onClick={taskToggle}>
        {imageUrl && (
          <div className="relative w-full overflow-hidden shrink-0 pc:w-274 tablet:w-91 h-152 pc:h-160 tablet:h-53 rounded-6">
            <Image
              fill
              src={imageUrl}
              alt="카드 이미지"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 744px) 100vw, (max-width: 1199px) 50vw, 25vw"
              placeholder="blur"
              blurDataURL={"/images/empty.png"}
            />
          </div>
        )}
        <div className="flex flex-wrap w-full pc:flex-col tablet:flex-row tablet:gap-y-10 gap-y-6 items-end tablet:items-stretch">
          <h2 className="w-full font-medium tablet:text-16 text-14 text-black-3332 tablet:h-19 h-17">{title}</h2>
          <div className={`flex flex-wrap gap-y-6 items-center mr-16 tablet:w-auto w-[26rem] ${noTagsClassName}`}>
            {tags.map((tag, index) => (
              <ChipCard key={index} tag={tag} index={index} short tagsLength={tags.length} />
            ))}
          </div>
          <div className="flex items-center justify-between grow">
            <div className="flex content-center gap-4 tablet:gap-6d">
              <div className="relative tablet:size-18 size-14">
                <Image
                  fill
                  src="/images/calendar.png"
                  alt="달력 아이콘 이미지"
                  sizes="(max-width: 744px) 100vw, (max-width: 1199px) 50vw, 25vw"
                />
              </div>
              <p className="font-medium tablet:text-12 text-10 text-gray-7874">
                {noDueDate ? "마감기한 없음" : formatDate(dueDate)}
              </p>
            </div>
            <Avatar nickname={nickname} profileImageUrl={profileImageUrl} avatarType="card" />
          </div>
        </div>
        {taskModalValue && (
          <TaskModal
            cardTitle={cardTitle}
            cardId={id}
            taskData={taskData}
            onClose={(e) => {
              e?.stopPropagation();
              setTaskModalValue(false);
            }}
          />
        )}
      </div>
    );
}

export default Card;
