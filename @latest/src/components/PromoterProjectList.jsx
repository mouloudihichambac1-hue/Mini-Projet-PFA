import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

const PromoterProjectList = (onAddProjectClick,searchQuery) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // 1. Récupération des projets 
  useEffect(() => {
    const fetchPromoterProjects = async () => {
      try {
        const host = window.location.hostname;
        const res = await fetch(`http://${host}:4000/api/v1/projects`);
        
        if (!res.ok) throw new Error("Serveur injoignable");
        
        const data = await res.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.warn("Mode Démo activé (Projets chargés localement) :", error.message);
        
        // 🛡️ DONNÉES DE SECOURS STABLES
        setProjects([
          { 
            _id: 'p1', 
            title: 'Résidence Palmeraie', 
            location: 'Casablanca', 
            progress: 75, 
            imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80'
          },
          { 
            _id: 'p2', 
            title: 'Villa Anfa Moderne', 
            location: 'Casablanca', 
            progress: 95, 
            imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&q=80'
          },
          { 
            _id: 'p3', 
            title: 'Appartements Marina', 
            location: 'Rabat', 
            progress: 20, 
            imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80'
          }
        ]);
        setLoading(false);
      }
    };
    
    fetchPromoterProjects();
  }, []);
  const filteredProjects = projects.filter(project => 
      project.title.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
      (project.location || '').toLowerCase().includes((searchQuery || '').toLowerCase())
    );
  const handleProgressChange = async (projectId, newProgress) => {
    setUpdatingId(projectId);
    try {
      const host = window.location.hostname;
      
      const response = await fetch(`http://${host}:3000/api/v1/projects/${projectId}/progress`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ progressPercent: parseInt(newProgress) }),
      });

      if (response.ok) {
        
        setProjects(prevProjects =>
          prevProjects.map(p => p._id === projectId ? { ...p, progress: parseInt(newProgress) } : p)
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du progrès:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (!loading && projects.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-indigo-50/50 rounded-full flex items-center justify-center mb-6 border border-indigo-100">
          <Building2 className="w-12 h-12 text-[#3100b3]" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-3">Votre portefeuille est vide</h3>
        <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
          Vous n'avez pas encore publié de biens immobiliers. Ajoutez votre premier chantier pour commencer à attirer des acquéreurs et générer des réservations.
        </p>
        
        
        <button 
          type="button"
          onClick={() => {
            if (typeof onAddProjectClick === 'function') {
              onAddProjectClick();
            } else {
              console.warn("La fonction onAddProjectClick n'a pas été transmise par le composant parent.");
            }
          }}
          className="px-6 py-3 bg-[#3100b3] text-white font-bold rounded-xl shadow-md hover:bg-indigo-800 transition-all flex items-center gap-2 hover:-translate-y-0.5"
        >
          Créer mon premier projet
        </button>
      </div>
    );
  }

  // UX : Gestion de l'état vide (Empty State) pour les projets
  if (!loading && projects.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-indigo-50/50 rounded-full flex items-center justify-center mb-6 border border-indigo-100">
          <Building2 className="w-12 h-12 text-[#3100b3]" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-3">Votre portefeuille est vide</h3>
        <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
          Vous n'avez pas encore publié de biens immobiliers. Ajoutez votre premier chantier pour commencer à attirer des acquéreurs et générer des réservations.
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Optionnel : remonte en haut pour cliquer sur + Nouveau Projet
          className="px-6 py-3 bg-[#3100b3] text-white font-bold rounded-xl shadow-md hover:bg-indigo-800 transition-all flex items-center gap-2 hover:-translate-y-0.5"
        >
          Créer mon premier projet
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
      {/* En-tête du composant */}
      <div className="px-8 py-5 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-900">Statut des Projets Actifs</h2>
        <button className="text-slate-400 hover:text-slate-600 transition">
          <span className="text-xl">⋮</span>
        </button>
      </div>
      
      
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-y border-slate-100">
            <tr>
              <th className="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Projet</th>
              <th className="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Localisation</th>
              <th className="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Avancement</th>
              <th className="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Statut</th>
              <th className="px-8 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-center">Ajuster Progrès</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project._id} className="border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors">
                
                
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={project.imageUrl || 'https://via.placeholder.com/150?text=ImmoBook'} 
                      alt={project.title} 
                      className="w-12 h-12 rounded-lg object-cover shadow-sm border border-slate-200"
                    />
                    <span className="font-extrabold text-slate-900">{project.title}</span>
                  </div>
                </td>
                
                
                <td className="px-8 py-4 text-slate-500 text-sm font-medium">
                  {project.location || project.city || 'Non spécifiée'}
                </td>
                
                {/* Barre de Progression */}
                <td className="px-8 py-4">
                  <div className="w-40">
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
                      <span>{project.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#3100b3] h-full rounded-full transition-all duration-300" 
                        style={{ width: `${project.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </td>

                {/* Statut Badge */}
                <td className="px-8 py-4">
                  <span className={`px-3 py-1.5 text-[11px] font-bold rounded-full ${
                    (project.progress || 0) >= 90 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                    (project.progress || 0) >= 40 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 
                    'bg-slate-50 text-slate-700 border border-slate-200'
                  }`}>
                    {(project.progress || 0) >= 90 ? 'Finitions' : 
                     (project.progress || 0) >= 40 ? 'En construction' : 'Fondations'}
                  </span>
                </td>

                {/* Range Input */}
                <td className="px-8 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <input 
                      type="range" min="0" max="100"
                      disabled={updatingId === project._id}
                      value={project.progress || 0}
                      onChange={(e) => handleProgressChange(project._id, e.target.value)}
                      className="w-24 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#3100b3] disabled:opacity-50"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromoterProjectList;