import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <section className="hero-section">
          <h1>Welcome to Question Paper Management System</h1>
          <p>Streamlining the process of creating and managing examination papers</p>
          <div className="cta-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
          </div>
        </section>

        <section className="features-section">
          <h2>Our Mission</h2>
          <p>To provide a secure, efficient platform for academic institutions to manage their examination paper workflow with transparency and quality control.</p>
          
          <h2>Key Features</h2>
          <ul className="features-list">
            <li>Secure paper creation and distribution</li>
            <li>Expert review system</li>
            <li>Role-based access control</li>
            <li>Deadline tracking</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;