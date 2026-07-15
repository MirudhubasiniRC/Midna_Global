import { useEffect, useState } from 'react';
import './App.css';
import { getThemeCssVars } from './styles/theme';
import { Sidebar } from './components/Layout/Sidebar';
import { MobileNavDrawer } from './components/Layout/MobileNavDrawer';
import type { AppView } from './components/Layout/navItems';
import { DashboardKpis } from './components/Home/DashboardKpis';
import { NoticeBoard } from './components/Home/NoticeBoard';
import { TopPerformers } from './components/Home/TopPerformers';
import { ProfilePage } from './components/Profile/ProfilePage';
import { PlaceholderPage } from './components/Placeholder/PlaceholderPage';
import { LedgerPage } from './components/Ledger/LedgerPage';

/** Covers iPhone 14 Pro Max (430px) and similar phones / small tablets */
const MOBILE_QUERY = '(max-width: 860px)';

type PlaceholderViewId = Exclude<AppView, 'dashboard' | 'profile' | 'ledger'>;

/** Stub copy for the sections not yet built out — refine per-page as each is implemented */
const placeholderPages: Record<PlaceholderViewId, { title: string; subtitle: string; actions?: string[] }> = {
  'scans-mla': {
    title: 'My Scans (MLA)',
    subtitle: 'Upload scans and manage client data for MLA-side operations.',
    actions: ['Scan Upload', 'Add Client Data', 'Export', 'Delete'],
  },
  'scans-ho': {
    title: 'My Scans (H.O)',
    subtitle: 'Preprocess, verify, and manage scan data at the Head Office.',
    actions: ['Preprocess', 'Verify', 'Data Download', 'Report Upload'],
  },
  reports: {
    title: 'My Reports',
    subtitle: 'Download, edit, and manage report data and CAB entries.',
    actions: ['Download', 'Edit Data', 'Upgrade', 'CAB', 'Delete Scan'],
  },
  trainees: {
    title: 'My Trainees',
    subtitle: 'Add, edit, and manage trainee records.',
    actions: ['Add', 'Edit', 'Delete'],
  },
  'mis-cab': {
    title: 'MIS · CAB',
    subtitle: 'Manage CAB debit and delete actions.',
    actions: ['Debit', 'Delete'],
  },
  'mis-communications': {
    title: 'MIS · Communications',
    subtitle: 'Manage communications sent across the network.',
  },
  'mis-network': {
    title: 'MIS · Network Performance',
    subtitle: 'Track performance across the network.',
  },
  'mis-scans': {
    title: 'MIS · Scans',
    subtitle: 'Search scan data by MLA or by duration.',
    actions: ['Search by MLA', 'Search by Duration'],
  },
};

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [view, setView] = useState<AppView>('dashboard');
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

  const handleLogout = () => setView('dashboard');

  return (
    <div className={`app-frame ${isMobile ? 'is-mobile' : ''}`}>
      <div className="app-shell">
        {!isMobile && (
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
            activeView={view}
            onNavigate={setView}
            onLogout={handleLogout}
          />
        )}
        <div className="app-main">
          <main className="app-content panel">
            {view === 'profile' ? (
              <ProfilePage onBack={() => setView('dashboard')} />
            ) : view === 'dashboard' ? (
              <>
                <DashboardKpis
                  onOpenMobileMenu={() => setMobileMenuOpen(true)}
                  onOpenProfile={() => setView('profile')}
                  onNavigate={setView}
                />
                <div className="home-lower">
                  <NoticeBoard />
                  <TopPerformers />
                </div>
              </>
            ) : view === 'ledger' ? (
              <LedgerPage
                onOpenMobileMenu={() => setMobileMenuOpen(true)}
                onOpenProfile={() => setView('profile')}
              />
            ) : (
              <PlaceholderPage
                {...placeholderPages[view]}
                onOpenMobileMenu={() => setMobileMenuOpen(true)}
                onOpenProfile={() => setView('profile')}
              />
            )}
          </main>
        </div>
      </div>

      {isMobile && (
        <MobileNavDrawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          activeView={view}
          onNavigate={setView}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
