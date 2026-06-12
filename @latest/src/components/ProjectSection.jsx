import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { API_BASE_URL } from '../../config/api';
const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth(); // On vérifie si l'utilisateur est connecté via le context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = `${API_BASE_URL}/projects`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Erreur API Projets:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    if (!user) {
      // Si l'utilisateur n'est pas connecté, on le redirige vers le login
      alert("Veuillez vous connecter pour accéder aux détails du projet.");
      navigate('/login?role=client');
    } else {
      // Si connecté, on va vers la page de détails 
      navigate(`/project/${projectId}`);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Projets à la une</h2>
            <p className="text-gray-500 mt-2">Découvrez les meilleures opportunités immobilières sélectionnées pour vous.</p>
          </div>
          <button className="text-blue-700 font-bold hover:underline text-sm">Voir tout →</button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
              {/* Image avec Overlay Type */}
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={project.imageUrl || 'https://via.placeholder.com/400x300?text=ImmoBook'} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-800 shadow-sm">
                  {project.type === 'Achat' ? '🏠 À Vendre' : '🔑 À Louer'}
                </div>
              </div>

              {/* Contenu technique du projet */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                  <p className="text-blue-700 font-black">{project.price.toLocaleString()} DH</p>
                </div>
                
                <p className="text-gray-500 text-sm flex items-center gap-2 mb-6">
                  <span className="grayscale">📍</span> {project.location}
                </p>

                {/* Barre de progression */}
                <div className="space-y-2 mb-8">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-400 uppercase tracking-wider">Construction</span>
                    <span className="text-blue-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <button 
                  onClick={() => handleProjectClick(project._id)}
                  className="w-full py-3 bg-gray-50 text-gray-900 font-bold rounded-xl group-hover:bg-blue-700 group-hover:text-white transition-all border border-gray-200 group-hover:border-blue-700"
                >
                  Détails du projet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;