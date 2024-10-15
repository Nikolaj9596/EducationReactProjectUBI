import { AppRouters, RoutePath } from "../../../../shared/const/router";
import { AppRouterProps } from "../../../../shared/types/router";
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
} from "../../../../pages";
import { UserRole } from "../../../../entities/User";


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
