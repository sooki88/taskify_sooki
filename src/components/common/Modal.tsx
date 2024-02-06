import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useFormContext, FieldValues } from "react-hook-form";
import Button from "./Button/Button";
import Popover from "./Popover";

interface ModalProps<T = void> {
  children: ReactNode;
  title?: string;
  // modalType?: "alert" | "create" | "update" | "delete" | "invite";
  modalType?: "alert" | "create" | "update" | "delete" | "invite" | "success_profile" | "success_password";
  hasOptionsbutton?: boolean;
  useFormData?: boolean;
  cardId?: number;
  callback?: (data: FieldValues) => Promise<T>;
  onClose: () => void;
  onDelete?: () => void;
}

function Modal({
  children,
  title,
  modalType,
  hasOptionsbutton,
  useFormData,
  cardId,
  callback,
  onClose,
  onDelete,
}: ModalProps) {
  const formContext = useFormContext();
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  const buttonMapping: Record<string, string> = {
    alert: "확인",
    create: "생성",
    update: "수정",
    delete: "삭제",
    invite: "초대",
    success_profile: "확인",
    success_password: "확인",
  };

  // const isAlert = modalType === "alert"
  const isAlert = modalType === "alert" || "success_profile" || "success_password";
  const isUpdate = modalType === "update";
  const isDelete = modalType === "delete";

  const watch = formContext && formContext.watch();

  const stopEventBubbling = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleButtonClick = async (data: FieldValues) => {
    if (typeof callback === "function") {
      try {
        await callback(data);
        onClose();
      } catch (error) {
        console.error(error);
      }
    } else {
      onClose();
    }
  };

  // CSR 환경에서만 접근
  useEffect(() => {
    const body = document.body;
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    body.appendChild(modalRoot);
    setPortalRoot(modalRoot);
    return () => {
      body.removeChild(modalRoot);
    };
  }, []);

  useEffect(() => {
    if (formContext)
      if (Object.values(watch).every((el) => el)) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
  }, [watch]);

  return (
    portalRoot &&
    createPortal(
      <div
        className="fixed inset-0 flex items-center justify-center w-full h-full modal-bg bg-black-overlay z-modal"
        onClick={onClose}>
        <div
          className="bg-white min-w-327 tablet:min-w-540 min-h-220 tablet:min-h-250: rounded-5 px-20 py-28 tablet:px-28 grid grid-rows-[auto,1fr,auto]"
          onClick={stopEventBubbling}>
          {/* 모달 헤더 영역 */}
          <header className="flex items-center justify-between mb-24 modal-header tablet:mt-4 tablet:mb-32">
            {!isDelete && <span className="font-bold text-black-3332 text-20 tablet:text-24">{title}</span>}
            {/**모달 헤더 버튼 영역 */}
            {hasOptionsbutton && (
              <div className="flex items-center gap-15">
                <Popover cardId={cardId}>
                  <Image src={"/images/kebab.png"} alt="kebab" width={28} height={28} />
                </Popover>
                <button onClick={onClose}>
                  <Image src={"/images/close.png"} alt="close" width={32} height={32} />
                </button>
              </div>
            )}
          </header>
          {/* 콘텐츠 영역 */}
          <div className="h-full overflow-auto">{children}</div>
          {/* 모달 푸터 영역 */}
          {modalType && (
            <footer
              className={`flex flex-col tablet:flex-row tablet:justify-between ${useFormData ? `mt-28 tablet:mt-32` : ""}`}>
              {onDelete && isUpdate && (
                <span className="underline cursor-pointer text-nowrap text-gray-9FA6" onClick={onDelete}>
                  삭제하기
                </span>
              )}
              <div className="flex justify-center w-full gap-12 tablet:justify-end">
                {!isAlert && (
                  <Button variant="ghost" buttonType="modal" onClick={onClose}>
                    취소
                  </Button>
                )}
                {useFormData && (
                  <Button
                    variant="filled"
                    type="submit"
                    buttonType="modal"
                    onClick={formContext.handleSubmit(handleButtonClick)}
                    disabled={!isActive}>
                    {buttonMapping[modalType]}
                  </Button>
                )}
                {!hasOptionsbutton && !useFormData && (
                  <Button variant="filled" buttonType="modal" onClick={handleButtonClick}>
                    {buttonMapping[modalType]}
                  </Button>
                )}
              </div>
            </footer>
          )}
        </div>
      </div>,
      document.body,
    )
  );
}

export default Modal;
