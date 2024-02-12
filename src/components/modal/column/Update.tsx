import { SetStateAction } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useToggle } from "usehooks-ts";
import Modal from "@/components/common/Modal";
import { column } from "@/lib/services/columns";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";
import AlertModal from "../alert";
import FormInputField from "../input/FormInputField";

type ColumnData = {
  title: string;
  columnId: number;
};

interface UpdateColumnProps {
  columnData: ColumnData;
  updateColumns: React.Dispatch<SetStateAction<ColumnServiceResponseDto[]>>;
  onClose: () => void;
}
function UpdateColumnModal({ columnData: { title, columnId }, updateColumns, onClose }: UpdateColumnProps) {
  const methods = useForm();
  const [deleteValue, deleteToggle, setDeleteValue] = useToggle();

  const callbackUpdate = async ({ title }: FieldValues) => {
    try {
      const form = {
        title,
      };
      const response = await column("put", columnId, form)!;
      if (response.data) {
        const { title } = response.data;
        updateColumns((prevState) =>
          prevState.map((column: ColumnServiceResponseDto) => (column.id === columnId ? { ...column, title } : column)),
        );
      }
    } catch (e) {
      console.log(e);
      Promise.reject();
    }
  };

  const callbackDelete = async () => {
    try {
      await column("delete", columnId);
      updateColumns((prevState: ColumnServiceResponseDto[]) =>
        prevState.filter((column: ColumnServiceResponseDto) => column.id !== columnId),
      );
    } catch (e) {
      Promise.reject();
    }
  };

  const rules = { required: "컬럼 이름을 입력해주세요." };

  return (
    <FormProvider {...methods}>
      <Modal
        title="컬럼 관리"
        modalType={"update"}
        onClose={onClose}
        onDelete={deleteToggle}
        callback={callbackUpdate}
        isFormData>
        <FormInputField labelName="title" labelTitle="이름" defaultValue={title} rules={rules} />
      </Modal>
      {deleteValue && (
        <AlertModal
          modalType="delete"
          deleteType="column"
          onClose={() => {
            setDeleteValue(false);
          }}
          callback={async () => {
            await callbackDelete().then(() => onClose());
          }}
        />
      )}
    </FormProvider>
  );
}

export default UpdateColumnModal;
