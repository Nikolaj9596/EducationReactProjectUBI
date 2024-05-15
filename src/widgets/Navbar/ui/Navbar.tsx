import React, { FC } from "react";
import { AppLink, AppLinkTheme } from "../../../shared";
import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({className}) => {
  return (
    <div className={classNames(cls.navbar, {}, [className? className : ''])}>
      <div className={cls.links}>
      </div>
    </div>
  );
};

