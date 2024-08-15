import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleSortField, ArticleType } from "../../../../../entities/Article/model/types/article";
import { ThunkConfig } from "../../../../../app/providers/StoreProvider";
import {
  getArticlesPageInited,
} from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slice/articlePageSlice";
import { SortOrder } from "../../types/articlePageSchema";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>(
  "articlesPage/initArticlesPage",

  async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getArticlesPageInited(getState());
    if (!inited) {
      const orderFromUrl = searchParams.get('order');
      const sortFromUrl = searchParams.get('sort');
      const searchFromUrl = searchParams.get('search');
      const typeFromUrl = searchParams.get('type');

      if (orderFromUrl){
        dispatch(articlesPageActions.setOrder(orderFromUrl as SortOrder))
      }

      if (sortFromUrl){
        dispatch(articlesPageActions.setSort(sortFromUrl as ArticleSortField))
      }
      
      if (orderFromUrl){
        dispatch(articlesPageActions.setOrder(orderFromUrl as SortOrder))
      }

      if (searchFromUrl){
        dispatch(articlesPageActions.setSearch(searchFromUrl))
      }

      if (searchFromUrl){
        dispatch(articlesPageActions.setType(typeFromUrl as ArticleType))
      }

      dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({}));
    }
  },
);
