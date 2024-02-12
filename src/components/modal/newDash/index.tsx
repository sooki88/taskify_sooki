import { useState } from "react";
import { Controller, FieldValues, FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import { ChipColors } from "@/components/common/Chips";
import { createDashboard } from "@/lib/services/dashboards";
import { useRouter } from "next/router";
import { FormInputField } from "../input";

function NewDashModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const methods = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const callback = async ({ title }: FieldValues) => {
    const form = {
      title,
      color: methods.getValues("color"),
    };
    const response = await createDashboard(form);

    if (response.errorMessage) {
      methods.setError("color", { type: "noColor", message: response.errorMessage });
      const isMessage = methods.formState.errors.color?.message;
      const message = typeof isMessage === "string" ? errorMessage : "";
      setErrorMessage(message);
      return Promise.reject(new Error());
    } else {
      router.push(`/dashboard/${response.data?.id}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal title="새로운 대시보드" modalType={"create"} onClose={onClose} callback={callback} isFormData>
        <div className="flex flex-col w-full gap-28">
          <FormInputField
            labelName="title"
            labelTitle="대시보드 이름"
            rules={{ required: "대시보드 이름을 작성해 주세요." }}
          />
          <Controller
            control={methods.control}
            defaultValue={"#7ac555"}
            name="color"
            render={({ field }) => (
              <>
                <ChipColors
                  selectColor={field.value}
                  setSelectColor={(newValue) => {
                    field.onChange(newValue);
                  }}
                />
                {methods.formState.errors.color?.message && <span className="text-red mt-10 block">{}</span>}
              </>
            )}
          />
        </div>
      </Modal>
    </FormProvider>
  );
}

export default NewDashModal;
