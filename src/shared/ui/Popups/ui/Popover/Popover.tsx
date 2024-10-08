import { FC, memo, ReactNode } from "react";
import { classNames } from "../../../../../shared";
import cls from "./Popover.module.scss";
import popupCls from "../../styles/popup.module.scss";
import {
  Popover as HPopover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { DropdownDirection } from "shared/types/ui";
import { mapDirectionClass } from "../../styles/const";

interface PopoverProps {
  className?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
  children: ReactNode;
}

export const Popover: FC<PopoverProps> = memo((props) => {
  const { className, direction = "bottom right", trigger, children } = props;
  return (
    <HPopover
      className={classNames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <PopoverButton className={popupCls.trigger}>{trigger}</PopoverButton>
      <PopoverPanel
        className={classNames(cls.panel, {}, [mapDirectionClass[direction]])}
      >
        {children}
      </PopoverPanel>
    </HPopover>
  );
});
