import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PromoterProjectList from '../../components/PromoterProjectList';
import PromoterReservationList from '../../components/PromoterReservationList'; 
import PromoterChat from '../../components/PromoterChat';

const PromoterDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // États pour les données
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

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* SIDEBAR - Thème Deep Indigo */}
      <aside className="w-72 bg-[#3100b3] text-white flex flex-col shadow-2xl z-10">
        <div className="p-8 pb-4">
          <div className="text-2xl font-bold text-white flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.5l5.5 5.5H16v7h-2v-6h-4v6H8v-7H6.5L12 5.5z"/></svg>
            <span>immobook</span>
          </div>
          
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 mt-6 mb-4 opacity-80">
            Menu Principal
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all ${activeTab === 'overview' ? 'bg-white/10 border-l-4 border-emerald-400 text-white' : 'text-indigo-200 hover:bg-white/5'}`}
          >
            <span className="text-xl">📊</span> Vue d'ensemble
          </button>
          <button 
            onClick={() => setActiveTab('projects')} 
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all ${activeTab === 'projects' ? 'bg-white/10 border-l-4 border-emerald-400 text-white' : 'text-indigo-200 hover:bg-white/5'}`}
          >
            <span className="text-xl">🏢</span> Mes Projets
          </button>
          <button 
            onClick={() => setActiveTab('reservations')} 
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all ${activeTab === 'reservations' ? 'bg-white/10 border-l-4 border-emerald-400 text-white' : 'text-indigo-200 hover:bg-white/5'}`}
          >
            <span className="text-xl">📅</span> Réservations
          </button>
          <button 
            onClick={() => setActiveTab('messages')} 
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all ${activeTab === 'messages' ? 'bg-white/10 border-l-4 border-emerald-400 text-white' : 'text-indigo-200 hover:bg-white/5'}`}
          >
            <span className="text-xl">✉️</span> Messagerie
          </button>
        </nav>

        {/* Profil Utilisateur */}
        <div className="p-6 mt-auto border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold shadow-md">
              {user?.companyName?.charAt(0) || 'P'}
            </div>
            <div>
              <p className="text-sm font-bold truncate max-w-[120px]">{user?.companyName || 'Promoteur Pro'}</p>
              <p className="text-xs text-indigo-300">Administrateur</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="text-indigo-300 hover:text-white transition p-2">
            🚪
          </button>
        </div>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 p-10 overflow-y-auto">
        
        {/* Header du Dashboard */}
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Tableau de Bord Promoteur</h1>
            <p className="text-slate-500 font-medium">Gestion de Portefeuille Immobilier - {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="flex gap-4">
            <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg shadow-sm hover:bg-slate-50 transition">
              📄 Rapport PDF
            </button>
            <button className="px-5 py-2.5 bg-[#3100b3] text-white font-bold rounded-lg shadow-md hover:bg-indigo-800 transition">
              + Nouveau Projet
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3100b3]"></div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* 1. EMPLACEMENT DANS L'ONGLET VUE D'ENSEMBLE */}
            {activeTab === 'overview' && (
              <>
                {/* Cartes KPI */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {metrics.map(m => (
                    <div key={m.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{m.label}</p>
                      <p className="text-3xl font-black text-slate-900 mb-2">{m.value}</p>
                      <p className={`text-sm font-semibold ${m.trend.includes('↑') ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {m.trend}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 1. Grille des projets actifs */}
                <PromoterProjectList />

                {/* 2. Tableau des réservations récentes (Ajouté ici !) */}
                <PromoterReservationList />
              </>
            )}

            {/* ONGLET MES PROJETS DÉDIÉ */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Gestion de vos chantiers actifs</h2>
                <PromoterProjectList />
              </div>
            )}

            {/* ONGLET RÉSERVATIONS DÉDIÉ */}
            {activeTab === 'reservations' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Toutes les demandes de réservation</h2>
                <PromoterReservationList />
              </div>
            )}

            {/* ONGLET MESSAGERIE */}
            {activeTab === 'messages' && (
            <div className="space-y-4 max-w-3xl">
                <h2 className="text-xl font-bold text-slate-900">Messagerie Client</h2>
                {/* Passe ici l'ID de la conversation active pour tes tests, ex: "conv_123" */}
                <PromoterChat targetConversationId="conv_123" />
            </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PromoterDashboard;