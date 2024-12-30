import {
  ArticleSortField,
  ArticleType,
} from "../../../../entities/Article/model/types/article";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { SortOrder } from "../../../../pages/ArticlesPage/model/types/articlePageSchema";
import { Card, classNames, Icon, Input, VStack } from "../../../../shared";
import cls from "./ArticlesFilters.module.scss";
import { ArticleSortSelector } from "../../../../entities/Article/ui/ArticleSortSelector/ArticleSortSelector";
import { ArticleTypeTabs } from "../../../../entities/Article";
import { ReactComponent as SearchIcon } from "../../../../shared/assets/icons/search.svg";

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    onChangeType,
    onChangeSearch,
    search,
    onChangeSort,
    sort,
    onChangeOrder,
    order,
    type,
  } = props;
  const { t } = useTranslation();

  return (
    <Card
      className={classNames(cls.ArticlesFilters, {}, [className])}
      padding="24"
    >
      <VStack gap="32">
        <Input
          onChange={onChangeSearch}
          value={search}
          size="s"
          placeholder={t("Поиск")}
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={cls.tabs}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
