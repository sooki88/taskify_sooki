import React, { ReactNode, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { ModalHeader } from "./Layout/Header";
import { ModalFooter } from "./Layout/Footer";
import { createPortal } from "react-dom";

interface ModalProps<T = void> {
  children: ReactNode;
  title?: string;
  modalType?: "alert" | "create" | "update" | "delete" | "invite" | "success_profile" | "success_password";
  hasOptionsbutton?: boolean;
  isFormData?: boolean;
  cardId?: number;
  headerContent?: React.ReactElement;
  callback?: (data: FieldValues) => Promise<T>;
  onClose: () => void;
  onDelete?: () => void;
}

function Modal({
  children,
  title,
  modalType,
  hasOptionsbutton,
  isFormData,
  headerContent,
  callback,
  onClose,
  onDelete,
}: ModalProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const isDelete = modalType === "delete";

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
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    portalRoot &&
    createPortal(
      <div
        className="fixed inset-0 flex items-center justify-center w-full h-full modal-bg bg-black-overlay z-overlay"
        onClick={onClose}>
        <div
          className="bg-white min-w-327 tablet:min-w-540 max-h-[95vh] overflow-x-hidden rounded-5 px-20 py-28 tablet:px-28 grid grid-rows-[auto,1fr,auto] z-modal"
          onClick={stopEventBubbling}>
          <ModalHeader {...{ title, hasOptionsbutton, isDelete }}>{headerContent}</ModalHeader>
          <div className="h-full overflow-auto">{children}</div>
          {modalType && <ModalFooter {...{ modalType, isFormData, onClose, onDelete, handleButtonClick }} />}
        </div>
      </div>,
      document.body,
    )
  );
}

export default Modal;
