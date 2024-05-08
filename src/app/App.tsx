import { classNames } from '../shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { useTheme } from './providers/ThemeProvider';
import { Navbar } from '../widgets/Navbar/ui/Navbar';
import { Sidebar, ThemeSwitcher } from '../widgets';
import { AppRouter } from './providers';

const App = () => {
  const { theme} = useTheme();
  return (
    <div className={classNames('app', {}, [theme])}>
      <ThemeSwitcher />
      <Navbar/>
      <div className="content-page">
      <Sidebar/>
      <AppRouter/>
      </div>
    </div>
  );
}

export default App;
