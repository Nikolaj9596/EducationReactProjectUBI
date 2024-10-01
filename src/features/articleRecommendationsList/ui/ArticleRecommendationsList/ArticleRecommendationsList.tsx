import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { ArticleList } from "../../../../entities/Article";
import { TextSize, Text, VStack } from "../../../../shared";
import { rtkApi } from "../../../../shared/api/rtkApi";

interface ArticleRecommendationsListProps {
  className?: string;
}

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query({
      query: (limit) => ({
        url: "/articles",
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
      <VStack gap="8" className={classNames("", {}, [className])}>
        <Text size={TextSize.L} title={t("Рекомендуем")} />
        <ArticleList articles={[]} target="_blank" />
      </VStack>
    );
  },
);
