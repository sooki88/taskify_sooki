import Modal from "@/components/common/Modal";
import React from "react";

interface AlertModalProps {
  modalType: "alert" | "delete";
  callback?: any;
  onClose: () => void;
}

function AlertModal({ modalType, callback, onClose }: AlertModalProps) {
  const text = {
    alert: "비밀번호가 일치하지 않습니다.",
    delete: "컬럼의 모든 카드가 삭제됩니다.",
  };

  return (
    <>
      <Modal modalType={modalType} onClose={onClose} callback={callback}>
        <div className="flex items-center justify-center h-full">
          <span>{text[modalType]}</span>
        </div>
      </Modal>
    </>
  );
}

export default AlertModal;
