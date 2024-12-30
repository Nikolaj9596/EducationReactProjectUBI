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
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";
import { ArticlePageGreeting } from "../../../../features";
import { FiltersContainer } from "../FiltersContainer/FiltersContainer";
import { ViewSelectorContainer } from "../ViewSelectorContainer/ViewSelectorContainer";
import { StickyContentLayout } from "../../../../shared/layouts";

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
      <StickyContentLayout
        left={<ViewSelectorContainer />}
        right={<FiltersContainer />}
        content={
          <Page
            data-testid="ArticlesPage"
            onScrollEnd={onLoadNextPart}
            className={classNames(cls.ArticlesPage, {}, [className])}
          >
            <ArticleInfiniteList className={cls.list} />
            {/* <ArticlePageGreeting /> */}
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
