import { Article, ArticleView } from "../../model/types/article";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "../../../../shared";
import cls from "./ArticleList.module.scss";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const ArticleList: FC<ArticleListProps> = memo((props) => {
  const { className, articles, isLoading, view = ArticleView.TABLE } = props;
  const { t } = useTranslation();
  const renderArticles = (item: Article) => {
    return <ArticleListItem article={item} view={view}/>;
  };
  return (
    <div className={classNames(cls.ArticleList, {}, [className])}>
      {articles.length > 0 ? articles.map(renderArticles) : null}
    </div>
  );
});
