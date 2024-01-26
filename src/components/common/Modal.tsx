import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ModalProps<T = void> {
  children: ReactNode;
  title: string;
  modalType?: "alert" | "create" | "update" | "delete";
  hasOptionsbutton?: boolean;
  callback?: () => T;
  onClose: () => void;
  onDelete?: () => void;
}

function Modal({
  children,
  title = "title",
  modalType = "alert",
  hasOptionsbutton,
  callback,
  onClose,
  onDelete,
}: ModalProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const isAlert = modalType === "alert";
  const isUpdate = modalType === "update";
  const isDelete = modalType === "delete";

  const buttonMapping: Record<string, string> = {
    alert: "확인",
    create: "생성",
    update: "수정",
    delete: "삭제",
  };

  const stopEventBubbling = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = () => {
    if (callback) {
      callback();
    }
    onClose();
  };

  //CSR 환경에서만 접근
  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  return (
    portalRoot &&
    createPortal(
      <div
        className="fixed inset-0 flex items-center justify-center w-full h-full modal-bg bg-black-overlay"
        onClick={onClose}>
        <div
          className="bg-white min-w-[327px] min-h-[220px] rounded-5 px-[20px] py-[28px] tablet:px-[28px] grid grid-rows-[auto,1fr,auto]"
          onClick={stopEventBubbling}>
          {/* 모달 헤더 영역 */}
          <header className="flex items-center justify-between modal-header mb-[24px] tablet:mt-[4px] tablet:mb-[32px]">
            {!isDelete && <span className="font-bold text-black-3332 text-20 tablet:text-24">{title}</span>}
            {/**모달 헤더 버튼 영역 */}
            {hasOptionsbutton && (
              <div className="flex items-center gap-15">
                <button
                  onClick={() => {
                    //케밥 컴포넌트 생성 후 추가
                    console.log("kebob");
                  }}>
                  <Image src={"/images/kebob.png"} alt="kebob" width={28} height={28} />
                </button>
                <button onClick={onClose}>
                  <Image src={"/images/close.png"} alt="close" width={32} height={32} />
                </button>
              </div>
            )}
          </header>
          {/* 콘텐츠 영역 */}
          <div className="h-full overflow-auto">{children}</div>
          {/* 모달 푸터 영역 */}
          <footer className="flex flex-col tablet:flex-row tablet:justify-between">
            {isUpdate && (
              <span className="underline text-nowrap text-gray-9FA6" onClick={onDelete}>
                삭제하기
              </span>
            )}
            <div className="flex justify-center w-full gap-12 tablet:justify-end">
              {/* 버튼 컴포넌트 생성 후 변경 */}
              {!isAlert && <button onClick={onClose}>취소</button>}
              <button onClick={handleSubmit}>{buttonMapping[modalType]}</button>
            </div>
          </footer>
        </div>
      </div>,
      document.body,
    )
  );
}

export default Modal;
