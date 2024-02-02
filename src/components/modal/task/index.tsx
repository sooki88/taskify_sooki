import { FormProvider, useForm } from "react-hook-form";
import { ChipCard, ChipProgress } from "@/components/common/Chips";
import Modal from "../../common/Modal";
import CommentInput from "../input/CommentInput";
import TaskInfo from "./TaskInfo";
import Image from "next/image";

interface TaskModalProps<T = void> {
  title?: string;
  onClose: () => void;
}

function TaskModal({ title, onClose }: TaskModalProps) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Modal title="새로운 일정 관리 Taskify" onClose={onClose} hasOptionsbutton>
        <div className="flex flex-col gap-24 tablet:flex-row w-327 tablet:w-680 pc:w-680">
          <div className="flex w-full m-auto tablet:hidden">
            <TaskInfo />
          </div>
          <div className="flex flex-col w-full gap-16 tablet:gap-20 tablet:w-450">
            <div className="flex gap-20">
              <ChipProgress />
              <Image src="/images/bar.png" alt="바 이미지" className="w-1 h-20" width={1} height={20} />
              <ChipCard />
            </div>
            <div className="h-auto font-normal text-black font-Pretendard text-14 rounded-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante
              cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at
              leo.
            </div>
            <div className="flex items-center justify-center w-full h-auto tablet:w-450">
              {/* <Image src="/images/test.png" alt="테스트 이미지" width={450} height={260} /> */}
            </div>
            <CommentInput />
          </div>
          <div className="hidden tablet:w-180 pc:w-200 tablet:flex tablet:justify-end">
            <TaskInfo />
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
}

export default TaskModal;
