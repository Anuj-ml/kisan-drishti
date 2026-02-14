import React from 'react';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/Header';
import { Sidebar, BottomNav } from './components/Navigation';
import { VoiceAssistant } from './components/VoiceAssistant';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Market } from './pages/Market';
import { Tools } from './pages/Tools';
import { Analytics } from './pages/Analytics';
import { Profile } from './pages/Profile';
import { OfficialDashboard } from './pages/OfficialDashboard';

const App: React.FC = () => {
  const { userRole, activeTab } = useAppStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'market': return <Market />;
      case 'tools': return <Tools />;
      case 'analytics': return <Analytics />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  if (!userRole) {
    return <Landing />;
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-slate-900 text-slate-900 font-sans selection:bg-primary/20">
      <Header />
      <VoiceAssistant />
      
      <div className="flex max-w-7xl mx-auto">
        {userRole === 'farmer' && (
          <Sidebar />
        )}
        
        <main className={`flex-1 p-4 lg:p-8 min-w-0 ${userRole === 'official' ? 'max-w-5xl mx-auto' : ''}`}>
          {userRole === 'farmer' ? renderContent() : <OfficialDashboard />}
        </main>
      </div>

      {userRole === 'farmer' && (
        <BottomNav />
      )}
    </div>
  );
};

export default App;