import { getUserAuthData } from "../../../../entities/User";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AppLink, classNames } from "../../../../shared";
import cls from "./SidebarItem.module.scss";
import { SidebarItemType } from "../../modal/types/sidebar";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
  key: string;
}

export const SidebarItem: FC<SidebarItemProps> = memo((props) => {
  const { item, collapsed } = props;
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);
  if (item.authOnly && !isAuth) {
    return null;
  }
  return (
    <AppLink
      variant="primary"
      to={item.path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed }, [""])}
      activeClassName={cls.active}
    >
      <item.Icon />
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  );
});
