import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, CheckCircle, Users, FileCheck, Award, Clock } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HomePage: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    document.title = 'Gyaan Kriti - Revolutionizing Question Paper Management';
    
    // Scroll to hash if provided in URL
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  // Features section data
  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary-600" />,
      title: 'Expert Network',
      description: 'Connect with verified subject matter experts from top institutions across India.'
    },
    {
      icon: <FileCheck className="h-6 w-6 text-primary-600" />,
      title: 'Quality Assurance',
      description: 'Every question paper goes through a rigorous quality check process for excellence.'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-600" />,
      title: 'Timely Delivery',
      description: 'Our structured workflow ensures question papers are delivered well before deadlines.'
    },
    {
      icon: <Award className="h-6 w-6 text-primary-600" />,
      title: 'Secure Distribution',
      description: 'End-to-end encrypted paper distribution ensures complete confidentiality.'
    }
  ];
  
  // Committee members data
  const committeeMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      degree: 'Ph.D in Computer Science',
      experience: '15+ years in academia',
      specialty: 'Data Structures & Algorithms',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Dr. Priya Sharma',
      degree: 'Ph.D in Mathematics',
      experience: '12+ years in teaching',
      specialty: 'Applied Mathematics',
      image: 'https://images.pexels.com/photos/3783219/pexels-photo-3783219.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Prof. Anand Verma',
      degree: 'M.Tech, MBA',
      experience: '10+ years in IIT',
      specialty: 'Engineering Mechanics',
      image: 'https://images.pexels.com/photos/5212326/pexels-photo-5212326.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 via-white to-white pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                Revolutionizing Education
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
                Seamless Question Paper <span className="text-primary-600">Management</span> Platform
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Connect paper setters with educational institutions to create, review, and distribute high-quality 
                question papers through a secure and efficient platform.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/signup" className="btn-primary px-6 py-3">
                  Get Started
                </Link>
                <a href="#mission" className="btn-outline flex items-center gap-2">
                  Our Mission
                  <ChevronDown size={16} />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="https://images.pexels.com/photos/6238070/pexels-photo-6238070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Education platform" 
                className="rounded-lg shadow-xl w-full object-cover max-h-[500px]"
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-lg shadow-lg p-4 w-40 md:w-48">
                <div className="text-sm font-medium text-gray-600">Trusted by</div>
                <div className="text-2xl font-bold text-primary-600">100+</div>
                <div className="text-sm text-gray-500">Institutions</div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={24} className="text-gray-400" />
          </motion.div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section id="mission" className="section bg-white">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To revolutionize how educational institutions manage their examination process by providing a secure, 
              efficient, and transparent platform that connects qualified paper setters with institutions, 
              ensuring high-quality assessment materials while maintaining academic integrity.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="space-y-6 order-2 md:order-1">
              <h3 className="text-2xl font-display font-semibold text-gray-900">Why Choose Gyaan Kriti?</h3>
              <ul className="space-y-4">
                {[
                  'Access to verified experts from premier institutions',
                  'Quality assurance through multi-level review process',
                  'Secure paper handling with encryption and access controls',
                  'Transparent workflow with real-time status updates',
                  'Detailed verification and rating system for all contributors',
                  'Dedicated support throughout the examination cycle'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeInUp} 
                    className="flex items-start"
                  >
                    <CheckCircle size={22} className="text-success-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative order-1 md:order-2">
              <img
                src="https://images.pexels.com/photos/7092476/pexels-photo-7092476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Education mission"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-semibold">Elevating Education Standards</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Services/Features Section */}
      <section id="services" className="section bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for educational institutions and subject matter experts to 
              streamline the examination process from end to end.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="rounded-full bg-primary-50 w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How it Works Section */}
      <section id="how-it-works" className="section bg-white">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A streamlined process that ensures quality, security, and efficiency at every step
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {[
              {
                step: '01',
                title: 'Request & Requirements',
                description: 'Educational institutions submit requirements including subject, syllabus, and exam date.',
                color: 'bg-primary-500'
              },
              {
                step: '02',
                title: 'Expert Assignment',
                description: 'Based on requirements, the system matches with qualified paper setters from verified institutions.',
                color: 'bg-secondary-500'
              },
              {
                step: '03',
                title: 'Paper Creation & Review',
                description: 'The assigned expert creates the question paper, which undergoes a rigorous review by subject specialists.',
                color: 'bg-accent-500'
              },
              {
                step: '04',
                title: 'Secure Delivery',
                description: 'Approved papers are encrypted and securely delivered to institutions shortly before the examination.',
                color: 'bg-success-500'
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center mb-12 ${index !== 3 ? 'relative' : ''}`}
              >
                <div className={`${step.color} text-white rounded-full w-16 h-16 flex-shrink-0 flex items-center justify-center font-bold text-xl z-10`}>
                  {step.step}
                </div>
                
                <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 ${index % 2 === 0 ? 'md:ml-4' : 'md:mr-4'} flex-grow`}>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {index !== 3 && (
                  <div className="absolute left-8 top-16 w-0.5 h-16 bg-gray-300 hidden md:block" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Committee Section */}
      <section id="committee" className="section bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Our Review Committee</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experts who ensure the highest standards of quality in our question papers
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {committeeMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.degree}</p>
                  <div className="space-y-1 text-gray-600 text-sm">
                    <p>{member.experience}</p>
                    <p>Specialty: {member.specialty}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Transform Your Examination Process?</h2>
            <p className="text-lg opacity-90 mb-8">
              Join Gyaan Kriti today and experience a new standard of excellence in question paper management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="btn px-6 py-3 bg-white text-primary-700 hover:bg-gray-100">
                Create an Account
              </Link>
              <Link to="/contact" className="btn px-6 py-3 bg-transparent border border-white hover:bg-primary-700">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default HomePage;