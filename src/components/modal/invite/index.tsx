import { useRouter } from "next/router";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { createInvitationDashboard, findInvitationDashboard } from "@/lib/services/dashboards";
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
    const responsefind = await findInvitationDashboard(Number(id), {});
    const find = responsefind.data!.invitations.find((invitation) => invitation.invitee.email === data.email);
    if (find) {
      methods.setError("email", { type: "duplicationEmail", message: "이미 대시보드에 초대된 멤버입니다." });
      return Promise.reject(new Error("duplicationEmail"));
    }
    const responseCreate = await createInvitationDashboard(Number(id), { email: data.email });
    if (responseCreate.errorMessage) {
      methods.setError("email", { type: "noEmail", message: responseCreate.errorMessage });
      return Promise.reject(new Error("noEmail"));
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal title="초대하기" modalType={"invite"} onClose={onClose} callback={callback} isFormData>
        <FormInputField labelName="email" labelTitle="이메일" type="email" rules={rules} />
      </Modal>
    </FormProvider>
  );
}

export default InviteModal;
