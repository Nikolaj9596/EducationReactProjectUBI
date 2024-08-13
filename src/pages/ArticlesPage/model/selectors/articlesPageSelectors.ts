import { ArticleSortField } from "entities/Article/model/types/article";
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
export const getArticlesPageNumber = (state: StateScheme) =>
  state.articlesPage?.page || 1;
export const getArticlesPageHasMore = (state: StateScheme) =>
  state.articlesPage?.hasMore || false;
export const getArticlesPageInited = (state: StateScheme) =>
  state.articlesPage?._inited || false;
export const getArticlesPageOrder = (state: StateScheme) =>
  state.articlesPage?.order ?? 'asc';
export const getArticlesPageSort = (state: StateScheme) =>
  state.articlesPage?.sort ?? ArticleSortField.CREATED;
export const getArticlesPageSearch = (state: StateScheme) =>
  state.articlesPage?.search ?? '';
