import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StockDashboard from './pages/StockDashboard';
import GoalSimulator from './pages/GoalSimulator'; // Add this import
import './index.css';

function App() {
  return (
    <Router>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-indigo-700 text-center mb-6">
          📈 DistrictD Lite
        </h1>

        {/* Navigation */}
        <nav className="text-center mb-4">
          <Link to="/" className="mx-3 text-indigo-700 font-semibold hover:underline">Dashboard</Link>
          <Link to="/goal" className="mx-3 text-indigo-700 font-semibold hover:underline">Wealth Goal Simulator</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<StockDashboard />} />
          <Route path="/goal" element={<GoalSimulator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
