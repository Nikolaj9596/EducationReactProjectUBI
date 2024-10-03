import { FC, memo, useCallback } from "react";
import {
  classNames,
  DynamicModuleLoader,
  ReducersList,
} from "../../../../shared";
import cls from "./ArticlesPage.module.scss";
import { articlesPageReducer } from "../../model/slice/articlePageSlice";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { Page } from "../../../../widgets";
import { ArticlesPageFilters } from "../ArticlesPageFilers/AriclesPageFilters";
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticleInfiniteList className={cls.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
