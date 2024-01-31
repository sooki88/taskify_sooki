import { FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import ModalInputField from "@/components/common/ModalInputField";

function CreateColumnModal({ onClose }: any) {
  const methods = useForm();

  const rules = { required: "빈 값은 안됨." };

  return (
    <FormProvider {...methods}>
      <Modal title="새 컬럼 생성" modalType={"create"} onClose={onClose} useFormData>
        <ModalInputField labelName="name" labelTitle="이름" rules={rules} />
      </Modal>
    </FormProvider>
  );
}

export default CreateColumnModal;
