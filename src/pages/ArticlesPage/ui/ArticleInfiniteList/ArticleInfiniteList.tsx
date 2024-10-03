import { ArticleList } from "../../../../entities/Article";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import { useSearchParams } from "react-router-dom";
import { initArticlesPage } from "../../model/services/initArticlePage/initArticlePage";
import { getArticles } from "../../model/slice/articlePageSlice";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { classNames } from "../../../../shared";

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = (props) => {
  const { className } = props;
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);
  const dispatch = useAppDispatch();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, [dispatch, searchParams]);

  return (
    <ArticleList
      view={view}
      articles={articles}
      isLoading={isLoading}
      className={classNames("", {}, [className])}
    />
  );
};
