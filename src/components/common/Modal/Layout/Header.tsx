import { ReactNode } from "react";

interface ModalHeaderProps {
  title?: string;
  children: ReactNode;
  isDelete: boolean;
}

export const ModalHeader = ({ title, children, isDelete }: ModalHeaderProps) => (
  <header className="flex items-center justify-between mb-24 modal-header tablet:mt-4 tablet:mb-32">
    {!isDelete && <span className="font-bold text-black-3332 text-20 tablet:text-24">{title}</span>}
    {children}
  </header>
);
