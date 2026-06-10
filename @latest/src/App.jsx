import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import LandingPage from './pages/auth/LandingPage';
import RegisterPage from './pages/auth/RegisterPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';

const ClientDashboard = () => <div className="p-10">Bienvenue sur le Dashboard Client</div>;
const PromoterDashboard = () => <div className="p-10">Bienvenue sur l'Espace Promoteur</div>;

function App() {
  return (
  
    <AuthProvider>
      <Router>
        <Routes>
          {/* La page d'accueil par défaut */}
          <Route path="/" element={<LandingPage />} />

         
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/promoteur-dashboard" element={<PromoterDashboard />} />

          <Route path="/verify-email" element={<VerifyEmailPage />} />
      
          {/* Redirection pour les routes non définies */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;