import './App.css'
import { Flex } from 'antd';
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
          <Flex align="center" justify="space-between">
            <Button variant="ghost" onPress={() => setDrawerOpen(true)} isIconOnly>
              <Bars />
            </Button>

            <div className="cursor-pointer text-xl font-bold" onClick={() => navigate("/home")}>
              the<strong>WOD</strong>
            </div>

            <div>
              <Button variant="ghost" onPress={toggleTheme} isIconOnly>
                {darkMode ? <Sun /> : <Moon />}
              </Button>
              <Button variant="ghost" onClick={() => { handleLogout }} isIconOnly>
                <ArrowRightFromSquare />
              </Button>
            </div>
          </Flex>
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