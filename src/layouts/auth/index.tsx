import { ReactNode } from "react";
import AuthHeader from "./Header";
import AuthForm from "./Form";
import AuthFooter from "./Footer";

export type AuthType = "logIn" | "signUp";

interface AuthLayoutProps {
  type: AuthType;
  children: ReactNode;
}

function AuthLayout({ type, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-FAFA flex justify-center items-center">
      <div className=" w-544 px-12 mx-auto py-48">
        <AuthHeader type={type} />
        <AuthForm type={type}>{children}</AuthForm>
        <AuthFooter type={type} />
      </div>
    </div>
  );
}

export default AuthLayout;
