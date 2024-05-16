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
        <button onClick={() => {setIsOpen(true)}}>Toggle</button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          The pattern A[w-]+z is a regular expression that defines a rule for what characters can be included in a string and how it should be formatted. Let's break down what this pattern specifies:
          Given your input of sale__house__697212864, it appears that your string should match the pattern because:
        </Modal>
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
