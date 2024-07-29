import { createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import { ArticleDetailsCommentsSchema } from "../types/ArticleDetailsCommentsSchema";
import { Comment } from "../../../../entities/Comment";
import { StateScheme } from "../../../../app/providers";
import { fetchCommentsByArticleId } from "../services/fetchCommentsByArticleId/fetchCommentsByArticleId";

const initialState: ArticleDetailsCommentsSchema = {
  isLoading: false,
  error: undefined,
  ids: [],
  entities: {},
};

const commentsAdapter = createEntityAdapter<Comment, string>({
  selectId: (comment: Comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateScheme>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);

export const articleDetailsCommentsSlice = createSlice({
  name: "articleDetailsCommentsSlice",
  initialState:
    commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>(initialState),
  reducers: {},
  extraReducers: (builder) => {
    // INFO: fetchCommentsByArticleId 
    builder.addCase(fetchCommentsByArticleId.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(
      fetchCommentsByArticleId.fulfilled,
      (
        state,
        action: PayloadAction<Comment[]>
      ) => {
        state.isLoading = false;
        commentsAdapter.setAll(state, action.payload);
      }
    )
    builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
});

export const { actions: articleDetailsCommentsActions } =
  articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice;
