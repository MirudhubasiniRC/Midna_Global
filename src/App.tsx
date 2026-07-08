import { useEffect } from 'react';
import './App.css';
import { getThemeCssVars } from './styles/theme';
import { Sidebar } from './components/Layout/Sidebar';
import { TopBar } from './components/Layout/TopBar';
import { DashboardKpis } from './components/Dashboard/DashboardKpis';
import { ProjectAnalytics } from './components/Dashboard/ProjectAnalytics';
import { Reminders } from './components/Dashboard/Reminders';
import { ProjectList } from './components/Dashboard/ProjectList';
import { TeamCollaboration } from './components/Dashboard/TeamCollaboration';
import { ProjectProgress } from './components/Dashboard/ProjectProgress';
import { TimeTracker } from './components/Dashboard/TimeTracker';

function App() {
  useEffect(() => {
    const vars = getThemeCssVars('light');
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <TopBar />
        <main className="app-content">
          <div className="dashboard-grid">
            <DashboardKpis />
            <ProjectAnalytics />
            <Reminders />
            <ProjectList />
            <TeamCollaboration />
            <ProjectProgress />
            <TimeTracker />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
