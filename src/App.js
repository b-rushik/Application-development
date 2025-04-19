import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Components
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Home from './pages/Home';

// Pages
import Login from './components/Auth/Login';
import PaperSetterDashboard from './pages/PaperSetter/Dashboard';
import PaperGetterDashboard from './pages/PaperGetter/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';
import SuperUserDashboard from './pages/SuperUser/Dashboard';
import NotFound from './components/Common/NotFound';

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Paper Setter Routes */}
              <Route 
                path="/paper-setter" 
                element={
                  <Authenticator>
                    <PaperSetterDashboard />
                  </Authenticator>
                } 
              />

              {/* Paper Getter Routes */}
              <Route 
                path="/paper-getter" 
                element={
                  <Authenticator>
                    <PaperGetterDashboard />
                  </Authenticator>
                } 
              />

              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <Authenticator>
                    <AdminDashboard />
                  </Authenticator>
                } 
              />

              {/* Super User Routes */}
              <Route 
                path="/super-user" 
                element={
                  <Authenticator>
                    <SuperUserDashboard />
                  </Authenticator>
                } 
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;