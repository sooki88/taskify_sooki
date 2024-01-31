import { FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import ModalInputField from "@/components/common/ModalInputField";

function UpdateTodoModal({ onClose, callback }: any) {
  const methods = useForm();

  const rules = { required: "빈 값은 안됨." };

  return (
    <FormProvider {...methods}>
      <Modal title="할 일 수정" modalType={"update"} onClose={onClose} callback={callback} useFormData>
        <div className="tablet:flex tablet:gap-16">
          <ModalInputField labelName="state" labelTitle="상태" />
          <ModalInputField labelName="name" labelTitle="담당자" />
        </div>
        <ModalInputField labelName="title" labelTitle="제목" rules={rules} required />
        <ModalInputField labelName="description" labelTitle="설명" rules={rules} textArea required />
        <ModalInputField labelName="deadline" labelTitle="마감일" />
        <ModalInputField labelName="tag" labelTitle="태그" />
        <ModalInputField labelName="image" labelTitle="이미지" />
      </Modal>
    </FormProvider>
  );
}

export default UpdateTodoModal;
