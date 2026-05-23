import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PromoterReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const host = window.location.hostname;
        //ex:const response = await fetch(`http://${host}:4000/api/v1/reservations`);
        const data = await response.json();
        setReservations(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur récupération réservations:", error);
        
        // Données de secours pour la démo locale (à remplacer par l'API réelle)
        setReservations([
          { 
            id: 'res_01', 
            clientName: 'Amari Roman', 
            projectTitle: 'Présidence Palmeraie', 
            date: '12/03/2026', 
            status: 'Finitions', // Déjà traité
            projectImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80'
          },
          { 
            id: 'res_02', 
            clientName: 'Harain Hamez', 
            projectTitle: 'Villa Anfa Moderne', 
            date: '03/02/2026', 
            status: 'En attente', // À traiter
            projectImageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&q=80'
          },
          { 
            id: 'res_03', 
            clientName: 'Jooreth Anfa', 
            projectTitle: 'Appartements Marina', 
            date: '21/03/2026', 
            status: 'Finitions', // Déjà traité
            projectImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80'
          }
        ]);
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleValidateAndSchedule = (reservationId) => {
    navigate(`/promoteur-dashboard/create-appointment/${reservationId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#3100b3]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
      <div className="px-8 py-5 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-900">Réservations Récentes</h2>
        <button className="text-slate-400 hover:text-slate-600"><span className="text-xl">⋮</span></button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Projet ciblé</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Demande</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Action Métier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reservations.map((res) => {
              // Vérification : la réservation est-elle déjà validée/traitée ?
              const isAlreadyValidated = res.status !== 'En attente';

              return (
                <tr key={res.id} className="hover:bg-slate-50 transition">
                  <td className="px-8 py-4 font-bold text-slate-900">{res.clientName}</td>
                  
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <img src={res.projectImageUrl} alt={res.projectTitle} className="w-12 h-12 rounded-lg object-cover shadow-sm border border-slate-200" />
                      <span className="font-semibold text-slate-700">{res.projectTitle}</span>
                    </div>
                  </td>
                  
                  <td className="px-8 py-4 text-slate-500 text-sm font-medium">{res.date}</td>
                  
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      isAlreadyValidated ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {res.status}
                    </span>
                  </td>

                  {/* Gestion dynamique de la transparence du bouton */}
                  <td className="px-8 py-4 text-center">
                    <button 
                      onClick={() => handleValidateAndSchedule(res.id)}
                      disabled={isAlreadyValidated}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 mx-auto ${
                        isAlreadyValidated 
                          ? 'bg-transparent text-slate-400 border border-slate-200 cursor-not-allowed opacity-50' // Rendu transparent et bloqué
                          : 'bg-[#3100b3] text-white shadow-sm hover:bg-indigo-800 active:scale-95'
                      }`}
                    >
                      {isAlreadyValidated ? (
                        <><span>✓</span> RDV Planifié</>
                      ) : (
                        <><span>🤝</span> Valider & Planifier RDV</>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromoterReservationList;