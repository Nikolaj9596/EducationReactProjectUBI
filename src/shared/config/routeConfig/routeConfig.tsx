import { 
  AboutPage, 
  MainPage, 
  NotFoundPage, 
  ProfilePage 
} from "../../../pages"
import { RouteProps } from "react-router-dom"

type AppRouterProps = RouteProps & {
  authOnly?: boolean
}

export enum AppRouters {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  //last
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRouters, string> = {
  [AppRouters.MAIN]: '/',
  [AppRouters.ABOUT]: '/about',
  [AppRouters.PROFILE]: '/profile',
  [AppRouters.NOT_FOUND]: '*'

}

export const routeConfig: Record<AppRouters, AppRouterProps> = {
  [AppRouters.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />
  },

  [AppRouters.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />
  },

  [AppRouters.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
    authOnly: true
  },

  [AppRouters.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  }
}
