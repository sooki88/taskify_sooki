import { useToggle } from "usehooks-ts";
import { useState } from "react";
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

export default function SignUp() {
  const [alertValue, alertToggle, setAlertValue] = useToggle();
  const [alertType, setAlertType] = useState<AlertType>("");

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

  const router = useRouter();

  const onSubmit = async (data: CreateUserRequestDto) => {
    try {
      const response = await register(data);
      if (response.data) {
        router.push("/login");
        return;
      }
      if (response.errorMessage) {
        setAlertType("emailInUse");
        setAlertValue(true);
      }
    } catch (error) {
      setAlertType("serverError");
      setAlertValue(true);
    }
  };

  const password = useWatch({ control, name: "password" });

  const triggerPasswordCheck = () => {
    if (touchedFields.passwordCheck) {
      trigger("passwordCheck");
    }
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
