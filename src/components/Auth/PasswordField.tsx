import { Label, Input, ErrorMessage, InputContainer } from "./Elements";
import { Controller } from "react-hook-form";

function PasswordField({ control, errors, name, triggerPasswordCheck }: any) {
  const rules = {
    required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 8,
      message: "8자 이상 작성해 주세요.",
    },
  };

  return (
    <InputContainer auth>
      <Label htmlFor="password" auth>
        비밀번호
      </Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input
            id={name}
            type={name}
            {...field}
            onChange={async (values: string) => {
              await field.onChange(values);
              if (triggerPasswordCheck) return triggerPasswordCheck();
            }}
            placeholder="비밀번호를 입력해 주세요"
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

export default PasswordField;
