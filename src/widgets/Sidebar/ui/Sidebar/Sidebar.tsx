import React, { FC, useState } from "react";
import { ThemeSwitcher } from "../../../ThemeSwitcher";
import { RoutePath } from "../../../../shared/config";
import {
  Button,
  classNames,
  ThemeButton,
  ButtonSize,
  AppLink,
  AppLinkTheme,
} from "../../../../shared";
import cls from "./Sidebar.module.scss";
import { LangSwitcher } from "../../../LangSwitcher";
import { ReactComponent as AboutIcon } from "../../../../shared/assets/icons/about-20-20.svg"
import { ReactComponent as MainIcon } from "../../../../shared/assets/icons/main-20-20.svg"
import { useTranslation } from "react-i18next";

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [t] = useTranslation()
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
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={RoutePath.main}
            className={cls.item}
            >

            <MainIcon className={cls.icon} />
            <span className={cls.link}>
              {t("Главная")}
            </span>
          </AppLink>
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={RoutePath.about}
            className={cls.item}
            >
          <AboutIcon className={cls.icon} />
            <span className={cls.link}>
              {t("О нас")}
            </span>
          </AppLink>
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.langToggle} short={collapsed} />
      </div>
    </div >
  );
};
