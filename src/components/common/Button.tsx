type Variant = "login" | "approve" | "deny" | "delete";

type ButtonProps = {
  variant: Variant;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

function Button({ variant, disabled = false, onClick, children }: ButtonProps): JSX.Element {
  const variantClasses = (): string => {
    switch (variant) {
      case "login":
        if (disabled) {
          return "flex justify-center items-center flex-shrink-0 rounded-8 px-152 py-14 text-18 bg-gray-9FA6 text-white tablet:px-236";
        } 
        return "flex justify-center items-center flex-shrink-0 rounded-8 px-152 py-14 text-18 bg-violet text-white tablet:px-236";
      case "approve":
        return "flex justify-center items-center w-109 px-37 py-7 bg-violet text-white border rounded-4 text-12 tablet:w-72 tablet:h-30 tablet:px-23 tablet:py-6 tablet:text-14 pc:w-84 pc:h-32 pc:px-29 pc:py-7";
      case "deny":
        return "flex justify-center items-center w-109 px-37 py-7 border border-gray-D9D9 rounded-4 bg-white text-12 text-violet tablet:w-72 tablet:h-30 tablet:px-23 tablet:py-6 tablet:text-14 pc:w-84 pc:h-32 pc:px-29 pc:py-7";
      case "delete":
        return "flex justify-center items-center w-52 px-9 py-7 text-12 bg-white text-violet border border-gray-D9D9 rounded-4 tablet:w-84 tablet:h-32 tablet:text-14";
      default:
        return "";
    }
  };

  return (
    <button className={`${variantClasses(variant)}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
