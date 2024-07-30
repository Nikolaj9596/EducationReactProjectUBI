import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import i18n from "../../../../../shared/config/i18n/i18n";
import { ThunkConfig } from "../../../../../app/providers/StoreProvider";
import { Comment } from "../../../../../entities/Comment";
import { getUserAuthData } from "../../../../../entities/User";
import { getAddCommentFormText } from "../../selectors/addCommentFormSelectors";
import { articleDetailsData } from "../../../../../entities/Article/model/selectors/articleDetailsData";
import { addCommentActions } from "../../slice/addCommentFormSlice";
import { useAppDispatch } from "../../../../../shared/lib/hooks/useAppDispatch";

export const sentComment = createAsyncThunk<Comment, void, ThunkConfig<string>>(
  "addCommentForm/sendComment",

  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const userData = getUserAuthData(getState());
    const text = getAddCommentFormText(getState());
    const article = articleDetailsData(getState());
    const dispatch = useAppDispatch();

    if (!userData || !text || !article){
      return rejectWithValue(i18n.t("Не удалось создать комментарий"));
    }

    try {
      const response: AxiosResponse = await extra.api.post<Comment>(
        "/comments",
        {
          userId: userData?.id,
          text: text,
          articleId: article?.id,
        },
      );
      if (!response.data) {
        throw new Error();
      }
      dispatch(addCommentActions.setText(''))
      return response.data;
    } catch (e) {
      console.log(e);
      // return rejectWithValue(i18n.t("Не удалось создать комментарий"));
      // TODO: Delete when create server
      return {
        userId: userData?.id,
        text: text,
        articleId: article?.id,
      };
      //
    }
  },
);
