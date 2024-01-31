import { FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import ModalInputField from "@/components/common/ModalInputField";

function TaskModal({ onClose }: any) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Modal title="새로운 일정 관리 Taskify" onClose={onClose} hasOptionsbutton>
        task
      </Modal>
    </FormProvider>
  );
}

export default TaskModal;
