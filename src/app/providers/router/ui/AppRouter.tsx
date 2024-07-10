import { getUserAuthData } from "../../../../entities/User";
import { memo, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from "../../../../shared/config/routeConfig/routeConfig";
import { PageLoader } from "../../../../widgets";

export const AppRouter = memo(() => {
  const isAuth = useSelector(getUserAuthData)
  const routers = useMemo(() => {
    return Object.values(routeConfig).filter(route => {
      if (route.authOnly && !isAuth) {
        return false
      }
      return true
    })
  }, [isAuth])

  return (
    <div>
      <Routes>
        {routers.map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={(
              <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">
                  {element}
                </div>
              </Suspense>
            )}
          />
        ))}
      </Routes>
    </div>
  );
})
