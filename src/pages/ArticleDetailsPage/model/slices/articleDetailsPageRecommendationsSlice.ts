import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { StateScheme } from "../../../../app/providers";
import { ArticleDetailsPageRecommendationsSchema } from "../types/ArticleDetailsPageRecommendationsSchema";
import { Article } from "../../../../entities/Article";
import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations";

const initialState: ArticleDetailsPageRecommendationsSchema = {
  isLoading: false,
  error: undefined,
  ids: [],
  entities: {},
};

const recommendationAdapter = createEntityAdapter<Article, string>({
  selectId: (article: Article) => article.id,
});

export const getArticlePageRecommendations =
  recommendationAdapter.getSelectors<StateScheme>(
    (state) =>
      state.articleDetailsPageRecommendations ||
      recommendationAdapter.getInitialState(),
  );

export const articleDetailsPageRecommendationsSlice = createSlice({
  name: "articleDetailsPageRecommendationsSlice",
  initialState:
    recommendationAdapter.getInitialState<ArticleDetailsPageRecommendationsSchema>(
      initialState,
    ),
  reducers: {},
  extraReducers: (builder) => {
    // INFO: fetchArticleRecommendations
    builder.addCase(fetchArticleRecommendations.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(
      fetchArticleRecommendations.fulfilled,
      (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        recommendationAdapter.setAll(state, action.payload);
      },
    );
    builder.addCase(fetchArticleRecommendations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: articleDetailsPageRecommendationsActions } =
  articleDetailsPageRecommendationsSlice;
export const { reducer: articleDetailsPageRecommendationsReducer } =
  articleDetailsPageRecommendationsSlice;
