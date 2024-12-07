import { FC, memo, useMemo, useState } from "react";
import { ThemeSwitcher } from "../../../ThemeSwitcher";
import { classNames, VStack, AppLogo, Icon } from "../../../../shared";
import cls from "./Sidebar.module.scss";
import { LangSwitcher } from "../../../LangSwitcher";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from "../../modal/selectors/getSidebarItems";
import { ReactComponent as ArrowIcon } from "../../../../shared/assets/icons/arrow-bottom.svg";

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = memo((props) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed, sidebarItemsList],
  );

  return (
    <aside
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        props.className,
      ])}
    >
      <AppLogo size={collapsed ? 40 : 50} className={cls.appLogo} />
      <VStack gap="8" role={"navigation"} className={cls.items}>
        {itemsList}
      </VStack>
      <Icon
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        Svg={ArrowIcon}
        clickable
      />
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </aside>
  );
});
