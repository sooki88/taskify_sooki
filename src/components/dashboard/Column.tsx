import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useToggle } from "usehooks-ts";
import { FieldValues } from "react-hook-form";
import { createCard, findCards } from "@/lib/services/cards";
import { CardServiceFindResponseDto, CreateCardRequestDto } from "@/lib/services/cards/schema";
import { postImageToServer } from "@/lib/util/postImageToServer";
import { UpdateColumn } from "../modal/column";
import Card from "@/components/dashboard/Card";
import AddCardButton from "./AddCardButton";
import { ChipNum } from "../common/Chips";
import { CreateTodo } from "../modal/todo";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";

interface ColumnProps {
  column: any;
  updateColumns: Dispatch<SetStateAction<ColumnServiceResponseDto[]>>;
}

interface ContextType {
  cardList: CardServiceFindResponseDto;
  setCardList: Dispatch<SetStateAction<CardServiceFindResponseDto>>;
}

export const CardContext = createContext<ContextType | undefined>(undefined);

export const useCardList = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCards must be used within a CardProvider");
  }
  return context;
};
function Column({ column, updateColumns }: ColumnProps) {
  const [cardList, setCardList] = useState<CardServiceFindResponseDto>({ cards: [], totalCount: 0, cursorId: null });
  const [selectedImage, setSelectedImage] = useState<File>();

  const [columnUpdateModal, columnUpdateToggle, setColumnUpdateModal] = useToggle();
  const [todoModal, todoToggle, setTodoMdodal] = useToggle();

  const {
    query: { id },
  } = useRouter();

  const dashboardId = Number(id);

  const createCardCallback = async (data: FieldValues) => {
    try {
      let formData: CreateCardRequestDto = {
        ...(data as CreateCardRequestDto),
        dashboardId,
        columnId: column.id,
      };
      if (selectedImage) {
        const imageUrl = await postImageToServer(selectedImage, column.id);
        if (imageUrl) {
          formData.imageUrl = imageUrl;
        }
      }
      const response = await createCard(formData);
      setCardList((prevState: any) => ({
        ...prevState,
        cards: [...prevState.cards, response.data],
        totalCount: prevState.totalCount + 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const qs = {
        columnId: column.id,
      };
      const response = await findCards(qs);
      setCardList(response?.data as CardServiceFindResponseDto);
    };
    fetchData();
  }, [column.id]);

  return (
    <CardContext.Provider value={{ cardList, setCardList }}>
      <section className="flex flex-col flex-shrink-0 w-full gap-16 p-12 pc:min-h-screen tablet:gap-24 pc:w-354 tablet:p-20 bg-gray-FAFA border-b-1 border-b-gray-EEEE pc:border-r-gray-EEEE pc:border-r-1 pc:border-b-0">
        <div className="flex justify-between">
          <div className="flex items-center gap-8">
            <span className="relative inline-block size-8">
              <Image fill src="/images/ellipse.png" alt="원 아이콘 이미지" />
            </span>
            <p className="mr-4 font-bold tablet:text-18">{column.title}</p>
            <ChipNum totalCount={cardList.totalCount} />
          </div>
          <button className="relative inline-block size-22 tablet:size-24" onClick={columnUpdateToggle}>
            <Image fill src="/images/settings.png" alt="setting" />
          </button>
        </div>
        <div className="flex flex-col gap-16">
          <AddCardButton onClick={todoToggle} />
          {cardList.cards?.map((card) => {
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
            onClose={() => setTodoMdodal(false)}
            callback={createCardCallback}
            setSelectedImage={setSelectedImage}
          />
        )}
      </section>
    </CardContext.Provider>
  );
}

export default Column;
