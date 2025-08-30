import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <nav className="top-nav">
              <Link to="/" className="brand">MHD</Link>
            </nav>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
          </header>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
