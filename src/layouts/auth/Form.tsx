import Button from "@/components/common/Button";
import { AuthType } from ".";
import { ReactNode } from "react";
import { AUTH_MAPPING } from "@/lib/constants";

interface AuthFormProps {
  type: AuthType;
  children: ReactNode;
}

function AuthForm({ children, type }: AuthFormProps) {
  return (
    <section>
      <form className="flex flex-col gap-16 ">
        {children}
        <div className="pt-4">
          <Button variant="filled" fontsize={18} width="100%" height={50}>
            {AUTH_MAPPING[type].button}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
