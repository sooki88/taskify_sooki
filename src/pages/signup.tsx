import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/router";
import AuthLayout from "@/layouts/auth";
import AuthForm from "@/layouts/auth/Form";
import AuthCheckbox from "@/components/Auth/AuthCheckbox";
import EmailField from "@/components/Auth/EmailField ";
import NameField from "@/components/Auth/NameField";
import PasswordField from "@/components/Auth/PasswordField";
import PasswordCheckField from "@/components/Auth/PasswordCheckField";
import { register } from "@/lib/services/users";
import { CreateUserRequestDto } from "@/lib/services/users/schema";
import AlertModal, { AlertType } from "@/components/modal/alert";
import { login } from "@/lib/services/auth";

export default function SignUp() {
  const [alertValue, setAlertValue] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>("");
  const router = useRouter();

  const SIGN_UP_FORM = {
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    agreeCheck: false,
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, touchedFields },
    trigger,
  } = useForm({ defaultValues: SIGN_UP_FORM, mode: "onTouched" });

  const onSubmit = async (data: CreateUserRequestDto) => {
    const { email, nickname, password } = data;
    const signUpForm = { email, nickname, password };
    const loginForm = { email, password };

    try {
      const response = await register(signUpForm);
      if (response.data) {
        const res = await login(loginForm);
        const accessToken = res.data?.accessToken;
        document.cookie = `accessToken=${accessToken}`;
        router.push("/mydashboard");
      }
      if (response.errorMessage) {
        switch (response.errorMessage) {
          case "이미 사용중인 이메일입니다.":
            handleAlert("emailInUse");
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

  const password = useWatch({ control, name: "password" });

  const triggerPasswordCheck = () => {
    if (touchedFields.passwordCheck) {
      trigger("passwordCheck");
    }
  };

  const handleAlert = (type: AlertType) => {
    setAlertType(type);
    setAlertValue(true);
  };

  return (
    <>
      <AuthLayout type="signUp">
        <AuthForm onSubmit={handleSubmit(onSubmit)} type="signUp" disabled={!isDirty || !isValid}>
          <EmailField name="email" control={control} errors={errors} />
          <NameField name="nickname" control={control} errors={errors} />
          <PasswordField
            name="password"
            control={control}
            errors={errors}
            triggerPasswordCheck={triggerPasswordCheck}
          />
          <PasswordCheckField name="passwordCheck" control={control} errors={errors} password={password} />
          <AuthCheckbox name="agreeCheck" control={control} />
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
