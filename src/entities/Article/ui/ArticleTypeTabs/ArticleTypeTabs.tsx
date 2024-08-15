import { ArticleType } from "../../model/types/article";
import { FC, memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "../../../../shared";
import { TabItem, Tabs } from "../../../../shared/ui/Tabs/Tabs";
import cls from "./ArticleTypeTabs.module.scss";

interface ArticleTypeTabsProps {
  className?: string;
  value: string;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs: FC<ArticleTypeTabsProps> = memo((props) => {
  const { t } = useTranslation();
  const { className, value, onChangeType } = props;

  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t("Все"),
      },
      {
        value: ArticleType.IT,
        content: t("Айти"),
      },
      {
        value: ArticleType.SCIENCE,
        content: t("Наука"),
      },
    ],
    [t],
  );

  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  return (
    <Tabs
      className={classNames(cls.ArticleTypeTabs, {}, [className])}
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
    />
  );
});
