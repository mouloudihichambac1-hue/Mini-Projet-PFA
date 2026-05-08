import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = ({ roleType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: Backend port 4000
    const mockUser = { name: "Utilisateur Test", role: roleType };
    login(mockUser, "fake-token");
    navigate(roleType === 'promoteur' ? '/promoteur-dashboard' : '/client-dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-blue-600">
        <div className="text-center mb-8">
          {/* Remplacement du logo par un titre stylé en attendant l'image */}
          <h1 className="text-3xl font-bold text-blue-900 mb-2 italic">immobook</h1>
          <h2 className="text-xl font-semibold text-gray-700">
            Connexion {roleType === 'promoteur' ? 'Promoteur' : 'Client'}
          </h2>
          <p className="text-gray-500 text-sm mt-2">Bienvenue dans votre espace immobilier</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email / Identifiant</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2 rounded" /> Se souvenir de moi
            </label>
            <a href="#" className="text-blue-600 hover:underline">Mot de passe oublié ?</a>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transform active:scale-95 transition-all shadow-lg"
          >
            Se Connecter
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          {roleType === 'promoteur' ? (
            <p>Pas encore partenaire ? <span className="text-blue-600 font-bold cursor-pointer">Créer un compte promoteur</span></p>
          ) : (
            <p>Nouveau sur ImmoBook ? <span className="text-blue-600 font-bold cursor-pointer">S'inscrire</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;