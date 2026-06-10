import { useState } from "react";

// ─── Inline SVG Icons (Propres et professionnels) ──────────────────────────────
const IconCalendar = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const IconClock = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const IconUser = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const IconPin = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const IconChevronLeft = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>;
const IconChevronRight = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>;

function Visits() {
  const [visits, setVisits] = useState([
    { 
      id: 1, 
      title: "Villa Moderne Palmeraie", 
      location: "Palmeraie, Marrakech",
      date: "Vendredi 12 Juin 2026", 
      day: 12,
      time: "14:30", 
      agent: "Salma Idrissi", 
      status: "Confirmée", 
      statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200" 
    },
    { 
      id: 2, 
      title: "Appartement Vue Océan", 
      location: "Ain Diab, Casablanca",
      date: "Mercredi 18 Juin 2026", 
      day: 18,
      time: "10:00", 
      agent: "Karim Benali", 
      status: "En attente de l'agent", 
      statusStyle: "bg-amber-50 text-amber-700 border-amber-200" 
    },
  ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-slate-800">
      
      {/* ── Realistic Header ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mes Visites</h1>
          <p className="text-slate-500 mt-2 text-sm">Gérez votre agenda et suivez le statut de vos rendez-vous avec nos agents immobiliers.</p>
        </div>
        <button className="h-10 px-5 bg-white border border-slate-300 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap">
          <IconCalendar /> Historique des visites
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── Liste des Visites ── */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Prochains rendez-vous</h2>
          
          {visits.map(v => (
            <div key={v.id} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${v.statusStyle}`}>
                    {v.status}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">{v.title}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                    <IconPin /> {v.location}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2">
                    <IconUser /> <span className="text-slate-900">{v.agent}</span>
                  </div>
                  <div className="w-px h-4 bg-slate-300 hidden sm:block"></div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <IconClock /> {v.time} (GMT+1)
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:items-end justify-between min-w-[140px] gap-4 sm:gap-0">
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date Prévue</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{v.date}</p>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                    Reporter
                  </button>
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                    Détails
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── Calendrier Widget Pro ── */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Aperçu du mois</h2>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            
            {/* Header Calendrier */}
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-slate-900">Juin 2026</h4>
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"><IconChevronLeft /></button>
                <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"><IconChevronRight /></button>
              </div>
            </div>

            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(d => (
                <span key={d} className="font-bold text-slate-400 py-1">{d}</span>
              ))}
            </div>

            {/* Grille des jours */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {/* Espaces vides pour simuler le décalage du début du mois */}
              <span className="p-2"></span>
              
              {Array.from({ length: 30 }).map((_, i) => {
                const dayNum = i + 1;
                const isReserved = dayNum === 12 || dayNum === 18;
                const isToday = dayNum === 8; // Simuler aujourd'hui

                return (
                  <button key={i} className={`
                    relative p-2 w-8 h-8 mx-auto rounded-full flex items-center justify-center font-medium transition-colors
                    ${isToday ? "bg-blue-50 text-blue-700 ring-1 ring-blue-600 font-bold" : "text-slate-700 hover:bg-slate-100"}
                    ${isReserved ? "bg-slate-900 text-white font-bold hover:bg-slate-800" : ""}
                  `}>
                    {dayNum}
                    {isReserved && <span className="absolute bottom-0 w-1 h-1 bg-blue-400 rounded-full"></span>}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span> Visite programmée
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full ring-1 ring-blue-600 bg-blue-50"></span> Aujourd'hui
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Visits;