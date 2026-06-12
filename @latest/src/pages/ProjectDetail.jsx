import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

const ProjectDetail = () => {
  const { id } = useParams(); // Récupère l'ID du projet depuis l'URL
  const navigate = useNavigate();
  const { token, user } = useAuth();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirection de sécurité (si un malin tape l'URL sans être connecté)
  useEffect(() => {
    if (!token || user?.role !== 'client') {
      navigate('/login?role=client');
    }
  }, [token, user, navigate]);

  // Récupération des données du projet
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`);
        if (!response.ok) {
          throw new Error('Impossible de charger les détails du projet.');
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement du projet.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  // Actions du diagramme d'activité
  const handleReserve = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projetId: id, acompte: 0 }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || 'Échec de la réservation.');
      }

      alert('Réservation envoyée ! Le promoteur prendra contact avec vous.');
      navigate('/client-dashboard');
    } catch (err) {
      alert(err.message || 'Impossible de réserver ce projet.');
    }
  };

  const handleFavorite = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projetId: id }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || 'Impossible d’ajouter ce projet aux favoris.');
      }

      alert('Projet ajouté à vos favoris ❤️');
    } catch (err) {
      alert(err.message || 'Impossible d’ajouter ce projet aux favoris.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement des détails...</div>;
  if (!project) return <div>Projet introuvable</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* Navbar simplifiée pour la page détail */}
      <nav className="bg-white p-4 shadow-sm mb-8 flex justify-between items-center px-8">
        <div className="text-2xl font-bold text-blue-800 italic cursor-pointer" onClick={() => navigate('/')}>immobook</div>
        <button onClick={() => navigate('/client-dashboard')} className="text-blue-600 font-medium hover:underline">Mon Dashboard</button>
      </nav>

      <div className="max-w-5xl mx-auto px-4">
        {/* En-tête et Image */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8 border border-gray-200">
          <div className="h-96 bg-gray-200 relative">
            <img
              src={project.images?.[0]?.url || project.imageUrl || 'https://via.placeholder.com/800x400?text=Image+indisponible'}
              alt={project.titre}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full font-bold text-blue-800 shadow-lg">
              {project.statut || 'inconnu'}
            </div>
          </div>
          
          <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">{project.type || 'Type inconnu'}</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">Avancement: {project.progress ?? 0}%</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{project.titre}</h1>
              <p className="text-gray-500 mt-2">📍 {project.adresse || 'Adresse inconnue'}, {project.ville}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Prix de vente</p>
              <p className="text-4xl font-black text-blue-700">{(project.prix ?? 0).toLocaleString()} DH</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Détails techniques */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description du bien</h2>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-sm mb-1">Surface</p>
                  <p className="font-bold text-gray-900 text-lg">📐 {project.surface ?? project.area ?? 0} m²</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-sm mb-1">Pièces</p>
                  <p className="font-bold text-gray-900 text-lg">🛏️ {project.nbChambres ?? project.rooms ?? 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Panneau d'actions (Cœur du diagramme d'activité) */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              
              {/* Bouton Réserver */}
              <button 
                onClick={handleReserve}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 mb-3"
              >
                <span>📅</span> Demander une réservation
              </button>
              <p className="text-xs text-center text-gray-500 mb-6">Sans engagement. Le promoteur validera la disponibilité.</p>

              {/* Bouton Favoris */}
              <button 
                onClick={handleFavorite}
                className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-all flex items-center justify-center gap-2"
              >
                <span>❤️</span> Ajouter aux favoris
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;