import Image from "next/image";

interface PaginationButtonProps {
  currentPage: number;
  setCurrentPage: any;
  totalPages: number;
}

function PaginationButton({ currentPage, setCurrentPage, totalPages }: PaginationButtonProps) {
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="inline-flex items-center justify-center gap-16 ">
      <span className="leading-normal text-14 font-Pretendard">{`${totalPages} 페이지 중 ${currentPage}`}</span>
      <div>
        <button
          className={`p-10 bg-white border w-36 h-36 bg-FFF border-gray-D9D9 rounded-l-md tablet:w-40 tablet:h-40 tablet:p-12 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}>
          <Image src="/images/arrow_forward_left.png" alt="화살표 아이콘" width={16} height={16} />
        </button>
        <button
          className={`p-10 bg-white border w-36 h-36 bg-FFF border-gray-D9D9 rounded-r-md tablet:w-40 tablet:h-40 tablet:p-12 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}>
          <Image src="/images/arrow_forward_right.png" alt="화살표 아이콘" width={16} height={16} />
        </button>
      </div>
    </div>
  );
}

export default PaginationButton;
