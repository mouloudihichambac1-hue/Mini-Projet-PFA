import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Analytics from './pages/Analytics';
import AddProperty from './pages/AddProperty';

function PromoteurDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar khassa b l'Promoteur */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">ImmoBook Promoteur</h2>
        <Link to="/dashboard/promoteur" className="px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg font-medium transition">
          📊 Statistiques (Analytics)
        </Link>
        <Link to="/dashboard/promoteur/add-property" className="px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg font-medium transition">
          ➕ Ajouter un Bien
        </Link>
        <Link to="/" className="mt-auto px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition">
          🚪 Déconnexion
        </Link>
      </aside>

      {/* Content Area dyal l'Promoteur */}
      <main className="flex-1 p-8">
        <Routes>
          <Route index element={<Analytics />} />
          <Route path="add-property" element={<AddProperty />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  );
}

export default PromoteurDashboard;