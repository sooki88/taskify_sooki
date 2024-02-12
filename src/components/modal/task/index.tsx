import { useContext } from "react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { DashboardContext } from "@/pages/dashboard/[id]";
import { ChipCard, ChipProgress } from "@/components/common/Chips";
import Modal from "@/components/common/Modal";
import CommentInput from "../input/CommentInput";
import TaskInfo from "./TaskInfo";
import { CardServiceResponseDto } from "@/lib/services/cards/schema";
import Popover from "@/components/common/Popover";

interface TaskModalProps {
  taskData: CardServiceResponseDto;
  onClose: (e?: React.MouseEvent) => void;
}

interface assignee {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

function TaskModal({ taskData, onClose }: TaskModalProps) {
  const methods = useForm();
  const { columnsData } = useContext(DashboardContext);

  const column = columnsData.find((column) => column.id === taskData.columnId);

  const modalHeaderContent = (
    <div className="flex items-center gap-15">
      <Popover cardId={taskData.id}>
        <Image src="/images/kebab.png" alt="kebab" width={28} height={28} />
      </Popover>
      <button onClick={onClose}>
        <Image src="/images/close.png" alt="close" width={32} height={32} />
      </button>
    </div>
  );

  return (
    <FormProvider {...methods}>
      <Modal title={taskData?.title} onClose={onClose} headerContent={modalHeaderContent} hasOptionsbutton>
        <div className="flex flex-col gap-24 tablet:flex-row w-327 tablet:w-680 pc:w-680 ">
          <div className="flex w-full m-auto tablet:hidden">
            <TaskInfo data={taskData?.assignee as assignee} dueDate={taskData?.dueDate as Date} />
          </div>
          <div className="flex flex-col w-full gap-16 tablet:gap-20 tablet:w-450">
            <div className="flex gap-20">
              <ChipProgress columnTitle={column?.title as string} />
              <Image src="/images/bar.png" alt="바 이미지" className="w-1 h-20" width={1} height={20} />
              <div className="flex flex-wrap gap-y-6">
                {taskData?.tags.map((tag: string, index: number) => <ChipCard key={index} tag={tag} index={index} />)}
              </div>
            </div>
            <div className="h-auto font-normal text-black font-Pretendard text-14 rounded-6">
              {taskData?.description}
            </div>
            <div
              className={`flex items-center justify-center w-full h-auto ${taskData?.imageUrl && "min-h-260"} tablet:w-450 relative`}>
              {taskData?.imageUrl && (
                <Image src={taskData?.imageUrl} alt="테스트 이미지" fill style={{ objectFit: "cover" }} sizes="auto" />
              )}
            </div>
            <CommentInput cardId={taskData.id} columnId={taskData?.columnId as number} />
          </div>
          <div className="hidden tablet:w-180 pc:w-200 tablet:flex tablet:justify-end">
            <TaskInfo data={taskData?.assignee as assignee} dueDate={taskData?.dueDate as Date} />
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
}

export default TaskModal;
