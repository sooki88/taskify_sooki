import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../common/Button/Button";
import { useEffect, useState } from "react";
import { changePassword } from "@/lib/services/auth";
import TextInput from "./PasswordInput";
import AlertModal, { AlertType } from "../modal/alert";
import { useToggle } from "usehooks-ts";

interface MessageToType {
  [key: string]: AlertType;
}

interface PasswordFormInput {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

function PasswordChangeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm<PasswordFormInput>({
    shouldUnregister: false,
    mode: "all",
  });

  const [alertValue, alertToggle, setAlertValue] = useToggle();
  const [alertType, setAlertType] = useState<AlertType>("");
  const [isPasswordMatchError, setIsPasswordMatchError] = useState(false);

  const messageToType: MessageToType = {
    "기존 비밀번호와 동일합니다.": "passwordSameError",
    "현재 비밀번호가 틀렸습니다.": "incorrectPassword",
  };

  useEffect(() => {
    const handleConfirmBlur = () => {
      const newPassword = getValues("newPassword");
      const newPasswordConfirm = getValues("newPasswordConfirm");
      setIsPasswordMatchError(newPassword !== newPasswordConfirm);
    };

    return () => {
      window.removeEventListener("blur", handleConfirmBlur);
    };
  }, [getValues]);

  const onSubmit: SubmitHandler<PasswordFormInput> = async (data) => {
    try {
      const newPasswordData = {
        password: data.password,
        newPassword: data.newPassword,
      };

      const response = await changePassword(newPasswordData);

      if (response.errorMessage) {
        const errorMessage = response.errorMessage;
        const type = messageToType[errorMessage];
        setAlertType(type);
        setAlertValue(true);
      } else {
        setAlertType("passwordSuccess");
        setAlertValue(true);
        reset();
      }
    } catch (error) {
      console.error("비밀번호 변경을 실패했습니다.", error);
    }
  };

  return (
    <>
      {alertValue && <AlertModal modalType="alert" onClose={alertToggle} alertType={alertType} />}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col tablet:gap-24 gap-16">
        <TextInput
          type="password"
          id="password"
          register={register}
          errors={errors}
          validation={{
            required: "비밀번호를 입력해 주세요.",
          }}
          labelTitle="현재 비밀번호"
          placeholder="현재 비밀번호 입력"
        />
        <TextInput
          type="password"
          id="newPassword"
          register={register}
          errors={errors}
          validation={{
            required: "새 비밀번호를 입력해 주세요.",
            minLength: { value: 8, message: "새 비밀번호는 8자 이상 입력해주세요." },
          }}
          labelTitle="새 비밀번호"
          placeholder="새 비밀번호 입력"
        />
        <TextInput
          type="password"
          id="newPasswordConfirm"
          register={register}
          errors={errors}
          validation={{
            required: "새 비밀번호를 입력해 주세요.",
            validate: (value) => value === getValues("newPassword") || "비밀번호가 일치하지 않습니다.",
          }}
          labelTitle="새 비밀번호 확인"
          placeholder="새 비밀번호 입력"
          onBlur={() => setIsPasswordMatchError(getValues("newPassword") !== getValues("newPasswordConfirm"))}
        />
        <div className="flex justify-end tablet:text-14 text-12">
          <Button variant="filled_4" buttonType="comment" type="submit" disabled={!isValid}>
            변경
          </Button>
        </div>
      </form>
    </>
  );
}

export default PasswordChangeForm;
