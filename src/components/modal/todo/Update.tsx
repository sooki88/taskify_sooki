import { useContext, useEffect, useState } from "react";
import { Controller, FieldValues, FormProvider, useForm } from "react-hook-form";
import { format } from "date-fns";
import { card } from "@/lib/services/cards";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";
import { CardServiceResponseDto } from "@/lib/services/cards/schema";
import { DashboardContext } from "@/pages/dashboard/[id]";
import Modal from "@/components/common/Modal";
import Dropdown from "@/components/common/Dropdown";
import ProfileLabel from "@/components/common/ProfileLabel";
import { ChipProgress } from "@/components/common/Chips";
import { AddImageInputField, DatePickerInputField, FormInputField, FormTagInputField } from "../input";

interface UpdateTodoModalProps<T = void> {
  cardId?: number;
  onClose: () => void;
  callback: (data: FieldValues) => Promise<T>;
  setSelectedImage: any;
}

function UpdateTodoModal({ cardId, onClose, callback, setSelectedImage }: UpdateTodoModalProps) {
  const [cardData, setCardData] = useState<CardServiceResponseDto | undefined>(undefined);
  const methods = useForm({ defaultValues: cardData });
  const { columns, members: memberList } = useContext(DashboardContext);

  const rules = { required: "빈 값은 안됨." };

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        if (cardId) {
          const response = (await card("get", cardId)).data as CardServiceResponseDto;
          setCardData(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCardData();
  }, [cardId]);

  if (!cardData) return;
  const { id: memberId } = cardData.assignee;

  const renderOptionPrograss = (option: ColumnServiceResponseDto) => {
    return <ChipProgress columnTitle={option?.title} />;
  };
  const renderOptionNickName = (option: MemberApplicationServiceResponseDto) => {
    return <ProfileLabel data={option} />;
  };

  return (
    <FormProvider {...methods}>
      <Modal title="할 일 수정" modalType={"update"} onClose={onClose} callback={callback} useFormData>
        <div className="flex flex-col gap-32">
          <div className="tablet:flex tablet:gap-16 justify-between">
            <Controller
              name="columnId"
              control={methods.control}
              defaultValue={cardData.columnId}
              render={({ field }) => {
                return (
                  <div className="flex flex-col gap-10">
                    <label className="text-16 tablet:text-18">상태</label>
                    <Dropdown
                      options={columns}
                      renderOptions={renderOptionPrograss}
                      onChange={(selectedValue) => field.onChange(selectedValue)}
                      defaultIndex={columns.findIndex((option) => option.id === field.value)}
                    />
                  </div>
                );
              }}
            />
            <Controller
              name="assignee.id"
              control={methods.control}
              defaultValue={memberId}
              render={({ field }) => (
                <div className="flex flex-col gap-10">
                  <label className="text-16 tablet:text-18">담당자</label>
                  <Dropdown
                    options={memberList}
                    renderOptions={renderOptionNickName}
                    onChange={(selectedId) => {
                      const selectedMember = memberList.find((member) => member.id === selectedId);
                      if (selectedMember) {
                        field.onChange(selectedMember.userId);
                      }
                    }}
                    defaultIndex={memberList.findIndex(
                      (option: MemberApplicationServiceResponseDto) => option.userId === field.value,
                    )}
                    filteringTerm="nickname"
                    autoComplete
                  />
                </div>
              )}
            />
          </div>
          <FormInputField labelName="title" labelTitle="제목" defaultValue={cardData.title} rules={rules} required />
          <FormInputField
            labelName="description"
            labelTitle="설명"
            defaultValue={cardData.description}
            rules={rules}
            textArea
            required
          />
          <Controller
            name="dueDate"
            control={methods.control}
            defaultValue={cardData.dueDate}
            render={({ field }) => (
              <div className="flex flex-col">
                <label className="text-16 tabelt:text-18" htmlFor="dueDate">
                  마감일
                </label>
                <DatePickerInputField
                  selected={field.value as any}
                  onChange={(selectedValue?: Date) => {
                    const formattedDate = format(selectedValue as Date, "yyyy-MM-dd HH:mm");
                    field.onChange(formattedDate);
                  }}
                />
              </div>
            )}
          />
          <FormTagInputField defaultValue={cardData?.tags} />
          <AddImageInputField value={cardData.imageUrl as string} onChange={setSelectedImage} />
        </div>
      </Modal>
    </FormProvider>
  );
}

export default UpdateTodoModal;
