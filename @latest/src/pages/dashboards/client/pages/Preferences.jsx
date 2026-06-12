import { useState } from "react";

// ─── Inline SVG Icons (Propres et minimalistes) ──────────────────────────────
const IconMapPin = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const IconHome = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;
const IconWallet = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>;
const IconBell = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>;
const IconCheck = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>;

const CITIES = ["Casablanca", "Marrakech", "Rabat", "Tanger", "Agadir"];
const TYPES = ["Appartement", "Villa", "Riad", "Terrain", "Studio"];

// Composant Toggle personnalisé (Switch)
const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${enabled ? 'bg-blue-600' : 'bg-slate-200'}`}
  >
    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

function Preferences() {
  const [city, setCity] = useState("Casablanca");
  const [budget, setBudget] = useState(2500000);
  const [type, setType] = useState("Appartement");
  
  // États pour les notifications
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-800 pb-10">
      
      {/* ── Realistic Header ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Préférences du compte</h1>
        <p className="text-slate-500 mt-2 text-sm">Configurez vos critères de recherche pour recevoir des recommandations précises et personnalisées.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ── Main Settings Column (Left 2/3) ── */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Card 1: Critères de recherche */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <h3 className="font-bold text-slate-900 text-lg">Critères de recherche</h3>
              <p className="text-xs text-slate-500 mt-1">Définissez le type de bien que vous recherchez.</p>
            </div>
            
            <div className="p-6 space-y-8">
              
              {/* Ville Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                  <IconMapPin /> Zone géographique prioritaire
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CITIES.map(c => (
                    <button
                      key={c}
                      onClick={() => setCity(c)}
                      className={`h-10 rounded-lg text-sm font-medium transition-all border flex items-center justify-center gap-2 ${
                        city === c 
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {city === c && <IconCheck />} {c}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Type Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                  <IconHome /> Type de propriété
                </div>
                <div className="flex flex-wrap gap-3">
                  {TYPES.map(t => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`px-4 h-10 rounded-lg text-sm font-medium transition-all border flex items-center justify-center gap-2 ${
                        type === t 
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {type === t && <IconCheck />} {t}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Budget Slider */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                  <IconWallet /> Budget maximum
                </div>
                <div className="pt-2 pb-1">
                  <div className="flex justify-between text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                    <span>500K MAD</span>
                    <span className="text-blue-600 text-lg tracking-normal">{(budget / 1000000).toFixed(2)} M MAD</span>
                    <span>15M MAD</span>
                  </div>
                  <input 
                    type="range" 
                    min="500000" 
                    max="15000000" 
                    step="100000" 
                    value={budget} 
                    onChange={e => setBudget(Number(e.target.value))} 
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ── Settings Column (Right 1/3) ── */}
        <div className="space-y-6">
          
          {/* Card 2: Notifications */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center gap-2">
              <IconBell className="text-slate-500" />
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Alertes & Notifs</h3>
            </div>
            
            <div className="p-6 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Alertes par Email</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Nouveaux biens correspondants.</p>
                </div>
                <ToggleSwitch enabled={emailAlerts} onChange={setEmailAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Notifications Push</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Sur votre navigateur web.</p>
                </div>
                <ToggleSwitch enabled={pushAlerts} onChange={setPushAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">SMS</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Rappels de visites prévues.</p>
                </div>
                <ToggleSwitch enabled={smsAlerts} onChange={setSmsAlerts} />
              </div>

            </div>
          </div>

          {/* Bouton d'enregistrement */}
          <div className="pt-2">
            <button className="w-full h-12 bg-blue-600 text-white font-medium text-sm rounded-xl shadow-sm hover:bg-blue-700 hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Enregistrer les modifications
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-3">
              Dernière mise à jour : Aujourd'hui
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Preferences;