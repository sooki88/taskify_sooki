import { useToggle } from "usehooks-ts";
import { CreateColumn } from "../modal/column";

function AddColumnButton() {
  const [columnValue, columnToggle, setColumnValue] = useToggle();
  return (
    <>
      <div className="fixed tablet:bottom-50 tablet:right-50 bottom-35 right-35 text-center">
        <button
          className="flex items-center justify-center pc:gap-4 rounded-40 pc:min-w-160 pc:h-55 w-50 h-50 bg-violet hover:bg-violet-F1EF hover:text-violet border border-gray-D9D9 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 text-white"
          onClick={columnToggle}>
          <span className="hidden pc:block font-medium">새로운 컬럼 추가</span>
          <span className="pc:text-[25px] text-[30px] pc:translate-y-0 -translate-y-2 translate-x-[0.5px]">+</span>
        </button>
      </div>
      {columnValue && <CreateColumn onClose={() => setColumnValue(false)} />}
    </>
  );
}

export default AddColumnButton;
