import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../common/Button/Button";
import { useState } from "react";
import { changePassword } from "@/lib/services/auth";
import TextInput from "./PasswordInput";
import AlertModal from "../modal/alert";

interface PasswordFormInput {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

function PasswordChangeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<PasswordFormInput>({
    shouldUnregister: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [modalPwdSuccess, setModalPwdSuccess] = useState(false);

  const onSubmit: SubmitHandler<PasswordFormInput> = async (data) => {
    try {
      const newPasswordData = {
        password: data.password,
        newPassword: data.newPassword,
      };

      const response = await changePassword(newPasswordData);

      if (response.errorMessage) {
        setErrorMessage(response.errorMessage);
      } else {
        console.log("비밀번호가 변경되었습니다!");
        reset();
        setModalPwdSuccess(true);
      }
    } catch (error) {
      console.error("현재 비밀번호가 틀렸습니다!", error);
    }
  };

  return (
    <>
      {modalPwdSuccess && (
        <AlertModal modalType="alert" onClose={() => setModalPwdSuccess(false)} alertType="passwordSuccess" />
      )}
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
        />
        <div className="flex justify-end tablet:text-14 text-12">
          <Button variant="filled_4" buttonType="comment" type="submit">
            변경
          </Button>
        </div>
      </form>
    </>
  );
}

export default PasswordChangeForm;
