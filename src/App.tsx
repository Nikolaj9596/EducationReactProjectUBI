import React, { Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AboutAsync } from './About/About.async';
import './App.scss';
import { MainPageAsync } from './MainPage/MainPage.async';
import { useTheme } from './theme/useTheme';

const App = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme} >Toggle</button>
      <Link to={'/'}>Главная</Link>
      <Link to={'/about'}>О нас</Link>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path={'/'} element={<MainPageAsync />} />
          <Route path={'/about'} element={<AboutAsync />} />
        </Routes>
      </Suspense>

    </div>
  );
}

export default App;
