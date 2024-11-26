import { classNames } from "../shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { Navbar } from "../widgets/Navbar/ui/Navbar";
import { PageLoader, Sidebar } from "../widgets";
import { AppRouter } from "./providers";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserInited, userActions } from "../entities/User";
import { useSelector } from "react-redux";
import { MainLayout } from "../shared/layouts";

const App = () => {
  const { theme } = useTheme();
  document.body.className = theme;
  const dispatch = useDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <PageLoader />;
  }

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="loadding...">
        <MainLayout
          header={<Navbar />}
          sidebar={<Sidebar />}
          content={<AppRouter />}
          toolbar={<div>skjfsdidi</div>}
        />
      </Suspense>
    </div>
  );
};

export default App;
