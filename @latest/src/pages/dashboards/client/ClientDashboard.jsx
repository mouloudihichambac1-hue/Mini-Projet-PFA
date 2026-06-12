import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Overview from './pages/Overview';
import Favorites from './pages/Favorites';
import Visits from './pages/Visits';
import Messages from './pages/Messages';
import Preferences from './pages/Preferences';

// ─── Inline SVG Icons (Professionnels et minimalistes) ─────────────────────────
const IconSearch = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
const IconHeart = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const IconCalendar = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const IconMessage = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
const IconSettings = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
const IconLogout = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;

// Logo 
const IconLogo = () => <svg className="w-7 h-7 text-slate-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;

function ClientDashboard() {
  const location = useLocation();

  const menuItems = [
    { path: '/client-dashboard', label: 'Explorer les Biens', icon: <IconSearch /> },
    { path: '/client-dashboard/favorites', label: 'Mes Favoris', icon: <IconHeart /> },
    { path: '/client-dashboard/visits', label: 'Mes Visites', icon: <IconCalendar /> },
    { path: '/client-dashboard/messages', label: 'Messagerie', icon: <IconMessage /> },
    { path: '/client-dashboard/preferences', label: 'Mes Préférences', icon: <IconSettings /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* Sidebar Layout */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between fixed h-screen z-20">
        <div className="flex flex-col gap-8">
          
          {/* Logo Pro avec "v2" de la même couleur */}
          <div className="flex items-center gap-3 px-2">
            <IconLogo />
            <h2 className="text-xl font-black tracking-tight text-slate-900">
              ImmoBook v2
            </h2>
          </div>
          
          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bouton Déconnexion */}
        <Link 
          to="/" 
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-sm font-medium transition-colors"
        >
          <IconLogout /> Déconnexion
        </Link>
      </aside>

      {/* Main Container */}
      <main className="flex-1 pl-64 min-h-screen flex flex-col">
        <div className="p-8 flex-1">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="visits" element={<Visits />} />
            <Route path="messages" element={<Messages />} />
            <Route path="preferences" element={<Preferences />} />
          </Routes>
        </div>
      </main>
      
    </div>
  );
}

export default ClientDashboard;