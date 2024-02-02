import Image from "next/image";
import { ChipNum } from "../common/Chips";
import { mockData } from "./mockData";
import Card from "@/components/dashboard/Card";
import AddColumnButton from "./AddColumnButton";

interface ColumnProps {
  title: string;
  id: number;
}

function Column({ title, id }: ColumnProps) {
  const { totalCount, cards } = mockData;

  const handleColumnEdit = () => {
    console.log(id);
  };

  return (
    <section className="flex flex-col flex-shrink-0 w-full gap-16 p-12 pc:min-h-screen tablet:gap-24 pc:w-354 tablet:p-20 bg-gray-FAFA border-b-1 border-b-gray-EEEE pc:border-r-gray-EEEE pc:border-r-1 pc:border-b-0">
      <div className="flex justify-between">
        <div className="flex items-center gap-8">
          <span className="relative inline-block size-8">
            <Image fill src="/images/ellipse.png" alt="원 아이콘 이미지" />
          </span>
          <p className="mr-4 font-bold tablet:text-18">{title}</p>
          <ChipNum totalCount={totalCount} />
        </div>
        <button className="relative inline-block size-22 tablet:size-24" onClick={handleColumnEdit}>
          <Image fill src="/images/settings.png" alt="setting" />
        </button>
      </div>
      <div className="flex flex-col gap-16">
        <AddColumnButton />
        {cards?.map(({ id, title, tags, dueDate, assignee, imageUrl }) => (
          <Card key={id} title={title} tags={tags} dueDate={dueDate} assignee={assignee} imageUrl={imageUrl} id={id} />
        ))}
      </div>
    </section>
  );
}

export default Column;
