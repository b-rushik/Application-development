import React from 'react';
import Logo from '../common/Logo';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Logo size="lg" />
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              A secure platform for creating, distributing, and managing exam papers for educational institutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-primary-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-sm text-gray-600 hover:text-primary-600">
                  Paper Guidelines
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-sm text-gray-600 hover:text-primary-600">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-primary-600">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-gray-600 hover:text-primary-600">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} Gyaan Kriti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;