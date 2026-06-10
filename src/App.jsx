import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientDashboard from './dashboards/client/ClientDashboard';
import PromoteurDashboard from './dashboards/promoteur/PromoteurDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Page du choix du rôle*/}
        <Route path="/" element={
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Bienvenue sur ImmoBook v2</h1>
            <div className="flex gap-6">
              <Link to="/dashboard/client" className="px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition">
                Espace Client
              </Link>
              <Link to="/dashboard/promoteur" className="px-6 py-4 bg-emerald-600 text-white rounded-xl font-semibold shadow-md hover:bg-emerald-700 transition">
                Espace Promoteur
              </Link>
            </div>
          </div>
        } />

        {/* Les Routes des deux Dashboards */}
        <Route path="/dashboard/client/*" element={<ClientDashboard />} />
        <Route path="/dashboard/promoteur/*" element={<PromoteurDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;