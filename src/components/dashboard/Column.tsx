import { Dispatch, SetStateAction, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useToggle } from "usehooks-ts";
import { FieldValues } from "react-hook-form";
import { createCard } from "@/lib/services/cards";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";
import { CardServiceResponseDto, CreateCardRequestDto } from "@/lib/services/cards/schema";
import { postImageToServer } from "@/lib/util/postImageToServer";
import { CreateTodo } from "../modal/todo";
import { UpdateColumn } from "../modal/column";
import Card from "@/components/dashboard/Card";
import AddCardButton from "./AddCardButton";
import { ChipNum } from "../common/Chips";
import { DashboardContext } from "@/pages/dashboard/[id]";

interface ColumnProps {
  column: ColumnServiceResponseDto;
  updateColumns: Dispatch<SetStateAction<ColumnServiceResponseDto[]>>;
}

type ImageObject = {
  url: string;
  name: string;
  type: string;
};

function Column({ column, updateColumns }: ColumnProps) {
  const [selectedImage, setSelectedImage] = useState<File | ImageObject | undefined>(undefined);
  const { cardData, setCardData } = useContext(DashboardContext);
  const [columnUpdateModal, columnUpdateToggle, setColumnUpdateModal] = useToggle();
  const [todoModal, todoToggle, setTodoMdodal] = useToggle();

  const {
    query: { id },
  } = useRouter();

  const dashboardId = Number(id);

  const createCardCallback = async (data: FieldValues) => {
    try {
      const formData: CreateCardRequestDto = {
        ...(data as CreateCardRequestDto),
        dashboardId,
        columnId: column.id,
      };
      if (selectedImage) {
        const imageUrl = await postImageToServer(selectedImage as File, column.id);
        if (imageUrl) {
          formData.imageUrl = imageUrl;
        }
      }
      const response = await createCard(formData);

      if (response.data) {
        setCardData((prevCardData) => {
          const columnIndex = prevCardData.findIndex((data) => data.columnId === column.id);
          if (columnIndex > -1) {
            const newCardData = [...prevCardData];
            const newCards = [...newCardData[columnIndex].cards, response.data] as CardServiceResponseDto[];
            newCardData[columnIndex] = { ...newCardData[columnIndex], cards: newCards };
            return newCardData;
          }
          return prevCardData;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cardLists = cardData.find((cards) => cards.columnId === column.id);
  const cardCount = cardLists?.cards.length;

  return (
    <section className="flex flex-col flex-shrink-0 w-full gap-16 p-12 pc:min-h-[calc(100vh-9rem)] tablet:gap-24 pc:w-354 tablet:p-20 bg-gray-FAFA border-b-1 border-b-gray-EEEE pc:border-r-gray-EEEE pc:border-r-1 pc:border-b-0">
      <div className="flex justify-between">
        <div className="flex items-center gap-8">
          <span className="relative inline-block size-8">
            <Image width={8} height={8} src="/images/ellipse.png" alt="원 아이콘 이미지" />
          </span>
          <p className="mr-4 font-bold tablet:text-18">{column.title}</p>
          <ChipNum totalCount={cardCount as number} />
        </div>
        <button className="relative inline-block size-22 tablet:size-24" onClick={columnUpdateToggle}>
          <Image fill src="/images/settings.png" alt="setting" sizes="auto" />
        </button>
      </div>
      <div className="flex flex-col gap-16">
        <AddCardButton onClick={todoToggle} />
        {cardLists?.cards?.map((card) => {
          return <Card key={card.id} cardData={card} />;
        })}
      </div>
      {columnUpdateModal && (
        <UpdateColumn
          columnData={{
            title: column.title,
            columnId: column.id,
          }}
          updateColumns={updateColumns}
          onClose={() => setColumnUpdateModal(false)}
        />
      )}
      {todoModal && (
        <CreateTodo
          setSelectedImage={setSelectedImage}
          onClose={() => setTodoMdodal(false)}
          callback={createCardCallback}
        />
      )}
    </section>
  );
}

export default Column;
