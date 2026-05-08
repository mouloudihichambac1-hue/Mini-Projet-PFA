import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans p-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Bienvenue sur ImmoBook</h1>
        <p className="text-gray-600">Choisissez votre type de compte pour continuer</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Option Client */}
        <div 
          onClick={() => navigate('/login/client')}
          className="group bg-white p-10 rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-600 hover:shadow-xl transition-all cursor-pointer text-center"
        >
          <div className="text-6xl mb-6 transform group-hover:scale-110 transition">👤</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Espace Client</h2>
          <p className="text-gray-500 text-sm">Je souhaite suivre mes projets immobiliers et accéder à mes documents.</p>
        </div>

        {/* Option Promoteur */}
        <div 
          onClick={() => navigate('/login/promoteur')}
          className="group bg-white p-10 rounded-2xl shadow-sm border-2 border-transparent hover:border-green-600 hover:shadow-xl transition-all cursor-pointer text-center"
        >
          <div className="text-6xl mb-6 transform group-hover:scale-110 transition">🏗️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Espace Promoteur</h2>
          <p className="text-gray-500 text-sm">Je suis un professionnel et je souhaite gérer mes chantiers et mes clients.</p>
        </div>
      </div>

      <button 
        onClick={() => navigate('/')}
        className="mt-12 text-gray-500 hover:text-gray-800 text-sm font-medium transition"
      >
        ← Retour à l'accueil
      </button>
    </div>
  );
};

export default RoleSelection;