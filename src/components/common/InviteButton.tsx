import Image from 'next/image';

function InviteButton = () => {
  return (
    <button className="flex items-center justify-center flex-shrink-0 h-40 gap-8 border rounded-8 text-14 w-73 h-30 bg-FFF border-gray-D9D9 tablet:w-109 tablet:h-36 pc:w-116 pc:h-40 pc:text-16">
      <div className="hidden tablet:flex"> 
        <Image
          src="/images/add_box.png"
          alt="초대하기 아이콘"
          width={20}
          height={20} />
      </div>
      <p>초대하기</p>
    </button>    
  );
};

export default InviteButton;