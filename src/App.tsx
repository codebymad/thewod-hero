import './App.css'
import { useState } from 'react';
import { Button, Header } from '@heroui/react';
import { Moon, Sun, ArrowRightFromSquare } from '@gravity-ui/icons';
import { Bars } from '@gravity-ui/icons';
import { WODDrawer } from './compos/WODDrawer';
import WodAppRouter from './WODRouter';
import { useLocation, useNavigate } from 'react-router-dom';

interface AppProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

function App({ darkMode, toggleTheme }: AppProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => { return localStorage.getItem('user') !== null; });
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };



  // Hide header on auth page
  const hideHeader = location.pathname === '/auth';
  return (
    <>
      {!hideHeader && (
        <Header>
          <div className="grid grid-cols-3 items-center">

            <div className="flex">
              <Button variant="ghost" onPress={() => setDrawerOpen(true)} isIconOnly>
                <Bars />
              </Button>
            </div>

            <div className="text-center text-xl font-bold cursor-pointer text-white"
              onClick={() => navigate("/home")}>
              the<strong>WOD</strong>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" onPress={toggleTheme} isIconOnly>
                {darkMode ? <Sun /> : <Moon />}
              </Button>
              <Button variant="ghost" onPress={handleLogout} isIconOnly>
                <ArrowRightFromSquare />
              </Button>
            </div>

          </div>
        </Header>


      )}


      {/* Pages */}
      <WodAppRouter isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />


      {/* Drawer */}
      {!hideHeader && (
        <WODDrawer isOpen={drawerOpen} onOpenChange={setDrawerOpen} />
      )}
    </>
  );
}

export default App;