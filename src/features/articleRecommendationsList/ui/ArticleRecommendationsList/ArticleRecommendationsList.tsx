import { useTranslation } from "react-i18next";
import { memo } from "react";
import { ArticleList } from "../../../../entities/Article";
import { TextSize, Text, VStack, classNames } from "../../../../shared";
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

const useArticleRecommendationList =
  recommendationsApi.useGetArticleRecommendationsListQuery;

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
      isLoading,
      data: articles,
      error,
    } = useArticleRecommendationList(3);

    if (error || !articles) {
      return (
        <VStack gap="8" className={classNames("", {}, [className])}>
          <Text size={TextSize.L} title={t("Рекомендуем")} />
          <ArticleList articles={[]} target="_blank" />
        </VStack>
      );
    }

    return (
      <VStack gap="8" className={classNames("", {}, [className])}>
        <Text size={TextSize.L} title={t("Рекомендуем")} />
        <ArticleList
          articles={articles}
          target="_blank"
          isLoading={isLoading}
        />
      </VStack>
    );
  },
);
