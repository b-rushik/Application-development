import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/common/Logo';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4 border-b bg-white shadow-sm">
        <div className="container-custom">
          <Logo />
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <h1 className="text-9xl font-bold text-primary-500">404</h1>
          <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
      
      <div className="p-4 bg-white border-t">
        <div className="container-custom text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Gyaan-Kriti. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;