import { Label, Input, ErrorMessage, InputContainer } from "./Elements";
import { Controller } from "react-hook-form";

const EMAIL_REG = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

function EmailField({ control, errors, name }: any) {
  const rules = {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: EMAIL_REG,
      message: "이메일 형식으로 작성해 주세요.",
    },
  };

  return (
    <InputContainer auth>
      <Label htmlFor={name} auth>
        이메일
      </Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input id={name} type={name} placeholder="이메일을 입력해 주세요" {...field} isError={!!errors[name]} auth />
        )}
      />
      {errors[name] && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
    </InputContainer>
  );
}

export default EmailField;
