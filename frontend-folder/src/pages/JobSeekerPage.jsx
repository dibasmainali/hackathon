import { useState } from 'react'

export default function JobSeekerPage() {
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
