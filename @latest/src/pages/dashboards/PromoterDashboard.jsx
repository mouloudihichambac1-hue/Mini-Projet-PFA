import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PromoterProjectList from '../../components/PromoterProjectList';
import PromoterReservationList from '../../components/PromoterReservationList'; 
import PromoterChat from '../../components/PromoterChat';
import AddProject from '../../components/AddProject';
import { LayoutDashboard, Building2, CalendarCheck, MessageSquare, LogOut, FileText, Plus, Search, Menu, X, Settings } from 'lucide-react';
import NotificationCenter from '../../components/NotificationCenter';
import PromoterAnalytics from '../../components/PromoterAnalytics';
import PromoterSettings from '../../components/PromoterSettings';

const PromoterDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  //  ÉTAT DU MENU MOBILE
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setTimeout(() => {
        setMetrics([
          { id: '1', label: 'Ventes Totales', value: '12.8M DH', trend: '↑ 12% vs mois dernier' },
          { id: '2', label: 'Taux de Réservation', value: '88%', trend: '↑ 5.4% ce trimestre' },
          { id: '3', label: 'Nouveaux Prospects', value: '24', trend: 'En attente de contact' }
        ]);
        setLoading(false);
      }, 600);
    };
    loadDashboardData();
  }, [token]);

  // Fonction pour changer d'onglet et fermer le menu mobile automatiquement
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    // On passe en flex-col sur mobile, et flex-row sur desktop 
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans text-slate-900">
      
      {/*  EN-TÊTE MOBILE (Visible uniquement sur petits écrans) */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.5l5.5 5.5H16v7h-2v-6h-4v6H8v-7H6.5L12 5.5z"/></svg>
          </div>
          <span className="font-black text-lg">ImmoBook <span className="text-emerald-600 text-sm">Pro</span></span>
        </div>
        <div className="flex items-center gap-2">
          <NotificationCenter />
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/*  OVERLAY SOMBRE (Ferme le menu si on clique à côté sur mobile) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      {/* SIDEBAR RESPONSIVE */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white text-slate-800 flex flex-col border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        <div className="p-8 pb-4 flex justify-between items-center">
          <div className="text-2xl font-black text-slate-900 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.5l5.5 5.5H16v7h-2v-6h-4v6H8v-7H6.5L12 5.5z"/></svg>
            </div>
            <span>ImmoBook <span className="text-emerald-600 text-sm">Pro</span></span>
          </div>
          {/* Bouton fermer sur mobile */}
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto">
          <button onClick={() => handleTabChange('overview')} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'overview' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <LayoutDashboard className="w-5 h-5" /> Vue d'ensemble
          </button>
          <button onClick={() => handleTabChange('projects')} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'projects' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <Building2 className="w-5 h-5" /> Mes Projets
          </button>
          <button onClick={() => handleTabChange('reservations')} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'reservations' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <CalendarCheck className="w-5 h-5" /> Réservations
          </button>
          <button onClick={() => handleTabChange('messages')} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'messages' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <MessageSquare className="w-5 h-5" /> Messagerie
          </button>
          <button 
            onClick={() => handleTabChange('settings')} 
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Settings className="w-5 h-5" /> Paramètres
          </button>
        </nav>

        {/* Profil Utilisateur */}
        <div className="p-6 mt-auto border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-md">
              {user?.companyName?.charAt(0) || 'P'}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 truncate max-w-[120px]">{user?.companyName || 'Promoteur Pro'}</p>
              <p className="text-xs text-slate-500">Administrateur</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="text-slate-400 hover:text-red-500 transition p-2 bg-slate-50 rounded-lg hover:bg-red-50">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        
        {/* HEADER - Adapté mobile */}
        <header className="mb-6 md:mb-10 animate-in fade-in duration-500">
          <div className="bg-[#1a1b26] text-white rounded-[2rem] p-6 md:p-10 shadow-xl border border-slate-800 flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="z-10 relative">
              <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-2 hidden md:block">Espace Promoteur Professionnel</p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-2">
                Bienvenue, {user?.companyName?.split(' ')[0] || 'Promoteur'}.
              </h1>
              <p className="text-slate-400 text-xs md:text-sm max-w-md leading-relaxed hidden md:block">
                Découvrez les statistiques de votre portefeuille et gérez vos réservations.
              </p>
            </div>

            <div className="z-10 relative w-full xl:w-auto flex-1 max-w-lg xl:flex xl:justify-end">
              <div className="flex items-center w-full bg-white rounded-xl p-1.5 shadow-lg border border-slate-200">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Quartier, mot-clé..." 
                  className="w-full pl-3 pr-4 py-2.5 md:py-3 bg-transparent text-slate-900 text-sm font-medium outline-none placeholder-slate-400"
                />
                <button className="bg-[#1a1b26] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg text-sm font-bold hover:bg-slate-800 transition shadow-sm shrink-0">
                  Chercher
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-start md:justify-end items-center gap-3 mt-6">
            <div className="hidden md:block"><NotificationCenter /></div>
            <button className="flex-1 md:flex-none justify-center px-4 md:px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl shadow-sm hover:bg-slate-50 transition flex items-center gap-2">
              <FileText className="w-4 h-4" /> <span className="hidden sm:inline">Rapport</span>
            </button>
            <button onClick={() => handleTabChange('add-project')} className="flex-1 md:flex-none justify-center px-4 md:px-5 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl shadow-md hover:bg-slate-800 transition flex items-center gap-2">
              <Plus className="w-4 h-4" /> Nouveau Projet
            </button>
          </div>
        </header>

        {loading ? (
          /* Skeletons */
          <div className="space-y-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-pulse flex flex-col gap-3">
                  <div className="h-3 bg-slate-200 rounded-full w-1/3 mb-2"></div><div className="h-8 bg-slate-200 rounded-full w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 w-full overflow-hidden">
            
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {metrics.map(m => (
                    <div key={m.id} className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 md:mb-3">{m.label}</p>
                      <p className="text-2xl md:text-3xl font-black text-slate-900 mb-1 md:mb-2">{m.value}</p>
                      <p className={`text-xs md:text-sm font-semibold ${m.trend.includes('↑') ? 'text-emerald-600' : 'text-slate-400'}`}>{m.trend}</p>
                    </div>
                  ))}
                </div>
                <PromoterAnalytics />
                <PromoterProjectList onAddProjectClick={() => handleTabChange('add-project')} searchQuery={searchQuery} />
                <PromoterReservationList searchQuery={searchQuery} />
              </>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Gestion de vos chantiers actifs</h2>
                <PromoterProjectList onAddProjectClick={() => handleTabChange('add-project')} searchQuery={searchQuery} />
              </div>
            )}

            {activeTab === 'reservations' && (
              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Demandes de réservation</h2>
                <PromoterReservationList searchQuery={searchQuery} />
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Messagerie Client</h2>
                <PromoterChat targetConversationId="conv_123" />
              </div>
            )}
            
            {activeTab === 'add-project' && (
              <AddProject onCancel={() => handleTabChange('overview')} onSuccess={() => handleTabChange('projects')} />
            )}

            {/* ONGLET PARAMÈTRES / PROFIL  */}
            {activeTab === 'settings' && (
              <PromoterSettings />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PromoterDashboard;