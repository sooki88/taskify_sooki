import { ButtonHTMLAttributes } from "react";

type Variant = "filled" | "ghost" | "ghost_gray";
type ButtonType = "auth" | "confirm" | "modal" | "delete" | "comment" | "landing";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  buttonType: ButtonType;
}

function Button({ variant, buttonType, children, ...props }: ButtonProps) {
  const baseClasses = "flex justify-center items-center";
  const disabledClasses = props.disabled ? "bg-gray-9FA6" : "bg-violet";

  const variantClasses = {
    filled: `${disabledClasses} text-white rounded-8`,
    filled_4: `${disabledClasses} text-white rounded-4`,
    ghost: "bg-white border border-gray-D9D9 text-violet rounded-4",
    ghost_gray: "bg-white border border-gray-D9D9 text-gray-7874 rounded-4",
  };

  const sizeClasses = {
    //double Button
    confirm: "w-109 h-28 text-12 tablet:w-72 tablet:h-30 tablet:text-14 pc:w-84 pc:h-32",
    modal: "w-138 h-42 text-14 tablet:w-120 tablet:h-48 tablet:text-16",
    //single Button
    auth: "w-full h-50 text-18",
    delete: "w-52 h-28 text-12 tablet:w-84 tablet:h-32 tablet:text-14",
    comment: "w-84 h-28 font-medium tablet:h-32",
    landing: "w-235 h-42 tablet:h-50 tablet:w-280 text-14 tablet:text-16 pc:text-18",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[buttonType]}`}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

export default Button;
