import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Home from './pages/Home';
import Auth from './pages/Auth';
import RealityChecker from './pages/RealityChecker';
import Analyzer from './pages/Analyzer';
import SupplierConnector from './pages/SupplierConnector';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/auth" />;
};

function App() {
  const { user, loading } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/auth" element={<Auth />} />
        <Route 
          path="/checker" 
          element={
            <ProtectedRoute user={user} loading={loading}>
              <RealityChecker user={user} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analyzer" 
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Analyzer user={user} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/suppliers" 
          element={
            <ProtectedRoute user={user} loading={loading}>
              <SupplierConnector user={user} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Dashboard user={user} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
