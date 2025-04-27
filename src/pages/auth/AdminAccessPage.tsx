import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserCog, Users, ShieldCheck } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Logo from '../../components/common/Logo';

const AdminAccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    setTimeout(() => {
      if (option === 'admin') {
        navigate('/admin-login');
      } else if (option === 'subject-expert') {
        navigate('/subject-expert-login');
      } else if (option === 'super-user') {
        navigate('/super-user-login');
      }
    }, 300);
  };
  
  return (
    <>
      <Header />
      
      <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center">
        <div className="container max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-8"
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Logo className="h-12 w-12" />
              </div>
              <h1 className="text-2xl font-display font-bold text-gray-900">Admin Access Portal</h1>
              <p className="text-gray-600 mt-2">Select your role to continue</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3 max-w-3xl mx-auto">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect('admin')}
                className={`card p-6 cursor-pointer transition-all border-2 text-center ${
                  selectedOption === 'admin' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <UserCog size={32} className="text-primary-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">Admin</h3>
                <p className="text-sm text-gray-600">Manage users and system</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect('subject-expert')}
                className={`card p-6 cursor-pointer transition-all border-2 text-center ${
                  selectedOption === 'subject-expert' 
                    ? 'border-secondary-500 bg-secondary-50' 
                    : 'border-gray-200 hover:border-secondary-300'
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center">
                    <Users size={32} className="text-secondary-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">Subject Expert</h3>
                <p className="text-sm text-gray-600">Review question papers</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect('super-user')}
                className={`card p-6 cursor-pointer transition-all border-2 text-center ${
                  selectedOption === 'super-user' 
                    ? 'border-accent-500 bg-accent-50' 
                    : 'border-gray-200 hover:border-accent-300'
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center">
                    <ShieldCheck size={32} className="text-accent-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">Super User</h3>
                <p className="text-sm text-gray-600">System administration</p>
              </motion.div>
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
                Return to Home Page
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AdminAccessPage;