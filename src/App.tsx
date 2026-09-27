import './App.css'
import { Flex } from 'antd';
import { useState } from 'react';
import { Button, Header } from '@heroui/react';
import { Moon, Sun } from '@gravity-ui/icons';
import { Bars } from '@gravity-ui/icons';
import { WODDrawer } from './compos/WODDrawer';
import WodAppRouter from './WODRouter';
import { useNavigate } from 'react-router-dom';

interface AppProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

function App({ darkMode, toggleTheme }: AppProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <Flex align="center" justify="space-between">
          <Button variant="ghost" onPress={() => setDrawerOpen(true)} isIconOnly>
            <Bars />
          </Button>

          <div className="cursor-pointer text-xl font-bold" onClick={() => navigate("/home")}>
            the<strong>WOD</strong>
          </div>

          <Button variant="ghost" onPress={toggleTheme} isIconOnly>
            {darkMode ? <Sun /> : <Moon />}
          </Button>
        </Flex>
      </Header>

      {/* Pages */}
      <WodAppRouter />


      {/* Drawer */}
      <WODDrawer isOpen={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}

export default App;