import { ReactNode, useContext, useRef, useState } from "react";
import { useOnClickOutside, useToggle } from "usehooks-ts";
import { FieldValues } from "react-hook-form";
import Contents from "./Contents";
import { UpdateTodo } from "@/components/modal/todo";
import AlertModal from "@/components/modal/alert";
import { card } from "@/lib/services/cards";
import { postImageToServer } from "@/lib/util/postImageToServer";
import { UpdateCardRequestDto } from "@/lib/services/cards/schema";
import { useCardList } from "@/components/dashboard/Column";
import { DashboardContext } from "@/pages/dashboard/[id]";
import { useTrigger } from "@/contexts/TriggerContext";

export interface PopoverContent {
  title: string;
  onClick: () => void;
}

interface PopoverProps {
  children: ReactNode;
  cardId?: number;
}

function Popover({ children, cardId }: PopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [updateValue, updateToggle, setUpdateValue] = useToggle();
  const [deleteValue, deleteToggle, setDeleteValue] = useToggle();
  const popoverRef = useRef<HTMLDivElement>(null);
  const { setCardList } = useCardList();
  const { toggleTrigger } = useTrigger();

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
      let formData: UpdateCardRequestDto = {
        ...(rest as UpdateCardRequestDto),
        assigneeUserId: assignee.id,
      };
      if (selectedImage) {
        const imageUrl = await postImageToServer(selectedImage, data.columnId);
        if (imageUrl) {
          formData.imageUrl = imageUrl;
        }
      }
      const response = await card("put", cardId as number, formData);
      if (response.data) {
        setCardList((prevState) => ({
          ...prevState,
          cards: prevState.cards.map((card) => (card.id === cardId ? { ...card, ...(response.data as any) } : card)),
        }));
      }
      toggleTrigger();
    } catch (error) {
      console.error(error);
    }
  };

  const cardDelete = async () => {
    try {
      await card("delete", cardId as number);
      setCardList((prevState) => ({
        ...prevState,
        cards: prevState.cards.filter((card) => card.id !== cardId),
        totalCount: prevState.totalCount - 1,
      }));
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
