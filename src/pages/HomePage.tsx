import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, Check, Users, Shield, Award, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Logo from '../components/common/Logo';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Excellence in Education Through Secure Question Paper Management
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100">
                Join our platform to revolutionize the way question papers are created, 
                reviewed, and distributed. Ensuring quality, security, and efficiency 
                in educational assessment.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Get Started
                </Link>
                <a href="#mission" className="btn border border-white text-white hover:bg-white/10">
                  Our Mission
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <img 
                src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg" 
                alt="Education Excellence" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex justify-center mt-16"
          >
            <a 
              href="#mission" 
              className="text-white flex flex-col items-center animate-bounce"
            >
              <span className="mb-2">Learn More</span>
              <ArrowDown size={24} />
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section id="mission" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              At Gyaan-Kriti, we are committed to transforming educational assessment through a secure, 
              efficient, and quality-focused approach to question paper management. Our platform connects 
              educational institutions with subject matter experts to create, review, and deliver 
              high-quality assessment materials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="card p-6"
            >
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Shield size={24} className="text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Security First</h3>
              <p className="text-gray-600">
                Our platform employs state-of-the-art encryption and access control to ensure 
                that question papers remain confidential until the designated time.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="card p-6"
            >
              <div className="w-14 h-14 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                <Award size={24} className="text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Through our rigorous review process involving subject matter experts, we ensure 
                that all question papers meet the highest standards of educational assessment.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="card p-6"
            >
              <div className="w-14 h-14 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                <Users size={24} className="text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connecting Experts</h3>
              <p className="text-gray-600">
                We bridge the gap between educational institutions and subject matter experts, 
                creating a collaborative ecosystem that benefits all stakeholders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Services</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Discover how Gyaan-Kriti can transform your educational assessment process with our 
              comprehensive set of services designed for different stakeholders.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card overflow-hidden">
              <div className="bg-primary-500 text-white p-4">
                <h3 className="text-xl font-semibold">For Paper Setters</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Create high-quality question papers based on specific requirements</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Receive feedback from subject experts and improve your work</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Build your reputation through quality ratings and reviews</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Get compensated for your expertise and efforts</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/signup" className="btn btn-primary">Join as Paper Setter</Link>
                </div>
              </div>
            </div>
            
            <div className="card overflow-hidden">
              <div className="bg-secondary-500 text-white p-4">
                <h3 className="text-xl font-semibold">For Paper Getters</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Access a network of qualified paper setters for your exams</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Request question papers with specific requirements and difficulty levels</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Get quality-assured papers reviewed by subject experts</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Secure delivery of papers just before the exam time</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/signup" className="btn btn-secondary">Join as Paper Getter</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Flow Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">How It Works</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Our streamlined process ensures quality, security, and efficiency at every step.
            </p>
          </div>
          
          <div className="relative">
            {/* Process Steps */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-12 relative">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center md:space-x-8">
                <div className="md:w-1/2 md:text-right mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">Paper Request</h3>
                  <p className="text-gray-600">
                    Paper Getters submit requests with specific requirements, including subject, 
                    difficulty level, and exam date.
                  </p>
                </div>
                <div className="relative flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center">
                    1
                  </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0">
                  <img 
                    src="https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg" 
                    alt="Paper Request" 
                    className="rounded-lg shadow-md w-full md:w-3/4"
                  />
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-8">
                <div className="md:w-1/2 md:text-left mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">Expert Assignment</h3>
                  <p className="text-gray-600">
                    Qualified Paper Setters are matched based on expertise, experience, and ratings.
                  </p>
                </div>
                <div className="relative flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center">
                    2
                  </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 md:text-right">
                  <img 
                    src="https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg" 
                    alt="Expert Assignment" 
                    className="rounded-lg shadow-md w-full md:w-3/4 ml-auto"
                  />
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center md:space-x-8">
                <div className="md:w-1/2 md:text-right mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">Paper Creation</h3>
                  <p className="text-gray-600">
                    Paper Setters create high-quality question papers based on the provided specifications.
                  </p>
                </div>
                <div className="relative flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center">
                    3
                  </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0">
                  <img 
                    src="https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg" 
                    alt="Paper Creation" 
                    className="rounded-lg shadow-md w-full md:w-3/4"
                  />
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-8">
                <div className="md:w-1/2 md:text-left mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">Expert Review</h3>
                  <p className="text-gray-600">
                    Subject Experts review the paper for quality, accuracy, and adherence to requirements.
                  </p>
                </div>
                <div className="relative flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center">
                    4
                  </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 md:text-right">
                  <img 
                    src="https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg" 
                    alt="Expert Review" 
                    className="rounded-lg shadow-md w-full md:w-3/4 ml-auto"
                  />
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-center md:space-x-8">
                <div className="md:w-1/2 md:text-right mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">Secure Delivery</h3>
                  <p className="text-gray-600">
                    Papers are securely delivered to Paper Getters shortly before the exam time.
                  </p>
                </div>
                <div className="relative flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center">
                    5
                  </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0">
                  <img 
                    src="https://images.pexels.com/photos/3759059/pexels-photo-3759059.jpeg" 
                    alt="Secure Delivery" 
                    className="rounded-lg shadow-md w-full md:w-3/4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Review Committee Section */}
      <section id="team" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Review Committee</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Meet our team of expert reviewers who ensure the highest standards of quality in all question papers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="card overflow-hidden"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg" 
                  alt="Dr. Rajat Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. Rajat Sharma</h3>
                <p className="text-gray-500 mb-3">Ph.D. in Computer Science</p>
                <p className="text-gray-600 mb-3">
                  15+ years of experience in academia and research. Specializes in algorithm design and artificial intelligence.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Award size={16} className="mr-1" />
                  <span>Expert Reviewer since 2020</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="card overflow-hidden"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg" 
                  alt="Dr. Priya Mehta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. Priya Mehta</h3>
                <p className="text-gray-500 mb-3">Ph.D. in Mathematics</p>
                <p className="text-gray-600 mb-3">
                  12+ years in educational assessment design. Specializes in calculus, linear algebra, and statistics.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Award size={16} className="mr-1" />
                  <span>Expert Reviewer since 2019</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="card overflow-hidden"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg" 
                  alt="Prof. Amit Verma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Prof. Amit Verma</h3>
                <p className="text-gray-500 mb-3">Ph.D. in Electronics Engineering</p>
                <p className="text-gray-600 mb-3">
                  20+ years in technical education. Specializes in digital electronics, signal processing, and embedded systems.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Award size={16} className="mr-1" />
                  <span>Expert Reviewer since 2018</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/login" className="btn btn-outline">
              Join Our Expert Network
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Contact Us</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Have questions or need assistance? Get in touch with our team and we'll be happy to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 card p-6">
              <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="mr-4 text-primary-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Email Us</h4>
                    <p className="text-gray-600">contact@gyaan-kriti.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-4 text-primary-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Call Us</h4>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="mr-4 text-primary-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Visit Us</h4>
                    <p className="text-gray-600">
                      123 Academic Way, Education District<br />
                      Knowledge City, 500001
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-2">Working Hours</h4>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 1:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-3 card p-6">
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="label">Full Name</label>
                    <input type="text" id="name" className="input-field" placeholder="Your Name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">Email Address</label>
                    <input type="email" id="email" className="input-field" placeholder="Your Email" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="label">Subject</label>
                  <input type="text" id="subject" className="input-field" placeholder="Subject" />
                </div>
                
                <div>
                  <label htmlFor="message" className="label">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="input-field resize-none" 
                    placeholder="Your Message"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;