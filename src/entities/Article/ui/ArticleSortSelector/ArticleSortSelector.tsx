import { ArticleSortField } from "../../model/types/article";
import { FC, memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { classNames, Select, SelectOption } from "../../../../shared";
import cls from "./ArticleSortSelector.module.scss";
import { SortOrder } from "../../../../pages/ArticlesPage/model/types/articlePageSchema";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo(
  (props) => {
    const { className, sort, order, onChangeOrder, onChangeSort } = props;
    const { t } = useTranslation();
    const orderOptions = useMemo<SelectOption[]>(
      () => [
        { value: "asc", content: t("возврастанию") },
        { value: "desc", content: t("убыванию") },
      ],
      [t],
    );

    const sortFieldOptions = useMemo<SelectOption[]>(
      () => [
        { value: ArticleSortField.CREATED, content: t("дате создания") },
        { value: ArticleSortField.TITLE, content: t("названию") },
        { value: ArticleSortField.VIEWS, content: t("просмотрам") },
      ],
      [t],
    );

    const changeSortHandler = useCallback(
      (newSort: string) => {
        onChangeSort(newSort as ArticleSortField);
      },
      [onChangeSort],
    );

    const changeOrderHandler = useCallback(
      (newOrder: string) => {
        onChangeOrder(newOrder as SortOrder);
      },
      [onChangeOrder],
    );

    return (
      <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select
          options={sortFieldOptions}
          label={t("Сортировать по")}
          value={sort}
          onChange={changeSortHandler}
        />
        <Select
          options={orderOptions}
          label={t("по")}
          value={order}
          onChange={changeOrderHandler}
        />
      </div>
    );
  },
);
