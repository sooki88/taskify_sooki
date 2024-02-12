import { FieldValues, useFormContext } from "react-hook-form";
import Button from "../../Button";

interface ModalFooterProps {
  modalType: "alert" | "create" | "update" | "delete" | "invite" | "success_profile" | "success_password";
  isFormData?: boolean;
  onClose: () => void;
  onDelete?: () => void;
  handleButtonClick: (data: FieldValues) => void;
}

export const ModalFooter = ({ modalType, isFormData, onClose, onDelete, handleButtonClick }: ModalFooterProps) => {
  const isAlert = modalType === "alert";
  const isUpdate = modalType === "update";

  const buttonMapping: Record<string, string> = {
    alert: "확인",
    create: "생성",
    update: "수정",
    delete: "삭제",
    invite: "초대",
  };

  const formContext = useFormContext();
  const isValid = formContext && formContext.formState.isValid;

  return (
    <footer
      className={`flex flex-col tablet:flex-row tablet:justify-between ${isFormData ? `mt-28 tablet:mt-32` : ""}`}>
      {onDelete && isUpdate && (
        <div className="flex items-end underline cursor-pointer text-nowrap text-gray-9FA6" onClick={onDelete}>
          <span>삭제하기</span>
        </div>
      )}
      <div className="flex justify-center w-full gap-12 tablet:justify-end">
        {!isAlert && (
          <Button variant="ghost" buttonType="modal" onClick={onClose}>
            취소
          </Button>
        )}
        {isFormData ? (
          <Button
            variant="filled"
            type="submit"
            buttonType="modal"
            onClick={formContext.handleSubmit(handleButtonClick)}
            disabled={!isValid}>
            {buttonMapping[modalType]}
          </Button>
        ) : (
          <Button variant="filled" buttonType="modal" onClick={handleButtonClick}>
            {buttonMapping[modalType]}
          </Button>
        )}
      </div>
    </footer>
  );
};
