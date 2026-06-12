import React, { useState, useEffect } from 'react';
import { Inbox, Filter, CheckCircle, XCircle, Calendar, MessageSquare, X, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

const PromoterReservationList = ({ searchQuery }) => {
  const { token } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('Tous');

  // ─── États pour les Modales (Petites features) ───
  const [acceptModal, setAcceptModal] = useState(null); 
  const [declineModal, setDeclineModal] = useState(null); 
  
  // Formulaires des modales
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/reservations/promoter`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) throw new Error("Serveur injoignable");
        
        const data = await res.json();
        setReservations((data || []).map(reservation => ({
          id: reservation._id,
          clientId: reservation.clientId?._id, 
          clientName: reservation.clientId?.nom || reservation.clientId?.email || 'Client Inconnu',
          projectId: reservation.projetId?._id,
          projectTitle: reservation.projetId?.titre || 'Projet',
          status: reservation.statut, 
          date: reservation.createdAt ? new Date(reservation.createdAt).toLocaleDateString('fr-FR') : 'N/A',
          projectImageUrl: reservation.projetId?.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
        })));
      } catch (error) {
        console.warn("Erreur de chargement :", error.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchReservations();
  }, [token]);

  // ─── Fonction utilitaire : Envoyer un message au client ───
  const sendMessageToClient = async (clientId, text) => {
    try {
      const convRes = await fetch(`${API_BASE_URL}/messages/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ partnerId: clientId })
      });
      const convData = await convRes.json();
      
      await fetch(`${API_BASE_URL}/messages/conversations/${convData.conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text })
      });
    } catch (err) {
      console.error("Erreur lors de l'envoi du message automatique:", err);
    }
  };

  // ─── Validation & Planification du RDV ───
  const handleAcceptSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const message = `Bonjour ${acceptModal.clientName}, votre réservation pour le bien "${acceptModal.projectTitle}" a été acceptée ! \nUn rendez-vous a été planifié le ${appointmentDate} à ${appointmentTime}. \nMerci de confirmer votre disponibilité.`;
      
      await sendMessageToClient(acceptModal.clientId, message);
      setReservations(prev => prev.map(r => r.id === acceptModal.id ? { ...r, status: 'confirme' } : r));
      setAcceptModal(null);
      setAppointmentDate('');
      setAppointmentTime('');
    } catch (error) {
      alert("Une erreur est survenue.");
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Refus & Justification ───
  const handleDeclineSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const message = `Bonjour ${declineModal.clientName}, nous avons le regret de vous informer que votre demande de réservation pour le bien "${declineModal.projectTitle}" n'a pas pu être retenue.\nMotif : ${declineReason}`;
      
      await sendMessageToClient(declineModal.clientId, message);
      setReservations(prev => prev.map(r => r.id === declineModal.id ? { ...r, status: 'annule' } : r));
      setDeclineModal(null);
      setDeclineReason('');
    } catch (error) {
      alert("Une erreur est survenue.");
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Suppression définitive de la réservation ───
  const handleDeleteReservation = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette réservation de votre liste ?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Erreur lors de la suppression.");
      }

      // Disparition instantanée de la ligne dans le tableau
      setReservations(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.clientName.toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                          res.projectTitle.toLowerCase().includes((searchQuery || '').toLowerCase());
    
    const mappedStatus = res.status === 'en_attente' ? 'En attente' : (res.status === 'confirme' ? 'Validée' : 'Annulée');
    const matchesStatus = statusFilter === 'Tous' || mappedStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 bg-white rounded-2xl border border-slate-200">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
          <Inbox className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune réservation</h3>
        <p className="text-slate-500 max-w-md mx-auto text-sm">
          Vos futures sollicitations clients apparaîtront ici dès qu'un acquéreur sera intéressé par l'un de vos biens.
        </p>
      </div>
    );
  }
  
  return (
    <div className="relative">
      
      {/* ─── MODALE : ACCEPTER ET PLANIFIER RDV ─── */}
      {acceptModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setAcceptModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5"/></button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center"><Calendar className="w-5 h-5" /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Planifier un Rendez-vous</h3>
                <p className="text-xs text-slate-500">Accepter la demande de {acceptModal.clientName}</p>
              </div>
            </div>
            <form onSubmit={handleAcceptSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date du RDV</label>
                  <input type="date" required value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-emerald-500 outline-none"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Heure du RDV</label>
                  <input type="time" required value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-emerald-500 outline-none"/>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                <MessageSquare className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <p>Un message automatique contenant ces informations sera envoyé au client via la messagerie ImmoBook.</p>
              </div>
              <button type="submit" disabled={actionLoading} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors">
                {actionLoading ? 'Traitement...' : 'Valider et Envoyer'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODALE : REFUSER AVEC JUSTIFICATION ─── */}
      {declineModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setDeclineModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5"/></button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center"><XCircle className="w-5 h-5" /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Refuser la réservation</h3>
                <p className="text-xs text-slate-500">Pour le projet : {declineModal.projectTitle}</p>
              </div>
            </div>
            <form onSubmit={handleDeclineSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Motif du refus (Justification)</label>
                <textarea 
                  required 
                  rows="3" 
                  placeholder="Ex: Le bien n'est plus disponible actuellement..."
                  value={declineReason} 
                  onChange={e => setDeclineReason(e.target.value)} 
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-rose-500 outline-none resize-none"
                />
              </div>
              <p className="text-[11px] text-slate-500">Le client recevra ce motif par message privé et la réservation sera annulée.</p>
              <button type="submit" disabled={actionLoading} className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl transition-colors">
                {actionLoading ? 'Traitement...' : 'Envoyer le refus'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── TABLEAU PRINCIPAL ─── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-base">Réservations Récentes</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-slate-400"
            >
              <option value="Tous">Tous les statuts</option>
              <option value="En attente">En attente</option>
              <option value="Validée">Validée</option>
              <option value="Annulée">Annulée</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50/50 border-y border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Client</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Projet ciblé</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Date Demande</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Statut</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res) => {
                const isPending = res.status === 'en_attente';

                return (
                  <tr key={res.id} className="border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 text-sm">{res.clientName}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={res.projectImageUrl} alt="Projet" className="w-9 h-9 rounded-lg object-cover shadow-sm border border-slate-200" />
                        <span className="font-semibold text-slate-700 text-sm truncate max-w-[150px]">{res.projectTitle}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm font-medium">{res.date}</td>
                    
                    {/* Badge de statut */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md border ${
                        res.status === 'en_attente' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                        res.status === 'confirme' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {res.status === 'en_attente' ? 'En attente' : res.status === 'confirme' ? 'Validée' : 'Annulée'}
                      </span>
                    </td>

                    {/* Colonne d'Actions */}
                    <td className="px-6 py-4 text-center">
                      {isPending ? (
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => setAcceptModal(res)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Accepter
                          </button>
                          <button 
                            onClick={() => setDeclineModal(res)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Refuser
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-xs font-medium text-slate-400 italic">
                            {res.status === 'confirme' ? 'RDV Planifié' : 'Dossier clos'}
                          </span>
                          
                          {/* 🚀 BOUTON SUPPRIMER : Affiché uniquement après traitement */}
                          <button 
                            onClick={() => handleDeleteReservation(res.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Supprimer définitivement la réservation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
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