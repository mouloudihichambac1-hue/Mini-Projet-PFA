import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientDashboard from './dashboards/client/ClientDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/client/*" element={<ClientDashboard />} />
        </Routes>
    </Router>
  );
}

export default App;