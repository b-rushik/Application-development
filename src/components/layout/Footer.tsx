import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import Logo from '../common/Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo className="h-8 w-8 text-white" />
              <span className="text-xl font-display font-semibold text-white">Gyaan Kriti</span>
            </div>
            <p className="text-sm leading-relaxed">
              Revolutionizing the way educational institutions create, manage, and distribute 
              question papers with our secure and efficient platform.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Mission', path: '/#mission' },
                { name: 'Services', path: '/#services' },
                { name: 'How It Works', path: '/#how-it-works' },
                { name: 'Review Committee', path: '/#committee' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronRight size={16} className="mr-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { name: 'Help Center', path: '/help' },
                { name: 'FAQs', path: '/faqs' },
                { name: 'Contact Support', path: '/contact' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronRight size={16} className="mr-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-primary-400 flex-shrink-0 mt-1" />
                <span>123 Education Street, Knowledge City, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-primary-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-primary-400 flex-shrink-0" />
                <span>info@gyaan-kriti.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section with Logo for Admin Access */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Link 
              to="/admin-access" 
              className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity"
              title="Admin Access"
            >
              <Logo className="h-6 w-6 text-white" />
            </Link>
            <span className="text-sm ml-4">
              &copy; {currentYear} Gyaan Kriti. All rights reserved.
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Legal Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;