import { Link } from 'react-router-dom'

export default function HomePage() {
	return (
		<>
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
						<Link to="/fresher" className="btn-hero-primary">I'm Fresher</Link>
						<Link to="/job" className="btn-hero-secondary">I'm Skilled</Link>
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
		</>
	)
}
