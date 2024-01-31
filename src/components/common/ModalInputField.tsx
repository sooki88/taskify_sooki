import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  labelTitle: string;
  textArea?: boolean;
  rules?: any;
  required?: boolean;
}

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelName: string;
  labelTitle: string;
  textArea: true;
  rules?: any;
  required?: boolean;
}

type CombinedFieldProps = InputFieldProps | TextAreaFieldProps;

function ModalInputField({ labelName, labelTitle, textArea, rules, required, ...props }: CombinedFieldProps) {
  const {
    trigger,
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[labelName]?.message;
  const errorText = typeof errorMessage === "string" ? errorMessage : "";

  //blur 적용할거면 사용.
  const triggerValidationOnBlur = async () => {
    await trigger(labelName);
  };

  const fieldClass = `border-1 rounded-6 py-14 px-16`;
  const errorBorder = errors[labelName] ? "border-red" : "border-gray-D9D9";

  return (
    <div className="flex flex-col">
      <label className="text-16 tablet:text-18" htmlFor={labelName}>
        {labelTitle}
        {required && <span className="text-violet">*</span>}
      </label>
      <Controller
        name={labelName}
        control={control}
        rules={rules}
        defaultValue={""}
        render={({ field }) =>
          textArea ? (
            <textarea
              className={`${fieldClass} ${errorBorder} resize-none outline-none`}
              {...field}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              className={`${fieldClass} ${errorBorder} h-42 tablet:h-48 `}
              {...field}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )
        }
      />
      {errors[labelName] && <span className="text-red">{errorText}</span>}
    </div>
  );
}

export default ModalInputField;
