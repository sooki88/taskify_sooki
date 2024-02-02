import { ReactNode } from "react";
import AuthHeader from "./Header";
import AuthForm from "./Form";
import AuthFooter from "./Footer";

export type AuthType = "logIn" | "signUp";

interface AuthLayoutProps {
  type: AuthType;
  children: ReactNode;
  disabled: boolean;
}

function AuthLayout({ type, children, disabled }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-FAFA">
      <div className="px-12 py-48 mx-auto  w-544">
        <AuthHeader type={type} />
        <AuthForm type={type} disabled={disabled}>
          {children}
        </AuthForm>
        <AuthFooter type={type} />
      </div>
    </div>
  );
}

export default AuthLayout;
