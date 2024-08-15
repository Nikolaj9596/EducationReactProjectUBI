import { FC, memo, ReactNode, useCallback } from "react";
import { classNames } from "../../lib/classNames/classNames";
import { Card, CardTheme } from "../Card/Card";
import cls from "./Tabs.module.scss";

export interface TabItem {
  value: string;
  content: ReactNode;
}
interface TabProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

export const Tabs: FC<TabProps> = memo((props) => {
  const { className, tabs, value, onTabClick } = props;
  const clickHandler = useCallback(
    (tab: TabItem) => {
      return () => {
        onTabClick(tab);
      };
    },
    [onTabClick],
  );
  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          className={cls.tab}
          key={tab.value}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
          onClick={clickHandler(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
