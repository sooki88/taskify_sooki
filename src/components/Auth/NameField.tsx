import { Label, Input, ErrorMessage, InputContainer } from "./AuthInputField/Elements";
import { Controller } from "react-hook-form";

function NameField({ control, errors, name }: any) {
  const rules = {
    required: "닉네임을 입력해주세요.",
    maxLength: {
      value: 10,
      message: "열 자 이하로 작성해주세요.",
    },
  };
  return (
    <InputContainer auth>
      <Label id={name} auth>
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
