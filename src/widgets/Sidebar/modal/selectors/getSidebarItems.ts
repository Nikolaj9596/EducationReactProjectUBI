import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "../../../../entities/User";
import { ReactComponent as MainIcon } from "../../../../shared/assets/icons/home.svg";
import { ReactComponent as ArticleIcon } from "../../../../shared/assets/icons/article.svg";
import { ReactComponent as AboutIcon } from "../../../../shared/assets/icons/Info.svg";
import { ReactComponent as ProfileIcon } from "../../../../shared/assets/icons/avatar.svg";

import { SidebarItemType } from "../types/sidebar";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsLit: SidebarItemType[] = [
    {
      //TODO: fix it
      // path: RoutePath.main,
      path: "main",
      text: "Главная",
      Icon: MainIcon,
    },
    {
      // path: RoutePath.about,
      path: "about",
      text: "О сайте",
      Icon: AboutIcon,
    },
  ];

  if (userData) {
    sidebarItemsLit.push(
      {
        // path: `${RoutePath.profile}${userData.id}`,
        path: `/profile/${userData.id}`,
        text: "Профиль",
        Icon: ProfileIcon,
        authOnly: true,
      },

      {
        // path: RoutePath.articles,
        path: "articles",
        text: "Статьи",
        Icon: ArticleIcon,
        authOnly: true,
      },
    );
  }
  return sidebarItemsLit;
});
