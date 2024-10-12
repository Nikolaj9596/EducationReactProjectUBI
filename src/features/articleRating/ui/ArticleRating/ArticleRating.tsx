import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleRating.module.scss";
import { memo } from "react";
import { RatingCard } from "../../../../entities/Rating";

interface ArticleRatingProps {
  className?: string;
}

export const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <RatingCard
      className={classNames(cls.ArticleRating, {}, [className])}
      title={t("Оцените статью")}
      feedbackTitle={t(
        "Оставьте свой отзыв о статье, это поможет улучшить качество",
      )}
      hasFeedback
    />
  );
});
