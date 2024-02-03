import Image from 'next/image';

interface IconButtonProps {
  variant?: "default" | "filled" | "ghost";
  type: "invite" | "setting"; 
}

function IconButton({ variant = "default", type }: IconButtonProps) {
  const buttonStyle = (variant: string) => {
    switch (variant) {
      case "filled":
        return "h-28 px-12 gap-6 rounded-4px text-12 bg-violet text-white rounded-4 tablet:w-105 tablet:h-32 tablet:text-14 tablet:px-16"; 
      case "ghost":
        return "h-30 px-12 gap-8 border rounded-8 text-14 bg-white text-gray-7874 border-gray-D9D9 tablet:h-36 tablet:px-16 pc:h-40";
      default: 
        return ""; 
    }
  };

  const imageSrc = (variant: string, type: string) => {
    if (variant === "filled" && type === "invite") {
        return "/images/add_box_white.png";
    } else if (variant === "ghost" && type === "invite") {
        return "/images/add_box_gray.png";
    } else if (variant === "ghost" && type === "setting") {
        return "/images/settings.png";
    } else {
        return "";
    }
};

  const nameTag = ( type: string ) => {
    switch (type) {
      case "invite":
        return "초대하기"
      case "setting":
        return "관리"
      default:
        return "";
    }
  }

  const imageSize = ( variant: string) => {
    switch (variant) {
      case "filled":
        return { width: 16, height: 16 }; 
      case "ghost":
        return { width: 20, height: 20 }; 
      default:
        return { width: 20, height: 20 }; 
    }
  };

  const imageContainerStyle = (variant: string) => {
    return variant === "ghost" ? "hidden tablet:flex" : "flex";
  };

  const altText = `${type} icon`

  const { width, height } = imageSize(variant);

  return (
    <button className={`flex items-center justify-center flex-shrink-0 ${buttonStyle(variant)}`}>
      <div className={`${imageContainerStyle(variant)}`}> 
        <Image
          src={imageSrc(variant, type)}
          alt={altText}
          width={width}
          height={height} />
      </div>
      <p>{nameTag(type)}</p>
    </button>    
  );
}

export default IconButton;
