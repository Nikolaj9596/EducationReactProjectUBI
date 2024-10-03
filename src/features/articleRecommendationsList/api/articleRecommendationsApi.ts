import { RoutePath } from "../../../shared/config";
import { rtkApi } from "../../../shared/api/rtkApi";

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query({
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
