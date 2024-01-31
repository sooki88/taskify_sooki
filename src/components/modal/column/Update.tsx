import { FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import ModalInputField from "@/components/common/ModalInputField";

function UpdateColumnModal({ onClose, onDelete }: any) {
  const methods = useForm();

  const rules = { required: "빈 값은 안됨." };

  return (
    <FormProvider {...methods}>
      <Modal title="컬럼 관리" modalType={"update"} onClose={onClose} onDelete={onDelete} useFormData>
        <ModalInputField labelName="name" labelTitle="이름" rules={rules} />
      </Modal>
    </FormProvider>
  );
}

export default UpdateColumnModal;
