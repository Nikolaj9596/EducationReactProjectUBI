import React, { FC, useState } from "react";
import { classNames } from "../../../../shared";
import cls from "./Sidebar.module.scss";

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
    </div>
  );
};
