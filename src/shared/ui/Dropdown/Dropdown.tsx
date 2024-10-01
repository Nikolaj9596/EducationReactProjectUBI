import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FC, Fragment, memo, ReactNode } from "react";
import { DropdownDirection } from "../../types/ui";
import { classNames, Button, ThemeButton, AppLink } from "../../../shared";
import cls from "./Dropdown.module.scss";

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

const mapDirectionClass: Record<DropdownDirection, string> = {
  "bottom left": cls.optionsBottomLeft,
  "bottom right": cls.optionsBottomRight,
  "top left": cls.optionsTopLeft,
  "top right": cls.optionsTopRight,
};

export const Dropdown: FC<DropdownProps> = memo((props) => {
  const { className, direction = "bottom left", items, trigger } = props;
  return (
    <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
      <MenuButton className={cls.btn}>{trigger}</MenuButton>
      <MenuItems
        className={classNames(cls.menu, {}, [mapDirectionClass[direction]])}
      >
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <Button
              theme={ThemeButton.CLEAR}
              disabled={item.disabled}
              className={classNames(cls.item, { [cls.active]: active }, [])}
              onClick={item.onClick}
            >
              {item.content}
            </Button>
          );
          if (item.href) {
            return (
              <MenuItem as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </MenuItem>
            );
          }
          return (
            <MenuItem as={Fragment} disabled={item.disabled}>
              {content}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
});
