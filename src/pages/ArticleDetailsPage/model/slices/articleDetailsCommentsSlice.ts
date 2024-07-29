import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { ArticleDetailsCommentsSchema } from "../types/ArticleDetailsCommentsSchema";
import { Comment } from "../../../../entities/Comment";

const initialState: ArticleDetailsCommentsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

const commentsAdapter = createEntityAdapter<Comment, string>({
  selectId: (comment: Comment) => comment.id,
});

export const articleDetailsCommentsSlice = createSlice({
  name: "articleDetailsComments",
  initialState,
  reducers: {},

  extraReducers: (builder) => {},
});

export const { actions: articleDetailsCommentsActions } =
  articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice;
