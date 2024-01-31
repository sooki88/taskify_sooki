import Image from "next/image";
import { useState, MouseEvent } from "react";

interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  isError?: boolean;
}

function Input({ id, type, placeholder, isError, ...props }: InputProps) {
  const [inputType, setInputType] = useState(type);

  const handlePasswordVisible = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputType((prevType: string) => (prevType === "password" ? "text" : "password"));
  };

  const eyeImage = inputType === "password" ? "/images/eye-off.png" : "/images/eye-on.png";

  return (
    <div className="relative">
      <input
        className={`w-full h-50 px-16 py-15 rounded-8 border-1 border-solid border-gray-D9D9 bg-white focus:border-violet ${isError && "border-red"}`}
        id={id}
        type={inputType}
        placeholder={placeholder}
        {...props}
      />
      {type === "password" && (
        <button className="absolute right-16 translate-y-13" onClick={handlePasswordVisible}>
          <Image src={eyeImage} alt="password toggle" width={24} height={24} />
        </button>
      )}
    </div>
  );
}

function Label({ children, id }: any) {
  return (
    <label className="text-black-3332" htmlFor={id}>
      {children}
    </label>
  );
}

function ErrorMessage({ children }: any) {
  return <div className="text-red text-14">{children}</div>;
}

export { Input, Label, ErrorMessage };
