import { Dispatch, SetStateAction, useContext } from "react";
import { Controller, FieldValues, FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import Dropdown from "@/components/common/Dropdown";
import ProfileLabel from "@/components/common/ProfileLabel";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import AddImageInput from "../input/AddImageInput";
import FormInputField from "../input/FormInputField";
import FormTagField from "../input/FormTagField";
import { DashboardContext } from "@/pages/dashboard/[id]";

interface CreateTodoModalProps<T = void> {
  onClose: () => void;
  callback?: (data: FieldValues) => Promise<T>;
  setSelectedImage: Dispatch<SetStateAction<File | undefined>>;
}

function CreateTodoModal({ onClose, callback, setSelectedImage }: CreateTodoModalProps) {
  const methods = useForm();
  const { members: memberList } = useContext(DashboardContext);

  const rules = { required: "빈 값은 안됨." };

  const renderOptionNickName = (option: MemberApplicationServiceResponseDto) => <ProfileLabel data={option} />;
  const defaultMemberId = memberList[0]?.userId || "";

  return (
    <FormProvider {...methods}>
      <Modal title="할 일 생성" modalType={"create"} onClose={onClose} callback={callback} useFormData>
        <div className="flex flex-col gap-32">
          <Controller
            name="assigneeUserId"
            control={methods.control}
            defaultValue={defaultMemberId}
            render={({ field }) => (
              <Dropdown
                options={memberList}
                renderOptions={renderOptionNickName}
                onChange={(selectedValue) => field.onChange(selectedValue)}
                defaultIndex={memberList.findIndex(
                  (member: MemberApplicationServiceResponseDto) => member.userId === field.value,
                )}
                filteringTerm="nickname"
                autoComplete
              />
            )}
          />
          <FormInputField labelName="title" labelTitle="제목" rules={rules} required />
          <FormInputField labelName="description" labelTitle="설명" rules={rules} textArea required />
          <FormInputField labelName="dueDate" labelTitle="마감일" />
          <FormTagField />
          <AddImageInput onChange={setSelectedImage} />
        </div>
      </Modal>
    </FormProvider>
  );
}

export default CreateTodoModal;
