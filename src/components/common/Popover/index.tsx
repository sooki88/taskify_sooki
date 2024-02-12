import { ReactNode, useContext, useRef, useState } from "react";
import { useOnClickOutside, useToggle } from "usehooks-ts";
import { FieldValues } from "react-hook-form";
import Contents from "./Contents";
import { UpdateTodo } from "@/components/modal/todo";
import AlertModal from "@/components/modal/alert";
import { card } from "@/lib/services/cards";
import { postImageToServer } from "@/lib/util/postImageToServer";
import { CardServiceResponseDto, UpdateCardRequestDto } from "@/lib/services/cards/schema";
import { DashboardContext } from "@/pages/dashboard/[id]";

export interface PopoverContent {
  title: string;
  onClick: () => void;
}

interface PopoverProps {
  children: ReactNode;
  cardId: number;
}

type ImageObject = {
  url: string;
  name: string;
  type: string;
};

function Popover({ children, cardId }: PopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | ImageObject | undefined>(undefined);
  const [updateValue, updateToggle, setUpdateValue] = useToggle();
  const [deleteValue, deleteToggle, setDeleteValue] = useToggle();
  const popoverRef = useRef<HTMLDivElement>(null);
  const { setCardData } = useContext(DashboardContext);

  const MODAL_POPOVER = [
    {
      title: "수정하기",
      onClick: updateToggle,
    },
    { title: "삭제하기", onClick: deleteToggle },
  ];

  const handlePopoverOpen = () => {
    setPopoverOpen((prev) => !prev);
  };

  const cardUpdate = async (data: FieldValues) => {
    try {
      const { assignee, ...rest } = data;
      const formData: UpdateCardRequestDto = {
        ...(rest as UpdateCardRequestDto),
        assigneeUserId: assignee.id,
        columnId: data.columnId,
      };
      if (selectedImage) {
        const imageUrl = await postImageToServer(selectedImage as File, formData.columnId);
        if (imageUrl) {
          formData.imageUrl = imageUrl;
        }
      }

      const response = await card("put", cardId, formData);
      const updateCard = response.data as CardServiceResponseDto;

      if (updateCard as CardServiceResponseDto) {
        setCardData((prevState) => {
          return prevState.map((column) => {
            if (column.columnId === updateCard.columnId) {
              const cardIndex = column.cards.findIndex((card) => card.id === updateCard.id);
              if (cardIndex !== -1) {
                // 카드가 현재 컬럼에 있음, 업데이트 실행
                const updatedCards = [...column.cards];
                updatedCards[cardIndex] = { ...updatedCards[cardIndex], ...updateCard };
                return { ...column, cards: updatedCards };
              } else {
                // 업데이트된 카드가 이 컬럼에 새로 추가되어야 함
                return { ...column, cards: [...column.cards, updateCard] };
              }
            } else if (column.cards.some((card) => card.id === updateCard.id)) {
              // 업데이트된 카드가 다른 컬럼에서 이 컬럼으로 이동해야 함
              return { ...column, cards: column.cards.filter((card) => card.id !== updateCard.id) };
            }
            return column;
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cardDelete = async () => {
    try {
      await card("delete", cardId as number);
      setCardData((prevCardData) => {
        return prevCardData.map((columnData) => {
          const filteredCards = columnData.cards.filter((card) => card.id !== cardId);
          return { ...columnData, cards: filteredCards };
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (popoverOpen && popoverRef.current && !popoverRef.current.contains(e.target as ChildNode)) {
      setPopoverOpen(false);
    }
  };

  useOnClickOutside(popoverRef, handleOutsideClick);

  return (
    <div className="relative flex items-center" ref={popoverRef}>
      <button type="button" onClick={handlePopoverOpen}>
        {children}
      </button>
      {popoverOpen && <Contents contents={MODAL_POPOVER} />}
      {updateValue && (
        <UpdateTodo
          cardId={cardId}
          setSelectedImage={setSelectedImage}
          onClose={() => setUpdateValue(false)}
          callback={cardUpdate}
        />
      )}
      {deleteValue && (
        <AlertModal modalType="delete" deleteType="card" onClose={() => setDeleteValue(false)} callback={cardDelete} />
      )}
    </div>
  );
}

export default Popover;
