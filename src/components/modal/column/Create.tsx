import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import { useRouter } from "next/router";
import { createColumn, findColumns } from "@/lib/services/columns";
import { FormInputField } from "../input";
import { Dispatch, SetStateAction } from "react";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";

interface CreateColumnModalProps {
  onClose: () => void;
  updateColumns: Dispatch<SetStateAction<ColumnServiceResponseDto[]>>;
}

function CreateColumnModal({ onClose, updateColumns }: CreateColumnModalProps) {
  const methods = useForm();
  const router = useRouter();

  const rules = { required: "컬럼 이름을 입력해 주세요." };

  const callback = async ({ title }: FieldValues) => {
    const dashboardIdRaw = router.query?.id;
    if (dashboardIdRaw) {
      const dashboardId = +dashboardIdRaw;
      const form = {
        title,
        dashboardId: dashboardId,
      };
      const { data: columns } = await findColumns({ dashboardId });
      const { data: newColumn, errorMessage } = await createColumn(form);

      if (newColumn) {
        updateColumns((prevColumns) => [...prevColumns, newColumn]);
        onClose();
      }

      if (errorMessage && columns?.data?.length === 10) {
        methods.setError("title", { type: "maxColumns", message: errorMessage });
        return Promise.reject(new Error("maxColumns"));
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal title="새 컬럼 생성" modalType={"create"} onClose={onClose} callback={callback} isFormData>
        <FormInputField labelName="title" labelTitle="이름" rules={rules} />
      </Modal>
    </FormProvider>
  );
}

export default CreateColumnModal;
