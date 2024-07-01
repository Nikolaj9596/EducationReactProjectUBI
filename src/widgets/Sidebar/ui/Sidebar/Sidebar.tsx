import React, { FC, useState } from "react";
import { ThemeSwitcher } from "../../../ThemeSwitcher";
import {
  Button,
  classNames,
  ThemeButton,
  ButtonSize,
} from "../../../../shared";
import cls from "./Sidebar.module.scss";
import { LangSwitcher } from "../../../LangSwitcher";
import { SidebarItemsList } from "../../modal/items";
import { SidebarItem } from "../SidebarItem/SidebarItem";

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const onToggle = () => {
    setCollapsed(prev => !prev)
  }
  return (
    <div
      className={
        classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [props.className ? props.className : ''])
      }
    >
      <Button
        square={true}
        size={ButtonSize.L}
        theme={ThemeButton.BACKGROUND_INVERTED}
        onClick={onToggle}
        className={cls.collapseBtn}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.items}>
        {SidebarItemsList.map((item) => {
          <SidebarItem 
            item={item} 
            collapsed={collapsed}
          />
        })}
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.langToggle} short={collapsed} />
      </div>
    </div >
  );
};
