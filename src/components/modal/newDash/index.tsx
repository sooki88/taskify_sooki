import { FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import ModalInputField from "@/components/common/ModalInputField";

function NewDashModal({ onClose }: any) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Modal title="새로운 대시보드" modalType={"create"} onClose={onClose} useFormData>
        <ModalInputField labelName="name" labelTitle="대시보드 이름" rules={{ required: "빈 값은 안됨." }} />
      </Modal>
    </FormProvider>
  );
}

export default NewDashModal;
