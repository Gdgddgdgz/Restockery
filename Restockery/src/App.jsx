import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Forecast from './pages/Forecast';
import { LayoutDashboard, Package, Map, Bell, ArrowUpRight } from 'lucide-react';

const NavLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
          : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
        }`}
    >
      <Icon size={20} className={isActive ? 'text-white' : 'text-current'} />
      <span>{label}</span>
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex text-base selection:bg-indigo-100">
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '12px',
          },
        }} />

        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-slate-100 flex-shrink-0 fixed h-full z-20 flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.jpg" alt="Restockery Logo" className="h-10 w-10 object-contain rounded-xl shadow-sm" />
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">Restockery</span>
            </div>

            <nav className="space-y-2">
              <NavLink to="/" icon={LayoutDashboard} label="Smart Dashboard" />
              <NavLink to="/inventory" icon={Package} label="Inventory & Audit" />
              <NavLink to="/forecast" icon={Map} label="AI Forecast" />
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-slate-50">
            <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-4 rounded-2xl border border-indigo-100">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <Bell size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-indigo-900">System Active</h4>
                  <p className="text-xs text-indigo-700 mt-1">AI Agent scanning for demand shifts...</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">Hackathon Build v3.0</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 max-w-[1600px]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/forecast" element={<Forecast />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
