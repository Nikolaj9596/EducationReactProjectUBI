import {
  FC,
  ReactNode,
} from "react";
import { useModal } from "../../lib/hooks/useModal/useModal";
import { Mods, classNames } from "../../lib/classNames/classNames";
import { Overlay } from "../Overlay/Overlay";
import { Portal } from "../Portal/Portal";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
  const {
    className = cls.Modal,
    children,
    isOpen = false,
    onClose,
    lazy,
  } = props;

  const { isClosing, isMounted, close } = useModal({
    onClose,
    isOpen,
    animationDelay: 300,
  });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }
  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
