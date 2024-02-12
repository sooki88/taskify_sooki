import { PopoverContent } from ".";

interface ContentsProps {
  contents: PopoverContent[];
}

function Contents({ contents }: ContentsProps) {
  return (
    <div className="absolute z-modal flex flex-col items-center justify-center gap-6 p-10 bg-white border-solid top-45 w-86 right-10 tablet:w-150 border-1 rounded-6 border-gray-D9D9">
      {contents.map(({ title, onClick }) => (
        <button
          key={title}
          onClick={onClick}
          className="flex items-center justify-center w-full text-center cursor-pointer h-30 tablet:h-32 text-12 rounded-4 tablet:text-18/24 hover:text-violet hover:bg-violet-F1EF">
          {title}
        </button>
      ))}
    </div>
  );
}

export default Contents;
