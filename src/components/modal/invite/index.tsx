import { useRouter } from "next/router";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { createInvitationDashboard } from "@/lib/services/dashboards";
import Modal from "@/components/common/Modal";
import { FormInputField } from "../input";

interface InviteModalProps {
  onClose: () => void;
}

function InviteModal({ onClose }: InviteModalProps) {
  const methods = useForm();
  const {
    query: { id },
  } = useRouter();

  const rules = { required: "이메일을 입력해 주세요." };

  const callback = async (data: FieldValues) => {
    try {
      const response = await createInvitationDashboard(Number(id), { email: data.email });
      if (response.errorMessage) {
        methods.setError("email", { type: "noEmail", message: response.errorMessage });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal title="초대하기" modalType={"invite"} onClose={onClose} callback={callback} useFormData>
        <FormInputField labelName="email" labelTitle="이메일" type="email" rules={rules} />
      </Modal>
    </FormProvider>
  );
}

export default InviteModal;
