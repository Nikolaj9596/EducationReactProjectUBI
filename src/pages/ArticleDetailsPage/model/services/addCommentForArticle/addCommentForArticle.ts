import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import i18n from "../../../../../shared/config/i18n/i18n";
import { ThunkConfig } from "../../../../../app/providers/StoreProvider";
import { Comment } from "../../../../../entities/Comment";
import { getUserAuthData } from "../../../../../entities/User";
import { articleDetailsData } from "../../../../../entities/Article/model/selectors/articleDetailsData";
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>("articleDetails/addCommentForArticle", async (text, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi;

  const userData = getUserAuthData(getState());
  const article = articleDetailsData(getState());

  if (!userData || !text || !article) {
    return rejectWithValue("no data");
  }

  try {
    const response: AxiosResponse = await extra.api.post<Comment>("/comments", {
      articleId: article.id,
      userId: userData.id,
      text,
    });

    if (!response.data) {
      throw new Error();
    }

    dispatch(fetchCommentsByArticleId(article.id));

    return response.data;
  } catch (e) {
    // return rejectWithValue("error");
    return {
      id: "3",
      user: {
        id: 1,
        userName: "Vita",
        avatar:
          "https://i.pinimg.com/originals/88/9e/5d/889e5dd8334a7dfca281208cd74bd40e.png",
      },
      text: text,
    };
  }
});
