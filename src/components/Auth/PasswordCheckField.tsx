import { Label, Input, ErrorMessage, InputContainer } from "./Elements";
import { Controller } from "react-hook-form";

function PasswordCheckField({ control, errors, name, password }: any) {
  const rules = {
    required: "비밀번호를 확인해 주세요",
    validate: {
      checkPassword: (value: string) => password === value || "비밀번호가 일치하지 않습니다.",
    },
  };

  return (
    <InputContainer auth>
      <Label htmlFor={name} auth>
        비밀번호 확인
      </Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input
            id={name}
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            {...field}
            isError={!!errors[name]}
            auth
            autoComplete="off"
          />
        )}
      />
      {errors[name] && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
    </InputContainer>
  );
}

export default PasswordCheckField;
