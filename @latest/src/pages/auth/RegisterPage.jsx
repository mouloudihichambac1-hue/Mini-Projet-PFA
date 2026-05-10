import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  // Les états (variables) pour stocker ce que l'utilisateur tape
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client'); 
  const [companyName, setCompanyName] = useState(''); // Seulement pour les promoteurs
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const host = window.location.hostname;
      // On choisit la route selon le rôle sélectionné
      const endpoint = role === 'promoteur' ? 'promoters' : 'clients';
      const apiUrl = `http://${host}:4000/api/v1/${endpoint}/register`;

      // Préparation des données à envoyer
      const bodyData = {
        fullName,
        email,
        password,
        // On n'envoie companyName que si c'est un promoteur
        ...(role === 'promoteur' && { companyName })
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCÈS
        alert("Compte créé avec succès ! Connectez-vous.");
        navigate('/login'); 
      } else {
        // ERREUR SERVEUR (ex: email déjà utilisé)
        setError(data.message || "Une erreur est survenue lors de l'inscription.");
      }
    } catch (err) {
      // ERREUR RÉSEAU
      setError("Le serveur est injoignable. revien plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-lg border-t-8 border-blue-700">
        
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-blue-900 mb-2 italic cursor-pointer" onClick={() => navigate('/')}>
            immobook
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Créer un compte</h2>
          <p className="text-gray-500 text-sm mt-2">Rejoignez la plateforme immobilière de référence</p>
        </div>
        {error && (
            <div className="mb-6 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-bounce">
                <span className="font-bold">Opps :</span> {error}
            </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Choix du rôle (Boutons Radio stylés) */}
          <div className="flex gap-4 mb-6">
            <label className={`flex-1 p-3 text-center border-2 rounded-lg cursor-pointer transition-all ${role === 'client' ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-gray-200 text-gray-500 hover:border-blue-300'}`}>
              <input type="radio" name="role" value="client" className="hidden" checked={role === 'client'} onChange={() => setRole('client')} />
              👤 Client
            </label>
            <label className={`flex-1 p-3 text-center border-2 rounded-lg cursor-pointer transition-all ${role === 'promoteur' ? 'border-green-600 bg-green-50 text-green-700 font-bold' : 'border-gray-200 text-gray-500 hover:border-green-300'}`}>
              <input type="radio" name="role" value="promoteur" className="hidden" checked={role === 'promoteur'} onChange={() => setRole('promoteur')} />
              🏗️ Promoteur
            </label>
          </div>

          {/* Champ Nom Complet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom et Prénom</label>
            <input 
              type="text" required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
              placeholder="Ex: Hicham Mouloudi"
              value={fullName} onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Champ Conditionnel : Nom de l'entreprise (Uniquement si Promoteur) */}
          {role === 'promoteur' && (
            <div className="animate-fade-in-down">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
              <input 
                type="text" required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                placeholder="Ex: Immo Développement SARL"
                value={companyName} onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          )}

          {/* Champ Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
            <input 
              type="email" required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
              placeholder="votre@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input 
              type="password" required minLength="6"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
              placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Le mot de passe doit contenir au moins 6 caractères.</p>
          </div>

          {/* Bouton de validation */}
          <button 
          type="submit"
          disabled={loading}
            className={`w-full text-white font-bold py-3.5 rounded-lg shadow-lg transform active:scale-95 transition-all ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
            } ${role === 'promoteur' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {loading ? 'Création du compte...' : `S'inscrire en tant que ${role === 'promoteur' ? 'Promoteur' : 'Client'}`}
          </button>
        </form>

        {/* Lien de retour */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Vous avez déjà un compte ? <span onClick={() => navigate('/login/client')} className="text-blue-600 font-bold cursor-pointer hover:underline">Se connecter</span></p>
          <button onClick={() => navigate('/')}
        className="mt-12 text-gray-500 hover:text-gray-800 text-sm font-medium transition">
        ← Retour à l'accueil
      </button>
        </div>


      </div>
    </div>
  );
};

export default RegisterPage;