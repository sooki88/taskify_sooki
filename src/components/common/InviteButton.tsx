import Image from 'next/image';

// width 대신 패딩값 사용하기
function InviteButton({ variant = "default" }) {
  const buttonStyle = (variant: string) => {
    switch (variant) {
      case "filled":
        return "w-86 h-28 gap-6 rounded-4px text-12 bg-violet text-white rounded-4 tablet:w-105 tablet:h-32 tablet:text-14"; 
      case "ghost":
        return "w-73 h-40 gap-8 border rounded-8 text-14 bg-white text-gray-7874 tablet:w-109 tablet:h-36 pc:w-116 pc:h-40 pc:text-16";
      default: 
        return ""; 
    }
  };

  const imageSrc = (variant: string) => {
    switch (variant) {
      case "filled":
        return '/images/add_box_white.png';
      case "ghost":
        return '/images/add_box_gray.png';
      default:
        return ""; 
    }
  };

  const imageSize = (variant: string) => {
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

  const { width, height } = imageSize(variant);

  return (
    <button className={flex items-center justify-center flex-shrink-0 ${buttonStyle(variant)}}>
      <div className={${imageContainerStyle(variant)}}> 
        <Image
          src={imageSrc(variant)}
          alt="초대하기 아이콘"
          width={width}
          height={height} />
      </div>
      <p>초대하기</p>
    </button>
  );
};

export default InviteButton;