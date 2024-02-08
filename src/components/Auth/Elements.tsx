import Image from "next/image";
import { useState, MouseEvent, forwardRef } from "react";
interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  isError?: boolean;
  auth?: boolean;
  autoComplete?: string;
  onChange: any; // 타입 수정 예정
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, type, placeholder, isError, auth, autoComplete, ...props },
  ref,
) {
  const [inputType, setInputType] = useState(type);

  const handlePasswordVisible = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputType((prevType: string) => (prevType === "password" ? "text" : "password"));
  };

  const eyeImage = inputType === "password" ? "/images/eye-off.png" : "/images/eye-on.png";

  const AUTH_INPUT_STYLE = auth
    ? "h-50 py-15 rounded-8"
    : "tablet:h-48 h-42 rounded-6 text-14 tablet:text-16 placeholder:text-gray-9FA6";

  const AUTH_EYEIMG_STYLE = auth ? "w-24 h-24" : "w-17 h-17 tablet:w-22 tablet:h-22";

  return (
    <div className="relative">
      <input
        className={`w-full px-16 border-1 focus:border-violet border-solid  border-gray-D9D9 bg-white text-black-3332 ${AUTH_INPUT_STYLE} ${isError && "border-red"}`}
        id={id}
        type={inputType}
        placeholder={placeholder}
        autoComplete={autoComplete}
        ref={ref}
        {...props}
      />
      {type === "password" && (
        <button className="absolute right-16 translate-y-13" type="button" onClick={handlePasswordVisible}>
          <div className={`relative ${AUTH_EYEIMG_STYLE}`}>
            <Image fill src={eyeImage} alt="password toggle" sizes="24px" />
          </div>
        </button>
      )}
    </div>
  );
});

export function Label({ children, htmlFor, auth }: any) {
  const AUTH_TEXT = auth ? "" : "tablet:text-18 font-medium tablet:h-21 h-19";

  return (
    <label className={`text-black-3332 text-16 ${AUTH_TEXT}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export function ErrorMessage({ children }: any) {
  return <div className="text-red text-14">{children}</div>;
}

export function InputContainer({ auth, children }: any) {
  const gap = auth ? "gap-8" : "gap-10";
  return <div className={`flex flex-col w-full ${gap}`}>{children}</div>;
}
