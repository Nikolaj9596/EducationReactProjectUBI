import React, { FC, useState } from "react";
import { ThemeSwitcher } from "../../../ThemeSwitcher";
import { classNames } from "../../../../shared";
import cls from "./Sidebar.module.scss";
import { LangSwitcher } from "../../../LangSwitcher";

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
      <button onClick={onToggle}>Toggle</button>
      <div className={cls.switchers}>
        <ThemeSwitcher/>
        <LangSwitcher className={cls.langToggle}/>
      </div>
    </div>
  );
};
