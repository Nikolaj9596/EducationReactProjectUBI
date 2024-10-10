import { useTheme } from "../../../app/providers";
import { FC, memo, ReactNode } from "react";
import { classNames, Mods } from "../../../shared";
import cls from "./Drawer.module.scss";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";
import { useModal } from "../../lib/hooks/useModal/useModal";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean
}

export const Drawer: FC<DrawerProps> = memo((props) => {
  const { className, children, onClose, isOpen, lazy } = props;
  const { theme } = useTheme();

  const { isClosing, isMounted, close } = useModal({
    onClose,
    isOpen,
    animationDelay: 300,
  });
  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted){
    return null
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Drawer, mods, [
          className,
          theme,
          "app_drawer",
        ])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
});
