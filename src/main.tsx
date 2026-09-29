import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider, theme } from 'antd'
import enGB from 'antd/locale/en_GB'
import { HashRouter } from 'react-router-dom'
import "@auto-skeleton/react/styles.css";

function Root() {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <React.StrictMode>
      <HashRouter>
        <ConfigProvider
          locale={enGB}
          theme={{
            algorithm: darkMode
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
            token: {
              colorPrimary: '#f97316',
            },
          }}
        >
          <App darkMode={darkMode} toggleTheme={toggleTheme} />
          
        </ConfigProvider>
      </HashRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Root />
)