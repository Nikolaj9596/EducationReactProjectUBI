import { classNames } from "../shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { Navbar } from "../widgets/Navbar/ui/Navbar";
import { Sidebar } from "../widgets";
import { AppRouter } from "./providers";
import { Suspense } from "react";

const App = () => {
  const { theme } = useTheme();
  document.body.className = theme;
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
