import { classNames, Skeleton } from "../../../../shared";
import { useTranslation } from "react-i18next";
import cls from "./ArticleRating.module.scss";
import { memo, useCallback } from "react";
import { RatingCard } from "../../../../entities/Rating";
import { useSelector } from "react-redux";
import { getUserAuthData } from "../../../../entities/User";
import {
  useAddRatingArticleMutation,
  useGetArticleRatingQuery,
} from "../../api/articleRatingApi";

interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

export const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation();
  const userData = useSelector(getUserAuthData);

  const { data, isLoading } = useGetArticleRatingQuery({
    articleId,
    userId: userData?.id ?? "",
  });
  const [rateArticleMutation] = useAddRatingArticleMutation();
  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? "",
          articleId,
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [articleId, rateArticleMutation, userData],
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle],
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle],
  );

  if (isLoading) {
    return <Skeleton width={"100%"} height={120} />;
  }
  //TODO: remove in prod ??
  const rating = data?.[0];

  return (
    <RatingCard
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      className={classNames(cls.ArticleRating, {}, [className])}
      title={t("Оцените статью")}
      feedbackTitle={t(
        "Оставьте свой отзыв о статье, это поможет улучшить качество",
      )}
      hasFeedback
    />
  );
});
