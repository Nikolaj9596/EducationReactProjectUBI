import { getUserAuthData } from "../../../../entities/User";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { SidebarItemType } from "widgets/Sidebar/modal/items";
import { AppLink, AppLinkTheme, classNames } from "../../../../shared";
import cls from "./SidebarItem.module.scss";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean
  key: string
}

export const SidebarItem: FC<SidebarItemProps> = memo((props) => {
  const { item, collapsed } = props
  const { t } = useTranslation()
  const isAuth = useSelector(getUserAuthData)
  if (item.authOnly && !isAuth) {
    return null
  }
  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed }, [''])}
    >

      <item.Icon className={cls.icon} />
      <span className={cls.link}>
        {t(item.text)}
      </span>
    </AppLink>
  );
});
