import { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoutesProps } from "shared/types/router";
import { PageLoader } from "../../../../widgets";
import { routeConfig } from "../config/routeConfig";
import RequireAuth from "./RequireAuth";

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((router: AppRoutesProps) => {
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
