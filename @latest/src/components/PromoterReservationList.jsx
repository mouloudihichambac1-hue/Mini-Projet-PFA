import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, Filter } from 'lucide-react';

const PromoterReservationList = ({ searchQuery }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('Tous');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const host = window.location.hostname;
        const res = await fetch(`http://${host}:4000/api/v1/reservations`);
        
        if (!res.ok) throw new Error("Serveur injoignable");
        
        const data = await res.json();
        setReservations(data);
        setLoading(false);
      } catch (error) {
        console.warn("Mode Démo activé (Réservations chargées localement) :", error.message);
        
        // 🛡️ DONNÉES DE SECOURS STABLES
        setReservations([
          { 
            id: 'res_01', 
            clientName: 'Amari Roman', 
            projectTitle: 'Résidence Palmeraie', 
            date: '12/03/2026', 
            status: 'Finitions',
            projectImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80'
          },
          { 
            id: 'res_02', 
            clientName: 'Harain Hamez', 
            projectTitle: 'Villa Anfa Moderne', 
            date: '03/02/2026', 
            status: 'En attente',
            projectImageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&q=80'
          },
          { 
            id: 'res_03', 
            clientName: 'Jooreth Anfa', 
            projectTitle: 'Appartements Marina', 
            date: '21/03/2026', 
            status: 'Finitions',
            projectImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80'
          }
        ]);
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);
  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.clientName.toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                          res.projectTitle.toLowerCase().includes((searchQuery || '').toLowerCase());
    
    const matchesStatus = statusFilter === 'Tous' || res.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  const handleValidateAndSchedule = (reservationId) => {
    navigate(`/promoteur-dashboard/create-appointment/${reservationId}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="h-5 w-48 bg-slate-200 rounded-full"></div>
        </div>
        <div className="p-8 space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded-full w-1/3"></div>
              </div>
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                <div className="h-4 bg-slate-200 rounded-full w-2/3"></div>
              </div>
              <div className="w-20 h-4 bg-slate-200 rounded-full hidden md:block"></div>
              <div className="w-16 h-6 bg-slate-200 rounded-full hidden md:block"></div>
              <div className="w-32 h-8 bg-slate-200 rounded-lg hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // UX : Gestion de l'état vide (Empty State) pour les réservations
  if (!loading && reservations.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-100">
          <Inbox className="w-12 h-12 text-emerald-600" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-3">Boîte de réception à jour</h3>
        <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
          Vous n'avez aucune demande de réservation en attente. Vos futures sollicitations clients apparaîtront ici dès qu'un acquéreur sera intéressé par l'un de vos biens.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Barre d'outils du tableau : Titre + Menu de filtrage */}
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
        <h3 className="font-bold text-slate-800 text-base">Réservations Récentes</h3>
        
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#3100b3] cursor-pointer"
          >
            <option value="Tous">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Finitions">Finitions</option>
          </select>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-y border-slate-100">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Client</th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Projet ciblé</th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Date Demande</th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Statut</th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-center">Action Métier</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res) => {
                const isAlreadyValidated = res.status !== 'En attente';

                return (
                  <tr key={res.id} className="border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors">
                    
                    {/* Nom du Client  */}
                    <td className="px-8 py-4 font-extrabold text-slate-900">{res.clientName}</td>
                    
                    {/* Projet   */}
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <img src={res.projectImageUrl} alt={res.projectTitle} className="w-10 h-10 rounded-lg object-cover shadow-sm border border-slate-200" />
                        <span className="font-semibold text-slate-600 text-sm">{res.projectTitle}</span>
                      </div>
                    </td>
                    
                    {/* Date  */}
                    <td className="px-8 py-4 text-slate-400 text-sm font-medium">{res.date}</td>
                    
                    {/* Statut Badge affiné */}
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1.5 text-[11px] font-bold rounded-full ${
                        isAlreadyValidated ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {res.status}
                      </span>
                    </td>

                    {/* Bouton d'action conservé */}
                    <td className="px-8 py-4 text-center">
                      <button 
                        onClick={() => handleValidateAndSchedule(res.id)}
                        disabled={isAlreadyValidated}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 mx-auto ${
                          isAlreadyValidated 
                            ? 'bg-transparent text-slate-400 border border-slate-200 cursor-not-allowed opacity-60' 
                            : 'bg-[#3100b3] text-white shadow-sm hover:bg-indigo-800 active:scale-95'
                        }`}
                      >
                        {isAlreadyValidated ? '✓ RDV Planifié' : 'Valider & Planifier RDV'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PromoterReservationList;