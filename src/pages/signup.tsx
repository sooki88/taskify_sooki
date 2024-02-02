import AuthLayout from "@/layouts/auth";
import { AuthInputField, AuthCheckBox } from "@/components/Auth/AuthInputField";

export default function SignUp() {
  return (
    <AuthLayout type="signUp" disabled>
      <AuthInputField labelName="이메일" type="email" id="email" placeholder="이메일을 입력해 주세요" auth />
      <AuthInputField labelName="닉네임" type="text" id="nickname" placeholder="닉네임을 입력해 주세요" auth />
      <AuthInputField labelName="비밀번호" type="password" id="password" placeholder="비밀번호를 입력해 주세요" auth />
      <AuthInputField
        labelName="비밀번호 확인"
        type="password"
        id="password-check"
        placeholder="비밀번호를 한번 더 입력해 주세요"
        auth
      />
      <AuthCheckBox />
    </AuthLayout>
  );
}
