import { RegisterOptions, FieldValues } from "react-hook-form";
import { ErrorMessage, Label } from "../Auth/Elements";

interface TextInputProps {
  type: string;
  id: "password" | "newPassword" | "newPasswordConfirm" | "email" | "nickname";
  register: any;
  errors?: any;
  validation?: RegisterOptions<FieldValues, "password" | "newPassword" | "newPasswordConfirm">;
  labelTitle: string;
  placeholder: string;
  disabled?: boolean;
  setValue?: any;
}

function TextInput({ type, id, register, errors, labelTitle, placeholder, disabled }: TextInputProps) {
  const autoCompleteValue = type === "password" ? "current-password" : undefined;

  return (
    <div className="flex flex-col w-full gap-10">
      <Label htmlFor={id}>{labelTitle}</Label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete={autoCompleteValue}
        {...register}
        className={`w-full px-16 border-1 focus:border-violet border-solid border-gray-D9D9 tablet:h-48 h-42 rounded-6 text-14 tablet:text-16 placeholder:text-gray-9FA6 ${disabled ? "bg-gray-FAFA text-gray-9FA6" : "bg-white text-black-3332"}`}
        disabled={disabled}
      />
      {errors?.[id] && <ErrorMessage>{errors[id]?.message}</ErrorMessage>}
    </div>
  );
}

export default TextInput;
