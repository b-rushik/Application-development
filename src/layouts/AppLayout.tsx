import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, FileText, BarChart2, LogOut, Bell, Book, Clock, Settings, Users, ClipboardCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const AppLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine navigation based on user role
  const navItems = (() => {
    if (!user) return [];
    
    switch (user.role) {
      case 'paperSetter':
        return [
          { label: 'Dashboard', icon: <BarChart2 size={18} />, path: '/paper-setter' },
          { label: 'Personal Details', icon: <User size={18} />, path: '/paper-setter/personal-details' },
          { label: 'History', icon: <Clock size={18} />, path: '/paper-setter/history' },
          { label: 'Updates', icon: <Bell size={18} />, path: '/paper-setter/updates' },
          { label: 'Question Paper', icon: <FileText size={18} />, path: '/paper-setter/question-paper' },
        ];
      case 'paperGetter':
        return [
          { label: 'Dashboard', icon: <BarChart2 size={18} />, path: '/paper-getter' },
          { label: 'Request Paper', icon: <FileText size={18} />, path: '/paper-getter/request-paper' },
          { label: 'Select Faculty', icon: <Users size={18} />, path: '/paper-getter/select-faculty' },
          { label: 'Paper Status', icon: <ClipboardCheck size={18} />, path: '/paper-getter/paper-status' },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', icon: <BarChart2 size={18} />, path: '/admin' },
          { label: 'Manage Users', icon: <Users size={18} />, path: '/admin/manage-users' },
          { label: 'Evaluate Papers', icon: <FileText size={18} />, path: '/admin/evaluate-papers' },
        ];
      case 'superUser':
        return [
          { label: 'Dashboard', icon: <BarChart2 size={18} />, path: '/super-user' },
          { label: 'Subject Experts', icon: <Book size={18} />, path: '/super-user/experts' },
          { label: 'Paper Archives', icon: <FileText size={18} />, path: '/super-user/papers' },
          { label: 'User Management', icon: <Users size={18} />, path: '/super-user/users' },
          { label: 'Settings', icon: <Settings size={18} />, path: '/super-user/settings' },
        ];
      default:
        return [];
    }
  })();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-white md:flex md:flex-col">
        <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-primary-800">QPMS</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col p-4">
          <div className="mb-8 flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center rounded-md px-4 py-2 transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <Button 
              variant="outline" 
              fullWidth 
              className="justify-start" 
              icon={<LogOut size={18} />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 z-20 bg-black md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-y-0 left-0 z-30 w-64 flex-shrink-0 overflow-y-auto bg-white md:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
                <Link to="/" className="flex items-center space-x-2">
                  <FileText className="h-8 w-8 text-primary-600" />
                  <span className="text-xl font-bold text-primary-800">QPMS</span>
                </Link>
                <button 
                  onClick={toggleSidebar}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-1 flex-col p-4">
                <div className="mb-8 flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={toggleSidebar}
                      className={`flex items-center rounded-md px-4 py-2 transition-colors ${
                        location.pathname === item.path
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
                <div className="mt-auto">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    className="justify-start" 
                    icon={<LogOut size={18} />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleSidebar}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
            >
              <Menu size={20} />
            </button>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <div className="hidden flex-col text-right md:flex">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.role}</span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <User size={18} />
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;