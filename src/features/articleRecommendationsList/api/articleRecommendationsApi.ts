import { rtkApi } from "../../../shared/api/rtkApi";
import { Article } from "../../../entities/Article";
import { getRouteArticles } from "../../../shared/const/router";

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query<Article[], number>({
      query: (limit) => ({
        url: getRouteArticles(),
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const useArticleRecommendationList =
  recommendationsApi.useGetArticleRecommendationsListQuery;
