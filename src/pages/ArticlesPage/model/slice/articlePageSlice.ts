import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ARTICLE_VIEW_LOCAL_STORAGE_KEY } from "../../../../shared/const/LocalStorage";
import { StateScheme } from "../../../../app/providers";
import { ArticleView, Article } from "../../../../entities/Article";
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList";
import { ArticlesPageSchema } from "../types/articlePageSchema";

const articleAdapter = createEntityAdapter<Article, string>({
  selectId: (article) => article.id,
});

export const getArticles = articleAdapter.getSelectors<StateScheme>(
  (state) => state.articlesPage || articleAdapter.getInitialState(),
);

export const articlePageSlice = createSlice({
  name: "articlePageSlice",
  initialState: articleAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    view: ArticleView.TABLE,
    page: 1,
    limit: 10,
    hasMore: true,
    ids: [],
    entities: {},
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCAL_STORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCAL_STORAGE_KEY,
      ) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.LIST ? 4 : 9;
    },
  },

  extraReducers: (builder) => {
    // INFO: fetchArticlesList
    builder.addCase(fetchArticlesList.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(
      fetchArticlesList.fulfilled,
      (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        articleAdapter.setAll(state, action.payload);
      },
    );
    builder.addCase(fetchArticlesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: articlesPageActions } = articlePageSlice;
export const { reducer: articlesPageReducer } = articlePageSlice;
