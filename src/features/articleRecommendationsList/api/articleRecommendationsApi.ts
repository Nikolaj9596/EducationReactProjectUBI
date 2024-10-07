import { RoutePath } from "../../../shared/config";
import { rtkApi } from "../../../shared/api/rtkApi";
import { Article } from "../../../entities/Article";

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query<Article[], number>({
      query: (limit) => ({
        url: RoutePath.articles,
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const useArticleRecommendationList =
  recommendationsApi.useGetArticleRecommendationsListQuery;
