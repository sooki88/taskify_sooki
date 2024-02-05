import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useToggle } from "usehooks-ts";
import AuthLayout from "@/layouts/auth";
import AuthForm from "@/layouts/auth/Form";
import EmailField from "@/components/Auth/EmailField ";
import PasswordField from "@/components/Auth/PasswordField";
import { login } from "@/lib/services/auth";
import AlertModal, { AlertType } from "@/components/modal/alert";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [alertValue, alertToggle, setAlertValue] = useToggle();
  const [alertType, setAlertType] = useState<AlertType>("");
  const LOGIN_FORM = {
    email: "",
    password: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({ defaultValues: LOGIN_FORM, mode: "onTouched" });

  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data);
      if (response.data) {
        const accessToken = response.data?.accessToken;
        localStorage.setItem("accessToken", accessToken);
        router.push("/mydashboard");
        return;
      }
      if (response.errorMessage) {
        switch (response.errorMessage) {
          case "존재하지 않는 유저입니다.":
            setAlertType("userNotFound");
            setAlertValue(true);
            break;
          case "비밀번호가 일치하지 않습니다.":
            setAlertType("passwordMismatch");
            setAlertValue(true);
            break;
        }
      }
    } catch (error) {
      setAlertType("serverError");
      setAlertValue(true);
    }
  };

  return (
    <>
      <AuthLayout type="logIn">
        <AuthForm onSubmit={handleSubmit(onSubmit)} type="logIn" disabled={!isDirty || !isValid}>
          <EmailField name="email" control={control} errors={errors} />
          <PasswordField name="password" control={control} errors={errors} />
        </AuthForm>
      </AuthLayout>
      {alertValue && <AlertModal modalType="alert" alertType={alertType} onClose={() => setAlertValue(false)} />}
    </>
  );
}
