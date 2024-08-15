import { ArticleView } from "../../../../entities/Article";
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
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
import {
  ArticleSortField,
  ArticleType,
} from "../../../../entities/Article/model/types/article";
import { SortOrder } from "../../model/types/articlePageSchema";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { useDebounce } from "../../../../shared/lib/hooks/useDebounce/useDebounce";
import { TabItem } from "../../../../shared/ui/Tabs/Tabs";
import { ArticleTypeTabs } from "../../../../entities/Article";

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
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
      dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);
    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
      },
      [dispatch],
    );

    const debouncedFetchData = useDebounce(fetchData, 300);

    const onChangeSort = useCallback(
      (sort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(sort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
      (order: SortOrder) => {
        dispatch(articlesPageActions.setOrder(order));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
      (search: string) => {
        dispatch(articlesPageActions.setSearch(search));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
      },
      [dispatch, debouncedFetchData],
    );

    const onChangeType = useCallback(
      (tab: ArticleType) => {
        dispatch(articlesPageActions.setType(tab));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData],
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
          <Input
            placeholder={t("Поиск")}
            value={search}
            onChange={onChangeSearch}
          />
        </Card>
        <ArticleTypeTabs
          className={cls.tabs}
          value={type}
          onChangeType={onChangeType}
        />
      </div>
    );
  },
);
