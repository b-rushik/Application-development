import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  FileText, 
  Clock, 
  DollarSign,
  Home,
  BookOpen
} from 'lucide-react';
import Logo from '../common/Logo';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Get the appropriate menu items based on user role
  const getMenuItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'paper_setter':
        return [
          { label: 'Dashboard', icon: <Home size={20} />, path: '/paper-setter' },
          { label: 'Personal Details', icon: <User size={20} />, path: '/paper-setter/personal-details' },
          { label: 'Updates', icon: <Bell size={20} />, path: '/paper-setter/updates' },
          { label: 'History', icon: <Clock size={20} />, path: '/paper-setter/history' },
          { label: 'Payment Status', icon: <DollarSign size={20} />, path: '/paper-setter/payment-status' },
        ];
      case 'paper_getter':
        return [
          { label: 'Dashboard', icon: <Home size={20} />, path: '/paper-getter' },
          { label: 'Request Paper', icon: <FileText size={20} />, path: '/paper-getter/request-paper' },
          { label: 'History', icon: <Clock size={20} />, path: '/paper-getter/history' },
          { label: 'Payment Status', icon: <DollarSign size={20} />, path: '/paper-getter/payment-status' },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', icon: <Home size={20} />, path: '/admin' },
          { label: 'Paper Setters', icon: <BookOpen size={20} />, path: '/admin/paper-setters' },
          { label: 'Paper Getters', icon: <FileText size={20} />, path: '/admin/paper-getters' },
          { label: 'Subject Experts', icon: <User size={20} />, path: '/admin/subject-experts' },
          { label: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
        ];
      case 'subject_expert':
        return [
          { label: 'Dashboard', icon: <Home size={20} />, path: '/subject-expert' },
          { label: 'Review History', icon: <Clock size={20} />, path: '/subject-expert/review-history' },
          { label: 'Payment Status', icon: <DollarSign size={20} />, path: '/subject-expert/payment-status' },
        ];
      case 'super_user':
        return [
          { label: 'Dashboard', icon: <Home size={20} />, path: '/super-user' },
          { label: 'Subject Experts', icon: <User size={20} />, path: '/super-user/subject-experts' },
          { label: 'User Database', icon: <FileText size={20} />, path: '/super-user/user-database' },
          { label: 'Settings', icon: <Settings size={20} />, path: '/super-user/settings' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container-custom py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="mr-4 md:hidden text-gray-600 focus:outline-none"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>
            <Logo />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                <Bell size={20} />
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="font-medium text-sm">{user?.name || 'User'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-gray-600 bg-opacity-75" onClick={closeSidebar}></div>
            <div className="relative bg-white w-64 h-full">
              <div className="p-4 border-b flex items-center justify-between">
                <Logo />
                <button onClick={closeSidebar} className="text-gray-600">
                  <X size={24} />
                </button>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.path}
                        className="flex items-center space-x-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 p-2 rounded-md"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(item.path);
                          closeSidebar();
                        }}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        closeSidebar();
                      }}
                      className="w-full flex items-center space-x-3 text-error-500 hover:bg-error-50 p-2 rounded-md"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r shadow-sm">
          <nav className="p-4 h-full">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="flex items-center space-x-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 p-2 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
              <li className="pt-4 mt-4 border-t">
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 text-error-500 hover:bg-error-50 p-2 rounded-md"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Gyaan-Kriti. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;