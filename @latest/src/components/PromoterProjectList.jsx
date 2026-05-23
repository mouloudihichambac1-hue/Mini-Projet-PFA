import React, { useState, useEffect } from 'react';

const PromoterProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // 1. Récupération des projets 
  useEffect(() => {
    const fetchPromoterProjects = async () => {
      try {
        const host = window.location.hostname;
        // On cible l'API globale (ou un endpoint filtré par token si disponible en back)
        // ex:const response = await fetch(`http://${host}:4000/api/v1/projects`);
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur récupération projets promoteur:", error);
        setLoading(false);
      }
    };
    fetchPromoterProjects();
  }, []);

  // 2. Logique UML : Changement dynamique du progrès (Diagramme de séquence)
  const handleProgressChange = async (projectId, newProgress) => {
    setUpdatingId(projectId);
    try {
      const host = window.location.hostname;
      // Appel PATCH conformément au diagramme de séquence pour mettre à jour la BDD et notifier via Socket.IO
      const response = await fetch(`http://${host}:4000/api/v1/projects/${projectId}/progress`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` -> à ajouter si ton back l'exige déjà
        },
        body: JSON.stringify({ progressPercent: parseInt(newProgress) }),
      });

      if (response.ok) {
        // Mise à jour de l'état local pour rafraîchir la barre de progression instantanément
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3100b3]"></div>
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
      
      {/* Vue en Tableau de ton Thème */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Projet</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Localisation</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Avancement</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Ajuster Progrès</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-slate-50 transition">
                
                {/* Image miniature + Titre */}
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={project.imageUrl || 'https://via.placeholder.com/150?text=ImmoBook'} 
                      alt={project.title} 
                      className="w-12 h-12 rounded-lg object-cover shadow-sm border border-slate-200"
                    />
                    <span className="font-bold text-slate-900">{project.title}</span>
                  </div>
                </td>
                
                {/* Localisation */}
                <td className="px-8 py-4 text-slate-600 font-medium">
                  {project.location || project.city || 'Non spécifiée'}
                </td>
                
                {/* Barre de Progression Interactive */}
                <td className="px-8 py-4">
                  <div className="w-40">
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
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

                {/* Statut Métier  */}
                <td className="px-8 py-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    (project.progress || 0) >= 90 ? 'bg-emerald-100 text-emerald-800' : 
                    (project.progress || 0) >= 40 ? 'bg-amber-100 text-amber-800' : 
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {(project.progress || 0) >= 90 ? 'Finitions' : 
                     (project.progress || 0) >= 40 ? 'En construction' : 'Fondations'}
                  </span>
                </td>

                {/* Range Input pour modifier le progrès en direct (Diagramme de Séquence) */}
                <td className="px-8 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="100"
                      disabled={updatingId === project._id}
                      value={project.progress || 0}
                      onChange={(e) => handleProgressChange(project._id, e.target.value)}
                      className="w-24 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#3100b3] disabled:opacity-50"
                    />
                    {updatingId === project._id && (
                      <span className="text-xs text-slate-400 animate-pulse">💾</span>
                    )}
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