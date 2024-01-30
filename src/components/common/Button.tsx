type Variant = "filled" | "ghost" | "ghost_gray";

type ButtonProps = {
  variant: Variant;
  width: string | number;
  height?: string | number;
  fontsize: string | number;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

function Button({
  variant,
  width,
  height,
  fontsize,
  disabled = false,
  onClick,
  children,
}: ButtonProps): JSX.Element {
  const variantClasses = (): string => {
    switch (variant) {
      case "filled":
        return `flex justify-center items-center ${disabled ? "bg-gray-9FA6 text-white" : "bg-violet text-white"} rounded-8`;
      case "ghost":
        return `flex justify-center items-center bg-white border border-gray-D9D9 text-violet rounded-4`;
      case "ghost_gray":
        return `flex justify-center items-center bg-white border border-gray-D9D9 text-gray-7874 rounded-4`;
      default:
        return "";
    }
  };

  const inlineStyles = {
    width: typeof width === 'number' ? `${width}px`: width,
    height: typeof height === 'number' ? `${height}px` : height,  
    fontSize: typeof fontsize === 'number' ? `${fontsize}px` : fontsize,
  };

  return (
    <button
      className={variantClasses()}
      style={inlineStyles}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
