import { Dispatch, SetStateAction, useContext } from "react";
import { Controller, FieldValues, FormProvider, useForm } from "react-hook-form";
import { format } from "date-fns";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import { DashboardContext } from "@/pages/dashboard/[id]";
import Modal from "@/components/common/Modal";
import Dropdown from "@/components/common/Dropdown";
import ProfileLabel from "@/components/common/ProfileLabel";
import { AddImageInputField, DatePickerInputField, FormInputField, FormTagInputField } from "../input";

type ImageObject = {
  url: string;
  name: string;
  type: string;
};

interface CreateTodoModalProps<T = void> {
  onClose: () => void;
  callback?: (data: FieldValues) => Promise<T>;
  setSelectedImage: Dispatch<SetStateAction<File | ImageObject>> | any;
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
                onChange={(selectedId) => {
                  const selectedMember = memberList.find((member) => member.id === selectedId);
                  if (selectedMember) {
                    field.onChange(selectedMember.userId);
                  }
                }}
                defaultIndex={memberList.findIndex((member) => member.userId === field.value)}
                filteringTerm="nickname"
                autoComplete
              />
            )}
          />
          <FormInputField labelName="title" labelTitle="제목" rules={rules} required />
          <FormInputField labelName="description" labelTitle="설명" rules={rules} textArea required />
          <Controller
            name="dueDate"
            control={methods.control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label className="text-16 tabelt:text-18" htmlFor="dueDate">
                  마감일
                </label>
                <DatePickerInputField
                  selected={field.value}
                  onChange={(selectedValue?: Date) => {
                    const formattedDate = format(selectedValue as Date, "yyyy-MM-dd HH:mm");
                    field.onChange(formattedDate);
                  }}
                />
              </div>
            )}
          />
          <FormTagInputField />
          <AddImageInputField onChange={setSelectedImage} />
        </div>
      </Modal>
    </FormProvider>
  );
}

export default CreateTodoModal;
