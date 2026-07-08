import { useEffect, useState } from 'react';
import './App.css';
import { getThemeCssVars } from './styles/theme';
import { Sidebar } from './components/Layout/Sidebar';
import { TopBar } from './components/Layout/TopBar';
import { MobileNavDrawer } from './components/Layout/MobileNavDrawer';
import { DashboardKpis } from './components/Home/DashboardKpis';
import { NoticeBoard } from './components/Home/NoticeBoard';
import { TopPerformers } from './components/Home/TopPerformers';

/** Covers iPhone 14 Pro Max (430px) and similar phones / small tablets */
const MOBILE_QUERY = '(max-width: 860px)';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      if (!mobile) setMobileMenuOpen(false);
    };
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  return (
    <div className={`app-frame ${isMobile ? 'is-mobile' : ''}`}>
      <div className="app-shell">
        {!isMobile && (
          <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        )}
        <div className="app-main">
          <TopBar
            showMenuButton={isMobile}
            onMenuClick={() => setMobileMenuOpen(true)}
          />
          <main className="app-content panel">
            <DashboardKpis />
            <div className="home-lower">
              <NoticeBoard />
              <TopPerformers />
            </div>
          </main>
        </div>
      </div>

      {isMobile && (
        <MobileNavDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      )}
    </div>
  );
}

export default App;
