import { StateScheme } from "../../../../app/providers";
import { ArticleView } from "../../../../entities/Article";

export const getArticlesPageIsLoading = (state: StateScheme) =>
  state.articlesPage?.isLoading || false;
export const getArticlesPageError = (state: StateScheme) =>
  state.articlesPage?.error;
export const getArticlesPageView = (state: StateScheme) =>
  state.articlesPage?.view || ArticleView.TABLE;
