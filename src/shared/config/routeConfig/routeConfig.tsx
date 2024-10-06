import {
  AboutPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  ArticlesPage,
  ArticleDetailsPage,
  ArticleEditPage,
  AdminPanelPage,
  ForbiddenPage,
} from "../../../pages";
import { RouteProps } from "react-router-dom";
import { UserRole } from "../../../entities/User";

export type AppRouterProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};

export enum AppRouters {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  ARTICLES = "articles",
  ARTICLE_DETAILS = "article_details",
  ARTICLE_CREATE = "article_create",
  ARTICLE_EDIT = "article_edit",
  ADMIN_PANEL = "admin_panel",
  FORBIDDEN = "forbidden",
  //last
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRouters, string> = {
  [AppRouters.MAIN]: "/",
  [AppRouters.ABOUT]: "/about",
  [AppRouters.PROFILE]: "/profile/",
  [AppRouters.ARTICLES]: "/articles",
  [AppRouters.ARTICLE_DETAILS]: "/articles/:id",
  [AppRouters.ARTICLE_EDIT]: "/articles/:id/edit",
  [AppRouters.ARTICLE_CREATE]: "/articles/new",
  [AppRouters.ADMIN_PANEL]: "/admin",
  [AppRouters.FORBIDDEN]: "/forbidden",
  [AppRouters.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRouters, AppRouterProps> = {
  [AppRouters.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },

  [AppRouters.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },

  [AppRouters.PROFILE]: {
    path: `${RoutePath.profile}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },

  [AppRouters.ARTICLES]: {
    path: RoutePath.articles,
    element: <ArticlesPage />,
    authOnly: true,
  },

  [AppRouters.ARTICLE_DETAILS]: {
    path: RoutePath.article_details,
    element: <ArticleDetailsPage />,
    authOnly: true,
  },

  [AppRouters.ARTICLE_EDIT]: {
    path: RoutePath.article_edit,
    element: <ArticleEditPage />,
    authOnly: true,
  },

  [AppRouters.ARTICLE_CREATE]: {
    path: RoutePath.article_create,
    element: <ArticleEditPage />,
    authOnly: true,
  },

  [AppRouters.ADMIN_PANEL]: {
    path: RoutePath.admin_panel,
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.MANAGER, UserRole.ADMIN],
  },

  [AppRouters.FORBIDDEN]: {
    path: RoutePath.forbidden,
    element: <ForbiddenPage />,
  },

  [AppRouters.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
