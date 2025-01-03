import { articleDetailsData } from "../../../../entities/Article";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../../shared";
import { getRouteArticleEdit } from "../../../../shared/const/router";
import cls from "./AdditionalInfoContainer.module.scss";
import { ArticleAdditionalInfo } from "../../../../widgets/ArticleAdditionalInfo";

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(articleDetailsData);

  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  if (!article) {
    return null;
  }

  return (
    <Card padding="24" border="partial" className={cls.card}>
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article.author}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  );
});
