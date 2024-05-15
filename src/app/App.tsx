import { classNames } from '../shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemeProvider';
import { Navbar } from '../widgets/Navbar/ui/Navbar';
import { Sidebar } from '../widgets';
import { AppRouter } from './providers';
import { Suspense, useState } from 'react';
import { Modal } from '../shared/ui';


const App = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="loadding...">
        <Navbar />
        <button onClick={() => {setIsOpen(!isOpen)}}>Toggle</button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
