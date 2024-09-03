import { Article, ArticleView } from "../../model/types/article";
import { FC, HTMLAttributeAnchorTarget, memo } from "react";
import { classNames } from "../../../../shared";
import cls from "./ArticleList.module.scss";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleList: FC<ArticleListProps> = memo((props) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.TABLE,
    target = "_blank",
  } = props;

  const getSelection = (view: ArticleView) => {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {new Array(view === ArticleView.TABLE ? 9 : 3)
          .fill(0)
          .map((item, index) => (
            <ArticleListItemSkeleton
              className={cls.card}
              key={index}
              view={view}
            />
          ))}
      </div>
    );
  };

  const renderArticles = (item: Article) => {
    return (
      <ArticleListItem
        className={cls.card}
        article={item}
        view={view}
        key={item.id}
        target={target}
      />
    );
  };

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticles) : null}
      {isLoading && getSelection(view)}
    </div>
  );
});
