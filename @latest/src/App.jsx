import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import LandingPage from './pages/auth/LandingPage';
import RoleSelection from './pages/auth/RoleSelection';
// TODO: Créer ces composants plus tard pour les dashboards
const ClientDashboard = () => <div className="p-10">Bienvenue sur le Dashboard Client</div>;
const PromoterDashboard = () => <div className="p-10">Bienvenue sur l'Espace Promoteur</div>;

function App() {
  return (
    /* 1. On enveloppe tout avec le AuthProvider pour que le "cerveau" soit actif partout */
    <AuthProvider>
      <Router>
        <Routes>
          {/* La page d'accueil par défaut */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/choix-connexion" element={<RoleSelection />} />
          
          <Route path="/login/client" element={<LoginPage roleType="client" />} />
          <Route path="/login/promoteur" element={<LoginPage roleType="promoteur" />} />

          <Route path="*" element={<Navigate to="/login/client" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;