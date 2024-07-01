import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { SidebarItemType } from "widgets/Sidebar/modal/items";
import { AppLink, AppLinkTheme, classNames } from "../../../../shared";
import cls from "./SidebarItem.module.scss";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean
}

export const SidebarItem: FC<SidebarItemProps> = (props) => {
  const {item, collapsed} = props
  const {t} = useTranslation()
  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={cls.item}
    >

      <item.Icon className={cls.icon} />
      <span className={cls.link}>
        {t(item.text)}
      </span>
    </AppLink>
  );
};
