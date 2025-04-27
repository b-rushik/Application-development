import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { 
  LayoutDashboard, FileText, History, CreditCard, UserCircle, 
  BellRing, LogOut, Menu, X, ChevronDown, Folder, Upload
} from 'lucide-react';
import Logo from '../../components/common/Logo';
import LoadingSpinner from '../../components/common/LoadingSpinner';

// Import sub-pages
import PaperSetterHome from './paper-setter/PaperSetterHome';
import PaperSetterPersonalDetails from './paper-setter/PaperSetterPersonalDetails';
import PaperSetterUpdates from './paper-setter/PaperSetterUpdates';
import PaperSetterHistory from './paper-setter/PaperSetterHistory';
import PaperSetterPayment from './paper-setter/PaperSetterPayment';

const PaperSetterDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await Auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Navigation links for the sidebar
  const navLinks = [
    { 
      name: 'Dashboard', 
      path: '/paper-setter',
      icon: <LayoutDashboard size={20} />
    },
    { 
      name: 'Personal Details', 
      path: '/paper-setter/personal-details',
      icon: <UserCircle size={20} />
    },
    { 
      name: 'Updates', 
      path: '/paper-setter/updates',
      icon: <BellRing size={20} />,
      badge: 2
    },
    { 
      name: 'History', 
      path: '/paper-setter/history',
      icon: <History size={20} />
    },
    { 
      name: 'Payment Status', 
      path: '/paper-setter/payment',
      icon: <CreditCard size={20} />
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center">
          <button
            type="button"
            className="mr-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/paper-setter" className="flex items-center">
            <Logo className="h-8 w-8" />
            <span className="ml-2 text-lg font-semibold text-gray-900">Gyaan Kriti</span>
          </Link>
        </div>
        
        <div className="relative">
          <button
            type="button"
            className="flex items-center text-gray-700 hover:text-gray-900"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
              PS
            </div>
            <ChevronDown size={16} className="ml-1" />
          </button>
          
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">John Smith</p>
                <p className="text-xs text-gray-500">john.smith@example.com</p>
              </div>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <Link to="/paper-setter" className="flex items-center">
              <Logo className="h-8 w-8" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Gyaan Kriti</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
                {link.badge && (
                  <span className="ml-auto inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              {isLoading ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      </aside>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <main className="lg:pl-64 pt-0 lg:pt-0">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<PaperSetterHome />} />
            <Route path="/personal-details" element={<PaperSetterPersonalDetails />} />
            <Route path="/updates" element={<PaperSetterUpdates />} />
            <Route path="/history" element={<PaperSetterHistory />} />
            <Route path="/payment" element={<PaperSetterPayment />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default PaperSetterDashboard;