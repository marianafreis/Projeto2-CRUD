import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Cadastro } from '../pages/Cadastro';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { AuthProvider, AuthContext } from '../contexts/auth';
import { useContext } from 'react';

export const AppRouter = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>
    }

    if (!authenticated) {
      return <Navigate to="/" />
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/cadastro" exact element={<Cadastro />} />
          <Route
            path="/dashboard"
            exact
            element={
              <Private>
                <Dashboard />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}