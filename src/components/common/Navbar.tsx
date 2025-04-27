import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const getDashboardLink = () => {
    if (!user) return '/';
    
    switch (user.role) {
      case 'paper_setter':
        return '/paper-setter';
      case 'paper_getter':
        return '/paper-getter';
      case 'admin':
        return '/admin';
      case 'subject_expert':
        return '/subject-expert';
      case 'super_user':
        return '/super-user';
      default:
        return '/';
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium hover:text-primary-500 transition-colors ${
              location.pathname === '/' ? 'text-primary-500' : 'text-gray-700'
            }`}
          >
            Home
          </Link>
          <a 
            href="#mission" 
            className="text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors"
          >
            Our Mission
          </a>
          <a 
            href="#services" 
            className="text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors"
          >
            Services
          </a>
          <a 
            href="#contact" 
            className="text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors"
          >
            Contact Us
          </a>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to={getDashboardLink()} className="btn btn-outline py-2 px-4">
                Dashboard
              </Link>
              <button onClick={logout} className="btn btn-primary py-2 px-4">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="btn btn-outline py-2 px-4">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary py-2 px-4">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg absolute left-0 right-0 top-full"
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-500 px-4 py-2"
              onClick={closeMenu}
            >
              Home
            </Link>
            <a
              href="#mission"
              className="text-gray-700 hover:text-primary-500 px-4 py-2"
              onClick={closeMenu}
            >
              Our Mission
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-primary-500 px-4 py-2"
              onClick={closeMenu}
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-primary-500 px-4 py-2"
              onClick={closeMenu}
            >
              Contact Us
            </a>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="text-primary-500 hover:bg-primary-50 px-4 py-2 rounded"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => { logout(); closeMenu(); }}
                  className="text-left text-error-500 hover:bg-error-50 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-primary-500 hover:bg-primary-50 px-4 py-2 rounded"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;