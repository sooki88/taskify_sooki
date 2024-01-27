import React from "react";
import Modal from "../common/Modal";

interface AlertModalProps {
  onClose: () => void;
}

function AlertModal({ onClose }: AlertModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className="flex justify-center items-center h-full">
        <span>비밀번호가 일치하지 않습니다.</span>
      </div>
    </Modal>
  );
}

export default AlertModal;
