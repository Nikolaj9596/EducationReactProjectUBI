import { FC, memo, useMemo, useState } from "react";
import { ThemeSwitcher } from "../../../ThemeSwitcher";
import {
  Button,
  classNames,
  ThemeButton,
  ButtonSize,
  VStack,
} from "../../../../shared";
import cls from "./Sidebar.module.scss";
import { LangSwitcher } from "../../../LangSwitcher";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from "../../modal/selectors/getSidebarItems";

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
      <Button
        square={true}
        size={ButtonSize.L}
        theme={ThemeButton.BACKGROUND_INVERTED}
        onClick={onToggle}
        className={cls.collapseBtn}
      >
        {collapsed ? ">" : "<"}
      </Button>
      <VStack gap="8" role={"navigation"} className={cls.items}>
        {itemsList}
      </VStack>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.langToggle} short={collapsed} />
      </div>
    </aside>
  );
});
