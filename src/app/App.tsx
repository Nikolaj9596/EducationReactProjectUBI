import { classNames } from "../shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { Navbar } from "../widgets/Navbar/ui/Navbar";
import { Sidebar } from "../widgets";
import { AppRouter } from "./providers";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../entities/User";

const App = () => {
  const { theme } = useTheme();
  document.body.className = theme;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData()); 
  }, [dispatch])
  return (
   <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="loadding...">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
