import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Header />
      
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
        <div className="container max-w-lg mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-error-100 flex items-center justify-center">
              <AlertTriangle size={40} className="text-error-500" />
            </div>
          </div>
          
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6">Page Not Found</h2>
          
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center btn-primary px-6 py-3"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFoundPage;