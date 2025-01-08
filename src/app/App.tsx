import { classNames } from "../shared/lib/classNames/classNames";
import { Navbar } from "../widgets/Navbar/ui/Navbar";
import { AppRouter } from "./providers";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserInited, userActions } from "../entities/User";
import { useSelector } from "react-redux";
import { MainLayout, useTheme } from "../shared";
import { AppLoaderLayout } from "../shared/layouts/AppLoaderLayout";
import { Sidebar } from "../widgets";
import { useAppToolbar } from "./lib/useAppToolbar";

const App = () => {
  const { theme } = useTheme();
  document.body.className = theme;
  const dispatch = useDispatch();
  const inited = useSelector(getUserInited);
  const toolbar = useAppToolbar();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  if (!inited) {
    return (
      <div id="app" className={classNames("app", {}, [theme])}>
        <AppLoaderLayout />{" "}
      </div>
    );
  }

  return (
    <div id={"app"} className={classNames("app", {}, [theme])}>
      <Suspense fallback="loadding...">
        <MainLayout
          header={<Navbar />}
          sidebar={<Sidebar />}
          content={<AppRouter />}
          toolbar={toolbar}
        />
      </Suspense>
    </div>
  );
};

export default App;
