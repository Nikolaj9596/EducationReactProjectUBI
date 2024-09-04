import { createSelector } from "@reduxjs/toolkit";
import { articleDetailsData } from "../../../../entities/Article";
import { getUserAuthData } from "../../../../entities/User";

export const getCanEditArticle = createSelector(
  articleDetailsData,
  getUserAuthData,
  (article, user) => {
    console.log(article)
    console.log(user)
    console.log(article?.author?.id === user?.id)
    if (!article || !user) {
      return false;
    }

    return article?.author?.id === user?.id;
  },
);
