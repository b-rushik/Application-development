import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Lock, BookOpen } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Lock size={24} className="text-primary-600" />,
      title: 'Secure Paper Distribution',
      description: 'Question papers are securely distributed with password protection and just-in-time delivery.',
    },
    {
      icon: <BookOpen size={24} className="text-primary-600" />,
      title: 'Expert Review Process',
      description: 'All papers undergo rigorous review by subject experts to ensure quality and standards.',
    },
    {
      icon: <CheckCircle size={24} className="text-primary-600" />,
      title: 'Quality Assurance',
      description: 'Comprehensive rating system ensures only the highest quality papers are approved.',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Streamline Your <span className="text-primary-600">Exam Paper</span> Management
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              A secure and efficient platform for creating, distributing, and managing exam papers for educational institutions.
            </motion.p>
            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link to="/register">
                <Button size="lg" className="mr-4">
                  Get Started
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Log In
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Gyaan Kriti?</h2>
            <p className="mt-4 text-xl text-gray-600">Our platform offers a comprehensive solution for exam paper management.</p>
          </div>
          
          <motion.div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                variants={item}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-50 mb-5 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 text-center mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">A simple, secure process for managing exam papers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Request Papers</h3>
                <p className="text-gray-600">Paper Getters request question papers by specifying subject, difficulty level and other requirements.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 transform -translate-y-1/2">
                <ArrowRight className="text-primary-300" size={32} />
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Create & Review</h3>
                <p className="text-gray-600">Expert Paper Setters create papers that undergo thorough review for quality assurance.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 transform -translate-y-1/2">
                <ArrowRight className="text-primary-300" size={32} />
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Secure Delivery</h3>
                <p className="text-gray-600">Approved papers are securely delivered to Paper Getters just in time for the exam.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-xl text-primary-100">Join our platform and revolutionize how you manage exam papers.</p>
          <div className="mt-8">
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;