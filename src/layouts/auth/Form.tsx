import Button from "@/components/common/Button/Button";
import { AuthType } from ".";
import { ReactNode } from "react";
import { AUTH_MAPPING } from "@/lib/constants";

interface AuthFormProps {
  type: "logIn" | "signUp" | "profile" | "password";
  children: ReactNode;
  disabled?: boolean;
}

type Variant = "filled" | "filled_4" | "ghost" | "ghost_gray";
type ButtonType = "auth" | "confirm" | "modal" | "delete" | "comment";

function AuthForm({ type, children, disabled }: AuthFormProps) {
  const FORM_TYPE = AUTH_MAPPING[type];

  return (
    <section>
      <form className={`${FORM_TYPE.formStyle}`}>
        {children}
        <div className={`${FORM_TYPE.buttonStyle}`}>
          <Button
            variant={FORM_TYPE.buttonVariant as Variant}
            buttonType={FORM_TYPE.buttonType as ButtonType}
            disabled={disabled}>
            {FORM_TYPE.button}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
