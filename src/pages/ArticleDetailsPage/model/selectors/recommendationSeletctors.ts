import { StateScheme } from "../../../../app/providers";

export const getArticleRecommendationsIsLoading = (state: StateScheme) =>
  state.articleDetailsPageRecommendations?.isLoading;

export const getArticleRecommendationsError = (state: StateScheme) =>
  state.articleDetailsPageRecommendations?.error;
