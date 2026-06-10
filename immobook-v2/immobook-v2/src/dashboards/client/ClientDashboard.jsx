import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Overview from './pages/Overview';
import Favorites from './pages/Favorites';

function ClientDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Ha l'Sidebar fin t'7et les liens dial l'client */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">ImmoBook Client</h2>
        <Link to="/dashboard/client" className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition">
          🔍 Explorer les Biens
        </Link>
        <Link to="/dashboard/client/favorites" className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition">
          ❤️ Mes Favoris
        </Link>
        <Link to="/" className="mt-auto px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition">
          🚪 Déconnexion
        </Link>
      </aside>

      {/* 2. Ha l'blassa fin l'content dial les pages sghar gha y'tbeddel dynamic */}
      <main className="flex-1 p-8">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
        
        {/* L'Outlet kaykhli React Router y'gérer l'affichage inside */}
        <Outlet />
      </main>
    </div>
  );
}

export default ClientDashboard;