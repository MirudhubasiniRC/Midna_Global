import { useEffect, useState } from 'react';
import './App.css';
import { getThemeCssVars } from './styles/theme';
import { Sidebar } from './components/Layout/Sidebar';
import { TopBar } from './components/Layout/TopBar';
import { DashboardKpis } from './components/Home/DashboardKpis';
import { NoticeBoard } from './components/Home/NoticeBoard';
import { TopPerformers } from './components/Home/TopPerformers';

const MOBILE_QUERY = '(max-width: 720px)';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY).matches : false
  );

  useEffect(() => {
    const vars = getThemeCssVars('light');
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const onChange = () => {
      const mobile = media.matches;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const handleToggle = () => {
    // On mobile, keep a compact icon dock — expand only briefly if needed later
    if (isMobile) {
      setCollapsed(true);
      return;
    }
    setCollapsed((v) => !v);
  };

  return (
    <div className={`app-frame ${isMobile ? 'is-mobile' : ''}`}>
      <div className="app-shell">
        <Sidebar collapsed={isMobile ? true : collapsed} onToggle={handleToggle} />
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
