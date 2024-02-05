import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useToggle } from "usehooks-ts";
import { FieldValues } from "react-hook-form";
import { createCard, findCards } from "@/lib/services/cards";
import { CardServiceFindResponseDto, CreateCardRequestDto } from "@/lib/services/cards/schema";
import { UpdateColumn } from "../modal/column";
import Card from "@/components/dashboard/Card";
import AddColumnButton from "./AddColumnButton";
import { ChipNum } from "../common/Chips";
import { CreateTodo } from "../modal/todo";
import { useTrigger } from "../contexts/TriggerContext";
import { postImageToServer } from "@/lib/util/postImageToServer";

interface ColumnProps {
  title: string;
  columnId: number;
}

function Column({ title, columnId }: ColumnProps) {
  const [cardData, setCardData] = useState<CardServiceFindResponseDto>({ cards: [], totalCount: 0, cursorId: null });
  const [selectedImage, setSelectedImage] = useState<File>();
  const { isTriggered, toggleTrigger } = useTrigger();

  const [columnUpdateValue, columnUpdateToggle, setColumnUpdateValue] = useToggle();
  const [todoValue, todoToggle, setTodoValue] = useToggle();

  const {
    query: { id },
  } = useRouter();
  const { totalCount, cards } = cardData;

  const dashboardId = Number(id);

  useEffect(() => {
    const fetchData = async () => {
      const qs = {
        columnId,
      };
      const response = await findCards(qs);
      setCardData(response?.data as CardServiceFindResponseDto);
    };
    fetchData();
  }, [columnId, isTriggered]);

  const callback = async (data: FieldValues) => {
    try {
      let formData: CreateCardRequestDto = {
        ...(data as CreateCardRequestDto),
        dashboardId,
        columnId,
      };
      if (selectedImage) {
        const imageUrl = await postImageToServer(selectedImage, columnId);
        if (imageUrl) {
          formData.imageUrl = imageUrl;
        }
      }
      await createCard(formData);
      toggleTrigger();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col flex-shrink-0 w-full gap-16 p-12 pc:min-h-screen tablet:gap-24 pc:w-354 tablet:p-20 bg-gray-FAFA border-b-1 border-b-gray-EEEE pc:border-r-gray-EEEE pc:border-r-1 pc:border-b-0">
      <div className="flex justify-between">
        <div className="flex items-center gap-8">
          <span className="relative inline-block size-8">
            <Image fill src="/images/ellipse.png" alt="원 아이콘 이미지" />
          </span>
          <p className="mr-4 font-bold tablet:text-18">{title}</p>
          <ChipNum totalCount={totalCount} />
        </div>
        <button className="relative inline-block size-22 tablet:size-24" onClick={columnUpdateToggle}>
          <Image fill src="/images/settings.png" alt="setting" />
        </button>
      </div>
      <div className="flex flex-col gap-16">
        <AddColumnButton onClick={todoToggle} />
        {cards?.map((card) => <Card key={card.id} cardData={card} cardTitle={title} columnId={columnId} />)}
      </div>
      {columnUpdateValue && (
        <UpdateColumn
          columnData={{
            title,
            columnId,
          }}
          onClose={() => setColumnUpdateValue(false)}
        />
      )}
      {todoValue && (
        <CreateTodo onClose={() => setTodoValue(false)} callback={callback} setSelectedImage={setSelectedImage} />
      )}
    </section>
  );
}

export default Column;
