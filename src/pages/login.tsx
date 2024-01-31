import AuthLayout from "@/layouts/auth";
import { AuthInputField } from "@/components/Auth/AuthInputField";

export default function Login() {
  return (
    <AuthLayout type="logIn">
      <AuthInputField labelName="이메일" type="email" id="email" placeholder="이메일을 입력해 주세요" />
      <AuthInputField labelName="비밀번호" type="password" id="password" placeholder="비밀번호를 입력해 주세요" />
    </AuthLayout>
  );
}
