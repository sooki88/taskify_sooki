import Image from "next/image";

// 칼럼 카드 개수 숫자 칩
interface ChipNumProps {
  totalCount: number;
}

export const ChipNum = ({ totalCount }: ChipNumProps) => {
  return (
    <div className="flex items-center justify-center bg-gray-EEEE size-20 rounded-4">
      <span className="font-medium text-gray-7874 text-12">{totalCount}</span>
    </div>
  );
};

// 카드 추가하기 + 칩
export const ChipAdd = () => {
  return (
    <div className="flex items-center justify-center size-20 tablet:size-22 bg-violet-F1EF rounded-4">
      <div className="relative size-16">
        <Image fill src="/images/add.png" alt="더하기 아이콘 이미지" />
      </div>
    </div>
  );
};

// 칼럼 카드 상태 칩 (To Do, On Progress, Done 등)
// 상위 컴포넌트에서 import해서 사용시 onClick때 e.currentTarget.dataset.value로 클릭한 값 받을 수 있습니다.
interface ChipProgressProps {
  columnTitle: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ChipProgress = ({ columnTitle, onClick }: ChipProgressProps) => {
  return (
    <div
      className="inline-flex items-center justify-start h-20 gap-6 px-8 py-4 tablet:h-22 rounded-11 bg-violet-F1EF"
      onClick={onClick}
      data-value={columnTitle}>
      <div className="relative inline-block size-6">
        <Image fill src="/images/ellipse.png" alt="원 아이콘 이미지" />
      </div>
      <span className="font-normal text-violet tablet:text-12 text-10">{columnTitle}</span>
    </div>
  );
};

// 카드 태그 칩
interface ChipCardProps {
  tag: string;
  index: number;
}

export const ChipCard = ({ tag, index }: ChipCardProps) => {
  let colors = { bg: "", text: "" };

  switch (index % 4) {
    case 1:
      colors = { bg: "bg-[#E7F7DB]", text: "text-[#86D549]" };
      break;
    case 2:
      colors = { bg: "bg-[#F7DBF0]", text: "text-[#D549B6]" };
      break;
    case 3:
      colors = { bg: "bg-[#DBE6F7]", text: "text-[#4981D5]" };
      break;
    default:
      colors = { bg: "bg-[#F9EEE3]", text: "text-[#D58D49]" };
  }

  return (
    <div className={`inline-flex justify-center ${colors.bg} items-center tablet:h-22 h-20 rounded-4 px-6 py-4`}>
      <span className={`tablet:text-12 text-10 ${colors.text} font-normal`}>{tag}</span>
    </div>
  );
};

// 대시보드 생성/수정시 색상 칩들 (세트)
interface ChipColorsProps {
  selectColor: string;
  setSelectColor: React.Dispatch<React.SetStateAction<string>>;
}

export const ChipColors = ({ selectColor, setSelectColor }: ChipColorsProps) => {
  const COLORS = [
    { id: 1, option: "#7ac555", bg: "bg-[#7ac555]" },
    { id: 2, option: "#760dde", bg: "bg-[#760dde]" },
    { id: 3, option: "#ffa500", bg: "bg-[#ffa500]" },
    { id: 4, option: "#76a5ea", bg: "bg-[#76a5ea]" },
    { id: 5, option: "#e876ea", bg: "bg-[#e876ea]" },
  ];

  return (
    <div className="flex gap-10">
      {COLORS.map((color) => (
        <div className="relative flex items-center justify-center">
          {selectColor === color.option && (
            <div className="absolute tablet:size-24 size-22">
              <Image fill src="/images/done.png" alt="체크 아이콘 이미지" />
            </div>
          )}
          <div
            key={color.id}
            className={`${color.bg} tablet:size-30 size-28 rounded-99`}
            onClick={() => setSelectColor(color.option)}
          />
        </div>
      ))}
    </div>
  );
};
