import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
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
						<li><Link to="/">Home</Link></li>
						<li><Link to="/job">Job Seekers</Link></li>
						<li><a href="#companies">Companies</a></li>
						<li><a href="#career-guide">Career Guide</a></li>
					</ul>
					<div className="nav-actions">
						<Link to="/login" className="btn-secondary">Sign In</Link>
						<Link to="/signup" className="btn-primary">Get Started</Link>
					</div>
				</div>
			</nav>

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/job" element={<JobSeekerPage />} />
				<Route path="/fresher" element={<FresherPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
			</Routes>

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

function HomePage() {
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

function JobSeekerPage() {
	const [answers, setAnswers] = useState({
		fullName: '',
		email: '',
		desiredRole: '',
		yearsOfExperience: '',
		preferredLocation: '',
		skills: '',
	})

	function updateAnswer(field, value) {
		setAnswers(prev => ({ ...prev, [field]: value }))
	}

	function handleSubmit(e) {
		e.preventDefault()
		// For now, just log the object. Ready to POST to backend later.
		console.log('Job Seeker Answers:', answers)
		alert('Your responses have been captured in an object. Check console.')
	}

	return (
		<>
			<section className="hero">
				<div className="hero-content">
					<h1 className="hero-title">
						Tell Us About
						<span className="gradient-text"> You</span>
					</h1>
					<p className="hero-subtitle">
						Answer a few quick questions to personalize your career journey
					</p>
				</div>
			</section>

			<section className="features questionnaire">
				<div className="container">
					<h2 className="section-title">Job Seeker Questionnaire</h2>
					<form onSubmit={handleSubmit}>
						<div className="question-card">
							<label htmlFor="fullName">Full Name</label>
							<input id="fullName" type="text" placeholder="e.g. Sita Sharma" value={answers.fullName} onChange={(e) => updateAnswer('fullName', e.target.value)} required />
						</div>

						<div className="question-card">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" placeholder="e.g. sita@example.com" value={answers.email} onChange={(e) => updateAnswer('email', e.target.value)} required />
						</div>

						<div className="question-card">
							<label htmlFor="desiredRole">Desired Role</label>
							<input id="desiredRole" type="text" placeholder="e.g. Frontend Developer" value={answers.desiredRole} onChange={(e) => updateAnswer('desiredRole', e.target.value)} />
						</div>

						<div className="question-card">
							<label htmlFor="yearsOfExperience">Years of Experience</label>
							<input id="yearsOfExperience" type="number" min="0" step="0.5" placeholder="e.g. 2" value={answers.yearsOfExperience} onChange={(e) => updateAnswer('yearsOfExperience', e.target.value)} />
						</div>

						<div className="question-card">
							<label htmlFor="preferredLocation">Preferred Location</label>
							<input id="preferredLocation" type="text" placeholder="e.g. Kathmandu" value={answers.preferredLocation} onChange={(e) => updateAnswer('preferredLocation', e.target.value)} />
						</div>

						<div className="question-card">
							<label htmlFor="skills">Key Skills</label>
							<textarea id="skills" placeholder="e.g. React, Node.js, Figma" rows={4} value={answers.skills} onChange={(e) => updateAnswer('skills', e.target.value)} />
						</div>

						<div className="question-actions">
							<button type="submit" className="btn-primary">Submit</button>
						</div>
					</form>
				</div>
			</section>
		</>
	)
}

export default App

function FresherPage() {
	const [stepIndex, setStepIndex] = useState(0)
	const [answers, setAnswers] = useState({
		fullName: '',
		email: '',
		highestEducation: '',
		desiredField: '',
		interests: '',
	})

	function update(field, value) {
		setAnswers(prev => ({ ...prev, [field]: value }))
	}

	function next() {
		setStepIndex(i => Math.min(i + 1, questions.length - 1))
	}

	function back() {
		setStepIndex(i => Math.max(i - 1, 0))
	}

	function submit(e) {
		e.preventDefault()
		console.log('Fresher Answers:', answers)
		alert('Fresher responses captured. Check console for the object.')
	}

	const questions = [
		{
			key: 'fullName',
			label: 'Full Name',
			placeholder: 'e.g. Sita Sharma',
			type: 'text',
			required: true,
		},
		{
			key: 'email',
			label: 'Email',
			placeholder: 'e.g. sita@example.com',
			type: 'email',
			required: true,
		},
		{
			key: 'highestEducation',
			label: 'Highest Education',
			placeholder: 'e.g. BSc Computer Science',
			type: 'text',
			required: false,
		},
		{
			key: 'desiredField',
			label: 'Desired Field',
			placeholder: 'e.g. Frontend, Design, Marketing',
			type: 'text',
			required: false,
		},
		{
			key: 'interests',
			label: 'Top Interests/Skills',
			placeholder: 'e.g. React, UI, Content Writing',
			type: 'textarea',
			required: false,
		},
	]

	const current = questions[stepIndex]
	const percent = Math.round(((stepIndex + 1) / questions.length) * 100)

	return (
		<>
			<section className="hero">
				<div className="hero-content">
					<h1 className="hero-title">
						Tell Us About
						<span className="gradient-text"> You</span>
					</h1>
					<p className="hero-subtitle">
						Answer a few quick questions to personalize your journey
					</p>
				</div>
			</section>

			<section className="features questionnaire">
				<div className="container">
					<div className="progress-header">
						<span>Question {stepIndex + 1} of {questions.length}</span>
						<span>{percent}%</span>
					</div>
					<div className="progress-track" aria-hidden="true">
						<div className="progress-fill" style={{ width: `${percent}%` }} />
					</div>

					<form onSubmit={submit}>
						<div className="question-card fresher-card">
							<label htmlFor={current.key}>{current.label}</label>
							{current.type === 'textarea' ? (
								<textarea
									id={current.key}
									rows={4}
									placeholder={current.placeholder}
									value={answers[current.key]}
									onChange={(e) => update(current.key, e.target.value)}
								/>
							) : (
								<input
									id={current.key}
									type={current.type}
									placeholder={current.placeholder}
									value={answers[current.key]}
									onChange={(e) => update(current.key, e.target.value)}
									{...(current.required ? { required: true } : {})}
								/>
							)}

							<div className="question-actions">
								<button type="button" className="btn-secondary" onClick={back} disabled={stepIndex === 0}>Back</button>
								{stepIndex < questions.length - 1 ? (
									<button type="button" className="btn-gradient" onClick={next}>Next</button>
								) : (
									<button type="submit" className="btn-gradient">Submit</button>
								)}
							</div>
						</div>
					</form>
				</div>
			</section>
		</>
	)
}

