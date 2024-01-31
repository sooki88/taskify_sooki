import { FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import ModalInputField from "@/components/common/ModalInputField";

function CreateTodoModal({ onClose }: any) {
  const methods = useForm();

  const rules = { required: "빈 값은 안됨." };

  return (
    <FormProvider {...methods}>
      <Modal title="할 일 생성" modalType={"create"} onClose={onClose} useFormData>
        <ModalInputField labelName="name" labelTitle="이름" />
        <ModalInputField labelName="title" labelTitle="제목" rules={rules} required />
        <ModalInputField labelName="description" labelTitle="설명" rules={rules} textArea required />
        <ModalInputField labelName="deadline" labelTitle="마감일" />
        <ModalInputField labelName="tag" labelTitle="태그" />
        <ModalInputField labelName="image" labelTitle="이미지" />
      </Modal>
    </FormProvider>
  );
}

export default CreateTodoModal;
