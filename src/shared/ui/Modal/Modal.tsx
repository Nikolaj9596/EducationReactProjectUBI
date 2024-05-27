import { useTheme } from "../../../app/providers";
import React, { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { classNames } from "../../lib";
import { Portal } from "../Portal/Portal";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void;
}
const ANIMATION_DELAY = 300

export const Modal: FC<ModalProps> = (props) => {
  const {
    className = cls.Modal,
    children,
    isOpen = false,
    onClose
  } = props

  const [isClosing, setIsClosing] = useState(false);
  const timeRef = useRef<ReturnType<typeof setTimeout>>()
  const closeHendler = useCallback(() => {
    setIsClosing(true)
    if (onClose) {
      timeRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeHendler()
    }
  }, [closeHendler])

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  // Очищаем time out
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown)
    }
    return () => {
      clearTimeout(timeRef.current)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen, onKeyDown])

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  }
  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={closeHendler}>
          <div
            className={cls.content}
            onClick={onContentClick}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
