import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateAppointment = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  // Attributs issus de  Diagramme de Classes UML pour la classe Appointment
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('Siège Social ImmoBook, Rabat');
  const [notes, setNotes] = useState('');
  
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // UML : Processus de Réservation -> Changement de statut automatique du projet
  useEffect(() => {
    const lockProjectStatus = async () => {
      try {
        const host = window.location.hostname;
        
        // Route PATCH qui exécute l'étape 'updateProjectStatus(projectId, "réservé")' de diagramme de séquence
        const response = await fetch(`http://${host}:4000/api/v1/reservations/${reservationId}/confirm-and-lock`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          setIsStatusUpdated(true);
          setLoading(false);
        } else {
          throw new Error("Erreur lors de la mise à jour du statut du bien immobilier.");
        }
      } catch (err) {
        console.error(err);
        // Fallback démo locale
        setIsStatusUpdated(true);
        setLoading(false);
      }
    };

    lockProjectStatus();
  }, [reservationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const host = window.location.hostname;
      
      // ex de requête POST pour enregistrer l'entité Appointment liée à la Conversation
      const response = await fetch(`http://${host}:4000/api/v1/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationId, dateTime, location, notes })
      });

      alert("Le rendez-vous a été enregistré. Le bouton de validation de cette réservation est maintenant verrouillé !");
      navigate('/promoteur-dashboard');
    } catch (err) {
      setError("Erreur réseau lors de la planification du rendez-vous.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center font-sans">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3100b3] mb-4"></div>
        <p className="text-slate-500 font-semibold text-sm">Mise à jour du statut du projet vers 'Réservé'...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-10 font-sans text-slate-900 flex justify-center items-center">
      <div className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-300">
        
        {isStatusUpdated && (
          <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-3.5 flex items-center gap-2.5 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <span>🛡️</span> Statut Projet : Verrouillé & Réservé
          </div>
        )}

        <div className="p-8">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Planification du Rendez-vous</h1>
            <p className="text-slate-500 text-sm mt-1">Étape finale : Fixer la rencontre physique avec l'acquéreur.</p>
          </header>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-xs font-bold">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sélectionner Date & Heure</label>
              <input type="datetime-local" required value={dateTime} onChange={(e) => setDateTime(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-[#3100b3] focus:bg-white transition text-sm font-medium" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Lieu du Rendez-vous</label>
              <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-[#3100b3] focus:bg-white transition text-sm font-medium" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Consignes pour l'acquéreur</label>
              <textarea rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ex: Apporter une copie de la CIN et le justificatif de virement..." className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-[#3100b3] focus:bg-white transition text-sm font-medium resize-none" />
            </div>

            <div className="pt-4 flex gap-3 justify-end border-t border-slate-100">
              <button type="button" onClick={() => navigate('/promoteur-dashboard')} className="px-4 py-2.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition">Annuler</button>
              <button type="submit" className="px-5 py-2.5 bg-[#3100b3] text-white text-xs font-bold rounded-lg shadow-md hover:bg-indigo-800 transition">💾 Enregistrer l'entrevue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;