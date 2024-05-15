import React, { FC, ReactNode } from "react";
import { classNames } from "../../lib";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
  const {
    className = cls.Modal,
    children,
    isOpen = false,
    onClose
  } = props
  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
  }

  const closeHendler = () => {
    if (onClose){
      onClose()
    }
  }

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className={classNames(cls.Modal, mods, [className])}>
      <div className={cls.overlay} onClick={closeHendler}>
        <div className={cls.content} onClick={onContentClick}>
          {children}
        </div>
      </div>
    </div>
  );
};
