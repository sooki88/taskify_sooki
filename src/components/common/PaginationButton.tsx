import Image from 'next/image';
import { useState } from 'react';

function PaginationButton() {
  const [isEnabled, setIsEnabled] = useState(true);

  const clickButton = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="inline-flex items-center justify-center">
      <button
        className="w-36 h-36 p-10 border bg-FFF border-gray-D9D9 rounded-l-md tablet:w-40 tablet:h-40 tablet:p-12"
        onClick={clickButton}  
      >
        <Image
            src={isEnabled ? "/images/arrow_forward_left.png" : "/images/arrow_forward_left_gray.png"}
            alt="화살표 아이콘"
            width={16}            
            height={16}
        />
      </button>
      <button 
        className="w-36 h-36 p-10 border bg-FFF border-gray-D9D9 rounded-r-md tablet:w-40 tablet:h-40 tablet:p-12"
        onClick={clickButton}
      >
        <Image
            src={isEnabled ? "/images/arrow_forward_right.png" : "/images/arrow_forward_right_gray.png"}
            alt="화살표 아이콘"
            width={16}            
            height={16}
        />
      </button>
    </div>
  );
};

export default PaginationButton;
