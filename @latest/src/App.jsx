import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import LandingPage from './pages/auth/LandingPage';
import RegisterPage from './pages/auth/RegisterPage';
import PromoterDashboard from './pages/dashboards/PromoterDashboard';
import CreateAppointment from './pages/dashboards/CreateAppointment';

const ClientDashboard = () => <div className="p-10">Bienvenue sur le Dashboard Client</div>;
const PrivateRoute = ({ children, allowedRole }) => {
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
        
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/promoteur-dashboard" element={<PromoterDashboard />} />

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