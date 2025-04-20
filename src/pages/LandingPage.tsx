import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Users, Shield, CheckCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/ui/Button';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <FileText className="h-8 w-8 text-primary-600" />,
      title: 'Secure Question Paper Management',
      description: 'Manage and distribute question papers securely with password protection and timed access.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: 'Expert Faculty Selection',
      description: 'Choose from a curated list of faculty members based on expertise and difficulty requirements.',
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: 'Quality Assurance',
      description: 'Robust review process ensures high-quality question papers that meet educational standards.',
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary-600" />,
      title: 'Streamlined Workflow',
      description: 'End-to-end process management from paper requests to delivery with automated notifications.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-800">QPMS</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#features" className="text-gray-600 hover:text-primary-700">Features</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-primary-700">About</a></li>
              <li><a href="#experts" className="text-gray-600 hover:text-primary-700">Our Experts</a></li>
            </ul>
          </nav>
          
          <div className="hidden space-x-4 md:flex">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-gray-200 bg-white px-4 py-4 md:hidden"
          >
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-primary-700">Features</a>
              <a href="#about" className="text-gray-600 hover:text-primary-700">About</a>
              <a href="#experts" className="text-gray-600 hover:text-primary-700">Our Experts</a>
              <div className="flex space-x-4 pt-2">
                <Link to="/login" className="w-full">
                  <Button variant="outline" fullWidth>Login</Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button fullWidth>Register</Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
              >
                Question Paper Management System
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 text-lg text-white/90 md:text-xl"
              >
                Streamline your educational institution's question paper creation and distribution with our secure, efficient platform.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <Link to="/register">
                  <Button variant="accent" size="lg">Get Started</Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </a>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center"
            >
              <img 
                src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Education Management" 
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Platform Features</h2>
            <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-600">
              Our comprehensive solution offers everything educational institutions need to manage their question paper lifecycle.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <img 
                src="https://images.pexels.com/photos/5428004/pexels-photo-5428004.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Mission" 
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <div className="flex flex-col justify-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl"
              >
                Our Mission
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 text-lg text-gray-600"
              >
                We strive to enhance academic integrity and efficiency through our innovative question paper management system. Our platform connects educational institutions with subject matter experts to ensure high-quality, secure, and timely delivery of examination materials.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-gray-600"
              >
                By streamlining the process from request to delivery, we help reduce administrative burden, eliminate potential leaks, and maintain the highest standards of academic assessment.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section id="experts" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Our Subject Experts</h2>
            <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-600">
              We partner with leading academics and professionals to deliver the highest quality question papers.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Dr. Samantha Lewis",
                role: "Mathematics, IIT Mumbai",
                image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800",
              },
              {
                name: "Prof. Michael Chen",
                role: "Computer Science, NIT Delhi",
                image: "https://images.pexels.com/photos/5684267/pexels-photo-5684267.jpeg?auto=compress&cs=tinysrgb&w=800",
              },
              {
                name: "Dr. Priya Sharma",
                role: "Physics, Central University",
                image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=800",
              }
            ].map((expert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-lg bg-white shadow-md"
              >
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  className="h-64 w-full object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-semibold">{expert.name}</h3>
                  <p className="text-gray-600">{expert.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Transform Your Paper Management?</h2>
            <p className="mb-8 max-w-2xl text-lg text-white/90">
              Join educational institutions across the country that trust our platform for secure and efficient question paper management.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link to="/register">
                <Button variant="accent" size="lg">Get Started Now</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <FileText className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold">QPMS</span>
              </div>
              <p className="text-gray-400">
                Secure, efficient question paper management for educational institutions.
              </p>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#experts" className="hover:text-white">Our Experts</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-semibold">User Types</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register" className="hover:text-white">Paper Setter</Link></li>
                <li><Link to="/register" className="hover:text-white">Paper Getter</Link></li>
                <li><Link to="/register" className="hover:text-white">Administrator</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>
              <address className="text-gray-400">
                <p>Educational Avenue</p>
                <p>Knowledge District</p>
                <p>Email: info@qpms.edu</p>
              </address>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Question Paper Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;