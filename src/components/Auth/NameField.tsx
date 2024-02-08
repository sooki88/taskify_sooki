import { SignUpType } from "@/pages/signup";
import { Label, Input, ErrorMessage, InputContainer } from "./Elements";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface NameFieldProps extends SignUpType {
  name: "nickname";
}

function NameField({ control, errors, name }: NameFieldProps) {
  const rules = {
    required: "닉네임을 입력해주세요.",
    maxLength: {
      value: 8,
      message: "8자 이하로 작성해주세요.",
    },
  };
  return (
    <InputContainer auth>
      <Label htmlFor={name} auth>
        닉네임
      </Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input id={name} type="text" placeholder="닉네임을 입력해 주세요" {...field} isError={!!errors[name]} auth />
        )}
      />
      {errors[name] && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
    </InputContainer>
  );
}

export default NameField;
