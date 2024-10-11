import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FC, Fragment, memo, ReactNode } from "react";
import {
  classNames,
  Button,
  ThemeButton,
  AppLink,
} from "../../../../../shared";
import cls from "./Dropdown.module.scss";
import popupCls from "../../styles/popup.module.scss";
import { mapDirectionClass } from "../../styles/const";
import { DropdownDirection } from "shared/types/ui";

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  direction?: DropdownDirection;
  items: DropdownItem[];
  trigger: ReactNode;
}

export const Dropdown: FC<DropdownProps> = memo((props) => {
  const { className, direction = "bottom left", items, trigger } = props;
  return (
    <Menu
      as="div"
      className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
    >
      <MenuButton className={popupCls.trigger}>{trigger}</MenuButton>
      <MenuItems
        className={classNames(cls.menu, {}, [mapDirectionClass[direction]])}
      >
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <Button
              theme={ThemeButton.CLEAR}
              disabled={item.disabled}
              className={classNames(
                cls.item,
                { [popupCls.active]: active },
                [],
              )}
              onClick={item.onClick}
            >
              {item.content}
            </Button>
          );
          if (item.href) {
            return (
              <MenuItem
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
                key={"dropdown-key-" + index}
              >
                {content}
              </MenuItem>
            );
          }
          return (
            <MenuItem
              as={Fragment}
              disabled={item.disabled}
              key={"dropdown-key-" + index}
            >
              {content}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
});
