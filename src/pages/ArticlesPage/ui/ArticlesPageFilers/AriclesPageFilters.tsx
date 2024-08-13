import { ArticleView } from "../../../../entities/Article";
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { articlesPageActions } from "../../model/slice/articlePageSlice";
import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import { Card, classNames, Input } from "../../../../shared";
import { ArticleViewSelector } from "../ArticleViewSelector/ArticleViewSelector";
import cls from "./AriclesPageFilters.module.scss";
import { ArticleSortSelector } from "../../../../entities/Article/ui/ArticleSortSelector/ArticleSortSelector";
import { ArticleSortField } from "../../../../entities/Article/model/types/article";
import { SortOrder } from "../../model/types/articlePageSchema";

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo(
  (props) => {
    const { t } = useTranslation();
    const view = useSelector(getArticlesPageView);
    const dispatch = useAppDispatch();
    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);

    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
      },
      [dispatch],
    );

    const onChangeSort = useCallback(
      (sort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(sort));
      },
      [dispatch],
    );

    const onChangeOrder = useCallback(
      (order: SortOrder) => {
        dispatch(articlesPageActions.setOrder(order));
      },
      [dispatch],
    );

    return (
      <div
        className={classNames(cls.ArticlesPageFilters, {}, [props.className])}
      >
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeSort={onChangeSort}
            onChangeOrder={onChangeOrder}
          />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className={cls.search}>
          <Input placeholder={t("Поиск")} />
        </Card>
      </div>
    );
  },
);
