import { useEffect, useState } from 'react';
import './App.css';
import { getThemeCssVars } from './styles/theme';
import { Sidebar } from './components/Layout/Sidebar';
import { TopBar } from './components/Layout/TopBar';
import { DashboardKpis } from './components/Home/DashboardKpis';
import { NoticeBoard } from './components/Home/NoticeBoard';
import { TopPerformers } from './components/Home/TopPerformers';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const vars = getThemeCssVars('light');
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, []);

  return (
    <div className="app-frame">
      <div className="app-shell">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        <div className="app-main">
          <TopBar />
          <main className="app-content panel">
            <DashboardKpis />
            <div className="home-lower">
              <NoticeBoard />
              <TopPerformers />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
