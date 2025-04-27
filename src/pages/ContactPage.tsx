import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormInputs>();
  
  const onSubmit = async (data: ContactFormInputs) => {
    // In a real app, you would send the form data to your API
    console.log('Form submitted:', data);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Reset form after successful submission
    reset();
    
    // Show success message (in a real app, you'd use a toast or alert)
    alert('Your message has been sent. We will contact you soon!');
  };
  
  return (
    <>
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Reach out to our team using the form below or through our contact information.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1 space-y-8">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin size={24} className="mr-4 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Our Location</h3>
                      <p className="text-gray-600">123 Education Street, Knowledge City, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={24} className="mr-4 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Phone Number</h3>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail size={24} className="mr-4 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Email Address</h3>
                      <p className="text-gray-600">info@gyaan-kriti.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-6">Office Hours</h2>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="font-medium">Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className={`input ${errors.name ? 'border-error-500' : ''}`}
                        disabled={isSubmitting}
                        {...register('name', { 
                          required: 'Name is required' 
                        })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`input ${errors.email ? 'border-error-500' : ''}`}
                        disabled={isSubmitting}
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Please enter a valid email'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className={`input ${errors.subject ? 'border-error-500' : ''}`}
                      disabled={isSubmitting}
                      {...register('subject', { 
                        required: 'Subject is required' 
                      })}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-error-600">{errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`input ${errors.message ? 'border-error-500' : ''}`}
                      disabled={isSubmitting}
                      {...register('message', { 
                        required: 'Message is required',
                        minLength: {
                          value: 20,
                          message: 'Message must be at least 20 characters'
                        }
                      })}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-error-600">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-2.5 flex items-center justify-center"
                  >
                    <Send size={18} className="mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ContactPage;