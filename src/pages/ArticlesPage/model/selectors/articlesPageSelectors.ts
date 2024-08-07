import { StateScheme } from "../../../../app/providers";
import { ArticleView } from "../../../../entities/Article";

export const getArticlesPageIsLoading = (state: StateScheme) =>
  state.articlesPage?.isLoading || false;
export const getArticlesPageError = (state: StateScheme) =>
  state.articlesPage?.error;
export const getArticlesPageView = (state: StateScheme) =>
  state.articlesPage?.view || ArticleView.TABLE;
export const getArticlesPageLimit = (state: StateScheme) =>
  state.articlesPage?.limit || 30;
export const getArticlesPageHasMore = (state: StateScheme) =>
  state.articlesPage?.hasMore || false;
