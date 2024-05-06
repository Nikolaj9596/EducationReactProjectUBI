import { classNames } from '../shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { useTheme } from './providers/ThemeProvider';
import AppRouter from './providers/router/ui/AppRouter';

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme} >Toggle</button>
      <Link to={'/'}>Главная</Link>
      <Link to={'/about'}>О нас</Link>
      <AppRouter/>
    </div>
  );
}

export default App;
