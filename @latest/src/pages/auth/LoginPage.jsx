import React, { useState ,useEffect} from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('client'); // État pour gérer le choix du rôle
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleFromUrl = params.get('role');
    
    if (roleFromUrl === 'promoteur' || roleFromUrl === 'client') {
      setRole(roleFromUrl);
    }
    
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    setError(''); 

    try {
      // 1. Définition dynamique de l'URL selon le rôle
      const host = window.location.hostname;
      const endpoint = role === 'promoteur' ? 'promoters' : 'clients';
      const apiUrl = `http://${host}:4000/api/v1/login/${endpoint}`;

      // 2. Envoi de la requête POST au serveur
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // 3. Vérification de la réponse
      if (response.ok) {
        
        const userData = {
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          role: role,
        };

        // On enregistre dans le contexte global (localStorage + state)
        login(userData, data.token);

        navigate(role === 'promoteur' ? '/promoteur-dashboard' : '/client-dashboard');
      } else {
        setError(data.message || "Identifiants ou mots de passe incorrects. Veuillez réessayer.");
      }
    } catch (err) {
      // ERREUR RÉSEAU 
      setError("Impossible de joindre le serveur.");
      console.error("Erreur de connexion:", err);
    }
  };
  /* Simulation pour le test sans backend

    const mockUser = { name: "Utilisateur Test", role: role };
    login(mockUser, "fake-token");
    
    navigate(role === 'promoteur' ? '/promoteur-dashboard' : '/client-dashboard');
  };
  */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-blue-600">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2 italic cursor-pointer" onClick={() => navigate('/')}>
            immobook
          </h1>
          <h2 className="text-xl font-semibold text-gray-700">Connexion</h2>
          <p className="text-gray-500 text-sm mt-2">Bienvenue dans votre espace immobilier</p>
        </div>

        {/* --- SÉLECTEUR DE RÔLE */}
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => setRole('client')}
            className={`flex-1 p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
              role === 'client' 
              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' 
              : 'border-gray-100 text-gray-400 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl">👤</span>
            <span className="text-xs font-bold">Client</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('promoteur')}
            className={`flex-1 p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
              role === 'promoteur' 
              ? 'border-green-600 bg-green-50 text-green-700 shadow-md' 
              : 'border-gray-100 text-gray-400 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl">🏗️</span>
            <span className="text-xs font-bold">Promoteur</span>
          </button>
        </div>
        {/* Affichage des l'erreurs */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-bounce">
            <span className="font-bold">Erreur :</span> {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email / Identifiant</label>
            <input 
              type="email" required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input 
              type="password" required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> 
              Se souvenir de moi
            </label>
            <a href="#" className="text-blue-600 hover:underline font-medium">Mot de passe oublié ?</a>
          </div>

          <button 
            type="submit"
            className={`w-full text-white font-bold py-3.5 rounded-xl shadow-lg transform active:scale-95 transition-all ${
              role === 'promoteur' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Se Connecter en tant que {role === 'promoteur' ? 'Promoteur' : 'Client'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            {role === 'promoteur' ? "Pas encore partenaire ?" : "Nouveau sur ImmoBook ?"} 
            <span onClick={() => navigate('/register')} className="text-blue-600 font-bold cursor-pointer hover:underline ml-1">
              {role === 'promoteur' ? "Créer un compte promoteur" : "S'inscrire"}
            </span>
          </p>
          
          <button 
            onClick={() => navigate('/')}
            className="mt-8 text-gray-400 hover:text-gray-600 text-xs font-medium transition flex items-center justify-center gap-1 mx-auto"
          >
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;