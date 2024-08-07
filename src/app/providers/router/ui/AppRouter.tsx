import { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AppRouterProps,
  routeConfig,
} from "../../../../shared/config/routeConfig/routeConfig";
import { PageLoader } from "../../../../widgets";
import RequireAuth from "./RequireAuth";

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((router: AppRouterProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{router.element}</Suspense>
    );

    return (
      <Route
        key={router.path}
        path={router.path}
        element={
          router.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
