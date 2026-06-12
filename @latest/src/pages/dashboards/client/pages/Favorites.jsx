import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext"; // Vérifie le chemin d'import
import { API_BASE_URL } from '../../../../config/api';
const IconTrash = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
const IconCompare = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);
const IconPin = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function Favorites() {
  const { token } = useAuth();
  const [list, setList] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Récupération des favoris via GET /api/v2/favorites/mine
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/favorites/mine`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Impossible de charger vos favoris.');
        }

        const data = await response.json();
        
        // Sécurisation : on mappe pour extraire projetId (renseigné par le populate)
        setList(
          data
            .filter((item) => item.projetId) // S'assure que le projet n'a pas été supprimé par le promoteur
            .map((item) => ({
              ...item,
              projet: item.projetId, // On renomme projetId en projet pour faciliter l'accès
            }))
        );
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des favoris.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  // 2. Suppression d'un favori via DELETE /api/v2/favorites/:id
  const handleRemove = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Impossible de retirer le favori.');
      }

      // Mise à jour de l'UI instantanément sans recharger la page
      setList((prev) => prev.filter((item) => item._id !== id));
      setCompareIds((prev) => prev.filter((cId) => cId !== id));
    } catch (err) {
      alert(err.message || 'Erreur lors de la suppression du favori.');
    }
  };

  const handleToggleCompare = (id) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const selectedForComparison = list.filter((item) => compareIds.includes(item._id));

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 text-center text-rose-600 bg-rose-50 rounded-xl font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-slate-800 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="bg-slate-900 rounded-2xl p-8 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10">
          <p className="text-slate-400 text-sm font-medium tracking-wide uppercase mb-1">Espace Personnel</p>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Mes Biens Favoris</h1>
          <p className="text-slate-300 mt-2 text-sm leading-relaxed max-w-md">
            Gérez vos sélections et comparez jusqu'à 4 biens simultanément pour affiner votre choix d'investissement.
          </p>
        </div>
      </div>

      {/* ÉTAT VIDE */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-slate-200 border-dashed animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
            <IconPin />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun bien sauvegardé</h3>
          <p className="text-sm text-slate-500 max-w-md text-center mb-6">
            Vous n'avez pas encore ajouté de coups de cœur à votre liste. Parcourez notre catalogue pour découvrir nos offres exclusives.
          </p>
          <Link to="/client-dashboard" className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition shadow-sm">
            Explorer les propriétés
          </Link>
        </div>
      ) : (
        /* GRILLE DES FAVORIS */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((item) => {
            const projet = item.projet || {};
            // Extraction de l'image (si ton populate ramène un tableau d'images ou un string)
            const imageUrl = projet.images?.[0] || projet.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80";

            return (
              <div key={item._id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img src={imageUrl} alt={projet.titre} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  
                  {projet.statut && (
                     <div className="absolute top-3 left-3 flex flex-col gap-2">
                       <span className="bg-white/90 text-slate-800 px-2.5 py-1 rounded-sm text-[11px] font-semibold tracking-wide uppercase border border-slate-200/50 shadow-sm backdrop-blur-sm">
                         {projet.statut.replace('_', ' ')}
                       </span>
                     </div>
                  )}

                  <button
                    onClick={() => handleRemove(item._id)} // Suppression du favori
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-slate-400 hover:text-rose-600 transition shadow-sm"
                    title="Retirer des favoris"
                  >
                    <IconTrash />
                  </button>
                </div>

                {/* Contenu de la carte */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {projet.type ? projet.type.charAt(0).toUpperCase() + projet.type.slice(1) : 'Bien'} · {projet.ville || 'Ville inconnue'}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-slate-900 text-base leading-snug mb-1 line-clamp-2">
                    {projet.titre || 'Titre indisponible'}
                  </h3>
                  
                  <p className="text-lg font-bold text-slate-900 mt-2">
                    {(projet.prix ?? 0).toLocaleString()} MAD
                  </p>

                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => handleToggleCompare(item._id)}
                      className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        compareIds.includes(item._id)
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {compareIds.includes(item._id) ? '✓ Sélectionné pour analyse' : 'Comparer ce bien'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ANALYSE COMPARATIVE (TABLEAU) */}
      {selectedForComparison.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center gap-3">
            <div className="text-slate-400"><IconCompare /></div>
            <h3 className="font-bold text-slate-900 text-lg">Analyse comparative détaillée</h3>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
              <thead>
                <tr className="bg-white border-b border-slate-200">
                  <th className="p-5 text-slate-500 font-medium w-48 bg-slate-50/50">Critères d'évaluation</th>
                  {selectedForComparison.map((item) => (
                    <th key={item._id} className="p-5 font-bold text-slate-900 border-l border-slate-100 min-w-[200px] truncate max-w-[250px]">
                      {item.projet?.titre || 'Indisponible'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 text-slate-600 font-medium bg-slate-50/50">Prix de transaction</td>
                  {selectedForComparison.map((item) => (
                    <td key={item._id} className="p-5 font-bold text-slate-900 border-l border-slate-100">
                      {(item.projet?.prix ?? 0).toLocaleString()} MAD
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 text-slate-600 font-medium bg-slate-50/50">Localisation</td>
                  {selectedForComparison.map((item) => (
                    <td key={item._id} className="p-5 text-slate-700 border-l border-slate-100">
                      {item.projet?.ville || 'Inconnue'}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 text-slate-600 font-medium bg-slate-50/50">Superficie totale</td>
                  {selectedForComparison.map((item) => (
                    <td key={item._id} className="p-5 text-slate-700 border-l border-slate-100">
                      {item.projet?.surface ? `${item.projet.surface} m²` : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 text-slate-600 font-medium bg-slate-50/50">Distribution (Chambres)</td>
                  {selectedForComparison.map((item) => (
                    <td key={item._id} className="p-5 text-slate-700 border-l border-slate-100">
                      {item.projet?.nbChambres ? `${item.projet.nbChambres} Pièce(s)` : 'Non applicable'}
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