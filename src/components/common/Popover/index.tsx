import { ReactNode, useRef, useState } from "react";
import { useOnClickOutside, useToggle } from "usehooks-ts";
import Contents from "./Contents";
import { UpdateTodo } from "@/components/modal/todo";
import AlertModal from "@/components/modal/alert";
import { FieldValues } from "react-hook-form";
import { card } from "@/lib/services/cards";
import { useTrigger } from "@/components/contexts/TriggerContext";
import { postImageToServer } from "@/lib/util/postImageToServer";
import { UpdateCardRequestDto } from "@/lib/services/cards/schema";

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
  const { toggleTrigger } = useTrigger();
  const popoverRef = useRef<HTMLDivElement>(null);

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

  const handleUpdate = async (data: FieldValues) => {
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
      await card("put", cardId as number, formData);
      toggleTrigger();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (cardId) {
      await card("delete", cardId);
      toggleTrigger();
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
          callback={handleUpdate}
        />
      )}
      {deleteValue && <AlertModal modalType="delete" onClose={() => setDeleteValue(false)} callback={handleDelete} />}
    </div>
  );
}

export default Popover;
