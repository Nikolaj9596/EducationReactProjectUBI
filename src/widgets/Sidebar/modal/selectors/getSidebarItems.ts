import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "../../../../entities/User";
import { RoutePath } from "../../../../shared/config";
import { ReactComponent as AboutIcon } from "../../../../shared/assets/icons/about-20-20.svg";
import { ReactComponent as MainIcon } from "../../../../shared/assets/icons/main-20-20.svg";
import { ReactComponent as ProfileIcon } from "../../../../shared/assets/icons/profile-20-20.svg";
import { ReactComponent as ArticleIcon } from "../../../../shared/assets/icons/article-20-20.svg";
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
