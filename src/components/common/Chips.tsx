import Image from "next/image";

// 칼럼 카드 개수 숫자 칩
interface ChipNumProps {
  totalCount: number;
}

export function ChipNum({ totalCount }: ChipNumProps) {
  return (
    <div className="flex items-center justify-center bg-gray-EEEE size-20 rounded-4">
      <span className="font-medium text-gray-7874 text-12">{totalCount}</span>
    </div>
  );
}

// 카드 추가하기 + 칩
export function ChipAdd() {
  return (
    <div className="flex items-center justify-center size-20 tablet:size-22 bg-violet-F1EF rounded-4">
      <div className="relative size-16">
        <Image fill src="/images/add.png" alt="더하기 아이콘 이미지" />
      </div>
    </div>
  );
}

// 칼럼 카드 상태 칩 (To Do, On Progress, Done 등)
interface ChipProgressProps {
  columnTitle: string;
}

export function ChipProgress({ columnTitle }: ChipProgressProps) {
  return (
    <div className="inline-flex items-center justify-start h-20 gap-6 px-8 py-4 tablet:h-22 rounded-11 bg-violet-F1EF">
      <div className="relative inline-block size-6">
        <Image fill src="/images/ellipse.png" alt="원 아이콘 이미지" />
      </div>
      <span className="font-normal text-violet tablet:text-12 text-10">{columnTitle}</span>
    </div>
  );
}

// 카드 태그 칩
// short를 전달해주면 3개 초과부터는 '그 외 ?개'로 바뀝니다.
interface ChipCardProps {
  tag: string;
  index: number;
  short?: boolean;
}

interface DefaultChipCardProps {
  children: React.ReactNode;
}

export function ChipCard({ tag, index, short }: ChipCardProps) {
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

  const DefaultChipCard = ({ children }: DefaultChipCardProps) => (
    <div
      className={`inline-flex flex-row justify-center ${colors.bg} items-center tablet:h-22 h-20 rounded-4 px-6 py-4 mr-6`}>
      <span className={`tablet:text-12 text-10 ${colors.text} font-normal`}>{children}</span>
    </div>
  );

  return (
    <>
      {short ? (
        <>
          {index < 3 && <DefaultChipCard>{tag}</DefaultChipCard>}
          {index === 3 && (
            <div
              className={`inline-flex flex-row justify-center ${colors.bg} items-center tablet:h-22 h-20 rounded-4 px-6 py-4 mr-6 bg-gray-9FA6`}>
              <span className={`tablet:text-12 text-10 text-white ${colors.text} font-normal`}>
                그 외 {index - 1}개
              </span>
            </div>
          )}
        </>
      ) : (
        <DefaultChipCard>{tag}</DefaultChipCard>
      )}
    </>
  );
}

// 대시보드 생성/수정시 색상 칩들 (세트)
interface ChipColorsProps {
  selectColor: string;
  setSelectColor: React.Dispatch<React.SetStateAction<string>>;
}

export function ChipColors({ selectColor, setSelectColor }: ChipColorsProps) {
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
        <div key={color.id} className="relative flex items-center justify-center cursor-pointer">
          {selectColor === color.option && (
            <div className="absolute tablet:size-24 size-22">
              <Image fill src="/images/done.png" alt="체크 아이콘 이미지" />
            </div>
          )}
          <div
            className={`${color.bg} tablet:size-30 size-28 rounded-99`}
            onClick={() => setSelectColor(color.option)}
          />
        </div>
      ))}
    </div>
  );
}
