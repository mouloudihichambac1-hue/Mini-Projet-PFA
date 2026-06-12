import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/auth/RegisterPage';
import PromoterDashboard from './pages/dashboards/PromoterDashboard';
import CreateAppointment from './pages/dashboards/CreateAppointment';
import ClientDashboard from './pages/dashboards/client/ClientDashboard';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
const PrivateRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
  
    <AuthProvider>
      <Router>
        <Routes>
          {/* La page d'accueil par défaut */}
          <Route path="/" element={<LandingPage />} />

         
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        
          <Route path="/client-dashboard/*" element={<ClientDashboard />} />
          <Route path="/promoteur-dashboard" element={<PromoterDashboard />} />

          <Route path="/verify-email" element={<VerifyEmailPage />} />
        
          <Route 
            path="/promoteur-dashboard/create-appointment/:reservationId" element={
              <PrivateRoute allowedRole="promoteur">
                <CreateAppointment />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;