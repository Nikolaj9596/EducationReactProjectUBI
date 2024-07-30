import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import i18n from "../../../../../shared/config/i18n/i18n";
import { ThunkConfig } from "../../../../../app/providers/StoreProvider";
import { Comment } from "../../../../../entities/Comment";

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>(
  "articleDetails/fetchCommentsByArticleId",

  async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!articleId) {
      return rejectWithValue(i18n.t("Комментарии к статье не найденa"));
    }

    try {
      const response: AxiosResponse = await extra.api.get<Array<Comment>>(
        `/articles/${articleId}/comments`,
      );
      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (e) {
      console.log(e);
      // return rejectWithValue(i18n.t('Комментарии к статье не найденa'))
      // TODO: Delete when create server
      return [
        {
          id: "1",
          text: "some comment",
          articleId: "1",
          user: {
            id: 1,
            userName: "Vita",
            avatar:
              "https://i.pinimg.com/originals/88/9e/5d/889e5dd8334a7dfca281208cd74bd40e.png",
          },
        },
        {
          id: "3",
          text: "some comment 3",
          articleId: "1",
          user: {
            id: 1,
            userName: "Vita",
            avatar:
              "https://i.pinimg.com/originals/88/9e/5d/889e5dd8334a7dfca281208cd74bd40e.png",
          },
        },
      ];
      //
    }
  },
);
