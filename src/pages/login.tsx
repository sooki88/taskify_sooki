import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { login } from "@/lib/services/auth";
import AuthLayout from "@/layouts/auth";
import AuthForm from "@/layouts/auth/Form";
import EmailField from "@/components/Auth/EmailField";
import PasswordField from "@/components/Auth/PasswordField";
import AlertModal, { AlertType } from "@/components/modal/alert";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [alertValue, setAlertValue] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>("");
  const LOGIN_FORM = {
    email: "",
    password: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginForm>({ defaultValues: LOGIN_FORM, mode: "onTouched" });

  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data);
      if (response.data) {
        const accessToken = response.data?.accessToken;
        document.cookie = `accessToken=${accessToken}`;
        router.push("/mydashboard");
        return;
      }
      if (response.errorMessage) {
        switch (response.errorMessage) {
          case "존재하지 않는 유저입니다.":
            handleAlert("userNotFound");
            break;
          case "비밀번호가 일치하지 않습니다.":
            handleAlert("passwordMismatch");
            break;
          case "Internal Server Error":
            handleAlert("serverError");
            break;
        }
      }
    } catch (error) {
      handleAlert("serverError");
    }
  };

  const handleAlert = (type: AlertType) => {
    setAlertType(type);
    setAlertValue(true);
  };

  return (
    <>
      <AuthLayout type="logIn">
        <AuthForm onSubmit={handleSubmit(onSubmit)} type="logIn" disabled={!isDirty || !isValid}>
          <EmailField<LoginForm> name="email" control={control} errors={errors} />
          <PasswordField<LoginForm> name="password" control={control} errors={errors} />
        </AuthForm>
      </AuthLayout>
      {alertValue && <AlertModal modalType="alert" alertType={alertType} onClose={() => setAlertValue(false)} />}
    </>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const cookieValue = context.req.headers.cookie || "";

  if (cookieValue) {
    return {
      redirect: {
        destination: "/mydashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
