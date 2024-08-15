import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ARTICLE_VIEW_LOCAL_STORAGE_KEY } from "../../../../shared/const/LocalStorage";
import { StateScheme } from "../../../../app/providers";
import { ArticleView, Article } from "../../../../entities/Article";
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList";
import { ArticlesPageSchema, SortOrder } from "../types/articlePageSchema";
import {
  ArticleSortField,
  ArticleType,
} from "../../../../entities/Article/model/types/article";

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
    _inited: false,
    sort: ArticleSortField.CREATED,
    search: "",
    order: "asc",
    type: ArticleType.ALL,
  }),

  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCAL_STORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCAL_STORAGE_KEY,
      ) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.LIST ? 4 : 9;
      state._inited = true;
    },
  },

  extraReducers: (builder) => {
    // INFO: fetchArticlesList
    builder.addCase(fetchArticlesList.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;

      if (action.meta.arg.replace) {
        articleAdapter.removeAll(state);
      }
    });
    builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasMore = action.payload.length >= state.limit;
      if (action.meta.arg.replace) {
        articleAdapter.setAll(state, action.payload);
      } else {
        articleAdapter.addMany(state, action.payload);
      }
    });
    builder.addCase(fetchArticlesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: articlesPageActions } = articlePageSlice;
export const { reducer: articlesPageReducer } = articlePageSlice;
