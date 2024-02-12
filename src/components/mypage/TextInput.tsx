import { RegisterOptions, FieldValues, UseFormRegister, UseFormSetValue, FieldError } from "react-hook-form";
import { ErrorMessage, Label } from "../Auth/Elements";

interface TextInputProps {
  type: string;
  id: "password" | "newPassword" | "newPasswordConfirm" | "email" | "nickname" | "username";
  register: UseFormRegister<FieldValues>;
  validation?: RegisterOptions<FieldValues>;
  labelTitle: string;
  errors?: FieldError;
  placeholder: string;
  disabled?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
  hidden?: boolean;
  autoCompleteValue?: string;
}
function TextInput({
  type,
  id,
  register,
  errors,
  validation,
  labelTitle,
  placeholder,
  disabled,
  hidden,
  autoCompleteValue,
}: TextInputProps) {
  const autocomplete = type === "password" ? "current-password" : autoCompleteValue || "off";

  return (
    <div className={`flex flex-col w-full gap-10 ${hidden ? "hidden" : ""}`}>
      <Label htmlFor={id}>{labelTitle}</Label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete={autocomplete}
        {...register(id, validation)}
        className={`w-full px-16 border-1 focus:border-violet border-solid border-gray-D9D9 tablet:h-48 h-42 rounded-6 text-14 tablet:text-16 placeholder:text-gray-9FA6 ${disabled ? "bg-gray-FAFA text-gray-9FA6" : "bg-white text-black-3332"}`}
        disabled={disabled}
        maxLength={id === "nickname" ? 8 : undefined}
      />
      {errors && <ErrorMessage>{errors.message}</ErrorMessage>}
    </div>
  );
}

export default TextInput;
