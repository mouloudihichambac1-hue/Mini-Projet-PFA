import { useState } from "react";
import { Link } from "react-router-dom";

// ─── Inline SVG Icons (Propres et minimalistes) ──────────────────────────────
const IconTrash = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconCompare = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const IconPin = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;

const INITIAL_FAVORITES = [
  { id: 1, title: "Villa Moderne avec Piscine", type: "Villa", price: 4850000, city: "Marrakech", beds: 5, baths: 4, area: 420, rating: 4.9, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80" },
  { id: 2, title: "Appartement Vue Océan", type: "Appartement", price: 12500, city: "Casablanca", beds: 3, baths: 2, area: 145, rating: 4.7, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80" },
  { id: 4, title: "Appartement Standing Centre-Ville", type: "Appartement", price: 1850000, city: "Rabat", beds: 3, baths: 2, area: 120, rating: 4.6, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" },
];

function Favorites() {
  const [list, setList] = useState(INITIAL_FAVORITES);
  const [compareIds, setCompareIds] = useState([]);

  const handleRemove = (id) => {
    setList(prev => prev.filter(item => item.id !== id));
    setCompareIds(prev => prev.filter(cId => cId !== id));
  };

  const handleToggleCompare = (id) => {
    setCompareIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const selectedForComparison = list.filter(item => compareIds.includes(item.id));

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-slate-800">
      
      {/* ── Realistic Header ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mes Biens Favoris</h1>
        <p className="text-slate-500 mt-2 text-sm">Gérez vos sélections et comparez jusqu'à 4 biens simultanément pour affiner votre choix.</p>
      </div>

      {list.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <IconPin />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Aucun bien sauvegardé</h3>
          <p className="text-slate-500 text-sm mb-6">Vous n'avez pas encore ajouté de coups de cœur à votre liste.</p>
          <Link to="/dashboard/client" className="inline-flex items-center justify-center h-10 px-6 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors">
            Explorer les propriétés
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map(item => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              
              <div className="h-44 w-full rounded-lg overflow-hidden relative bg-slate-100 flex-shrink-0">
                <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt={item.title} />
                <button 
                  onClick={() => handleRemove(item.id)} 
                  className="absolute top-3 right-3 bg-white/90 text-slate-400 p-2 rounded-full hover:text-rose-600 hover:bg-white shadow-sm transition-colors"
                  title="Retirer des favoris"
                >
                  <IconTrash />
                </button>
              </div>
              
              <div className="mt-4 flex-1 flex flex-col">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{item.type} · {item.city}</span>
                <h4 className="font-bold text-slate-900 text-base line-clamp-1 mt-1">{item.title}</h4>
                <p className="text-lg font-bold text-slate-900 mt-2">{item.price.toLocaleString()} MAD</p>
                
                <div className="mt-auto pt-4">
                  <button 
                    onClick={() => handleToggleCompare(item.id)} 
                    className={`w-full h-10 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                      compareIds.includes(item.id) 
                      ? "bg-slate-900 text-white border border-slate-900" 
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {compareIds.includes(item.id) ? "Bien sélectionné" : "Comparer ce bien"}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ── Professional Comparator Data Table ── */}
      {selectedForComparison.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
            <div className="text-slate-500"><IconCompare /></div>
            <h3 className="font-bold text-slate-900">Analyse comparative ({selectedForComparison.length} biens)</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-white border-b border-slate-200">
                  <th className="p-4 text-slate-500 font-medium w-48 bg-slate-50/50">Critères d'évaluation</th>
                  {selectedForComparison.map(b => (
                    <th key={b.id} className="p-4 font-bold text-slate-900 border-l border-slate-100 min-w-[200px]">
                      {b.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-slate-600 font-medium bg-slate-50/50">Prix de transaction</td>
                  {selectedForComparison.map(b => (
                    <td key={b.id} className="p-4 font-bold text-slate-900 border-l border-slate-100">
                      {b.price.toLocaleString()} MAD
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-slate-600 font-medium bg-slate-50/50">Localisation</td>
                  {selectedForComparison.map(b => (
                    <td key={b.id} className="p-4 text-slate-700 border-l border-slate-100">
                      {b.city}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-slate-600 font-medium bg-slate-50/50">Superficie totale</td>
                  {selectedForComparison.map(b => (
                    <td key={b.id} className="p-4 text-slate-700 border-l border-slate-100">
                      {b.area} m²
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-slate-600 font-medium bg-slate-50/50">Distribution (Ch/Sdb)</td>
                  {selectedForComparison.map(b => (
                    <td key={b.id} className="p-4 text-slate-700 border-l border-slate-100">
                      {b.beds ? `${b.beds} Pièces / ${b.baths} Sdb` : "Non applicable"}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-slate-600 font-medium bg-slate-50/50">Note de l'agent</td>
                  {selectedForComparison.map(b => (
                    <td key={b.id} className="p-4 font-medium text-slate-900 border-l border-slate-100 flex items-center gap-1.5">
                      <span className="text-yellow-400">★</span> {b.rating} / 5.0
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;