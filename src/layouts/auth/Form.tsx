import Button from "@/components/common/Button/Button";
import { AuthType } from ".";
import { ReactNode } from "react";
import { AUTH_MAPPING } from "@/lib/constants";
import { AuthType } from ".";
interface AuthFormProps {
  type: AuthType;
  children: ReactNode;
  disabled?: boolean;
  onSubmit: any; // 수정예정
}

function AuthForm({ type, children, disabled, onSubmit }: AuthFormProps) {
  const FORM_TYPE = AUTH_MAPPING[type];

  return (
    <section>
      <form className="flex flex-col gap-16" onSubmit={onSubmit}>
        {children}
        <div className="pt-4">
          <Button variant="filled" buttonType="auth" disabled={disabled} type="submit">
            {FORM_TYPE.button}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
