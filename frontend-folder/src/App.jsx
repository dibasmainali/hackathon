import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h2>CareerBridge</h2>
            <span className="tagline">Nepal</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home" onClick={() => setActiveTab('home')}>Home</a></li>
            <li><a href="#job-seekers" onClick={() => setActiveTab('job-seekers')}>Job Seekers</a></li>
            <li><a href="#companies" onClick={() => setActiveTab('companies')}>Companies</a></li>
            <li><a href="#career-guide" onClick={() => setActiveTab('career-guide')}>Career Guide</a></li>
          </ul>
          <div className="nav-actions">
            <button className="btn-secondary">Sign In</button>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Bridge Your Way to
            <span className="gradient-text"> Success</span>
          </h1>
          <p className="hero-subtitle">
            Empowering Nepali youth with the skills, guidance, and opportunities 
            they need to launch their careers
          </p>
          <div className="hero-cta">
            <button className="btn-hero-primary">I'm Job Seeker</button>
            <button className="btn-hero-secondary">I'm Hiring</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <h3>500+</h3>
              <p>Active Jobs</p>
            </div>
            <div className="stat">
              <h3>2,000+</h3>
              <p>Job Seekers</p>
            </div>
            <div className="stat">
              <h3>150+</h3>
              <p>Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose CareerBridge?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Career Guidance</h3>
              <p>
                Get personalized career advice and roadmap tailored to your 
                interests and goals. Perfect for students and fresh graduates.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>Resume Builder</h3>
              <p>
                Build a professional resume that stands out to employers. 
                Templates designed for Nepali job market.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Job Matching</h3>
              <p>
                Smart job recommendations based on your skills and preferences. 
                Connect with the right opportunities.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3>Company Portal</h3>
              <p>
                Post jobs, find candidates, and grow your team. Simple and 
                efficient hiring process for companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Profile</h3>
              <p>Sign up and tell us about your skills, interests, and career goals</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get Guidance</h3>
              <p>Receive personalized career advice and build your professional resume</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Find Opportunities</h3>
              <p>Browse job openings and get matched with relevant positions</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Apply & Grow</h3>
              <p>Apply to jobs, attend interviews, and kickstart your career</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Explore Opportunities</h2>
          <div className="categories-grid">
            <div className="category-card">
              <h3>Technology</h3>
              <p>Software, IT, Web Development</p>
              <span className="job-count">150+ jobs</span>
            </div>
            <div className="category-card">
              <h3>Finance</h3>
              <p>Accounting, Banking, Investments</p>
              <span className="job-count">80+ jobs</span>
            </div>
            <div className="category-card">
              <h3>Marketing</h3>
              <p>Digital, Content, Social Media</p>
              <span className="job-count">100+ jobs</span>
            </div>
            <div className="category-card">
              <h3>Education</h3>
              <p>Teaching, Training, Research</p>
              <span className="job-count">60+ jobs</span>
            </div>
            <div className="category-card">
              <h3>Healthcare</h3>
              <p>Medical, Nursing, Administration</p>
              <span className="job-count">70+ jobs</span>
            </div>
            <div className="category-card">
              <h3>Design</h3>
              <p>Graphic, UI/UX, Creative</p>
              <span className="job-count">90+ jobs</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Career Journey?</h2>
          <p>Join thousands of Nepali youth who are building their future with CareerBridge</p>
          <button className="btn-cta">Create Free Account</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>CareerBridge Nepal</h3>
              <p>Empowering the next generation of Nepali professionals</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="LinkedIn">💼</a>
                <a href="#" aria-label="Instagram">📷</a>
              </div>
            </div>
            <div className="footer-section">
              <h4>For Job Seekers</h4>
              <ul>
                <li><a href="#">Browse Jobs</a></li>
                <li><a href="#">Career Guide</a></li>
                <li><a href="#">Resume Builder</a></li>
                <li><a href="#">Skill Assessment</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>For Companies</h4>
              <ul>
                <li><a href="#">Post a Job</a></li>
                <li><a href="#">Find Candidates</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Success Stories</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 CareerBridge Nepal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
