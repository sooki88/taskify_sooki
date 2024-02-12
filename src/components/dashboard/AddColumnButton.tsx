import { useToggle } from "usehooks-ts";
import { CreateColumn } from "../modal/column";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";

interface AddColumnButtonProps {
  updateColumns: Dispatch<SetStateAction<ColumnServiceResponseDto[]>>;
}

function AddColumnButton({ updateColumns }: AddColumnButtonProps) {
  const [columnValue, columnToggle, setColumnValue] = useToggle();
  return (
    <>
      <div className="fixed tablet:bottom-50 tablet:right-50 bottom-35 right-35 text-center">
        <button
          className=" flex items-center justify-center pc:gap-8 rounded-40 pc:p-20 pc:h-55 pc:w-full w-50 h-50 bg-violet border-gray-D9D9 transition ease-in-out delay-150  hover:scale-110  duration-300 text-white"
          onClick={columnToggle}>
          <span className="hidden pc:block font-medium shrink-0 ">새로운 컬럼 추가</span>
          <Image className="w-16 h-16 pc:w-12 pc:h-12" src="/images/add_white_.png" alt="add" width={16} height={16} />
        </button>
      </div>
      {columnValue && <CreateColumn updateColumns={updateColumns} onClose={() => setColumnValue(false)} />}
    </>
  );
}

export default AddColumnButton;
