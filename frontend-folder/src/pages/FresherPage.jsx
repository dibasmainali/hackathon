import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { careerAPI } from '../utils/api'

export default function FresherPage() {
	const [stepIndex, setStepIndex] = useState(0)
	const [answers, setAnswers] = useState({
		fullName: '',
		email: '',
		highestEducation: '',
		desiredField: '',
		interests: '',
	})
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()

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
		setError('')
		setSubmitting(true)
		;(async () => {
			try {
				const payload = {
					answer1: answers.fullName,
					answer2: answers.email,
					answer3: answers.highestEducation,
					answer4: answers.desiredField,
					answer5: answers.interests,
				}
				const suggestion = await careerAPI.suggestions(payload)
				try { localStorage.setItem('career_guidance', JSON.stringify({ suggestion, answers })) } catch { void 0 }
				navigate('/career-guidance', { state: { suggestion, answers } })
			} catch (err) {
				setError(err.message || 'Failed to get suggestions')
			} finally {
				setSubmitting(false)
			}
		})()
	}

	const questions = [
		{ key: 'fullName', label: 'Full Name', placeholder: 'e.g. Sita Sharma', type: 'text', required: true },
		{ key: 'email', label: 'Email', placeholder: 'e.g. sita@example.com', type: 'email', required: true },
		{ key: 'highestEducation', label: 'Highest Education', placeholder: 'e.g. BSc Computer Science', type: 'text', required: false },
		{ key: 'desiredField', label: 'Desired Field', placeholder: 'e.g. Frontend, Design, Marketing', type: 'text', required: false },
		{ key: 'interests', label: 'Top Interests/Skills', placeholder: 'e.g. React, UI, Content Writing', type: 'textarea', required: false },
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
								<button type="button" className="btn-secondary" onClick={back} disabled={stepIndex === 0 || submitting}>Back</button>
								{stepIndex < questions.length - 1 ? (
									<button type="button" className="btn-gradient" onClick={next} disabled={submitting}>Next</button>
								) : (
									<button type="submit" className="btn-gradient" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
								)}
							</div>
						</div>
					</form>
					{error && (
						<p className="error-text" role="alert">{error}</p>
					)}
				</div>
			</section>
		</>
	)
}
