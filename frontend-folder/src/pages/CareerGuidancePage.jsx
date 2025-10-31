import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { careerAPI } from '../utils/api'

export default function CareerGuidancePage() {
	const location = useLocation()
	let stateData = location.state
	if (!stateData) {
		try { const s = localStorage.getItem('career_guidance'); if (s) stateData = JSON.parse(s) } catch { void 0 }
	}
	const suggestion = stateData?.suggestion
	const answers = stateData?.answers
	const [resources, setResources] = useState([])
	const [resLoading, setResLoading] = useState(false)
	const [resError, setResError] = useState('')
	const [topic, setTopic] = useState(answers?.desiredField || '')
	const [duration, setDuration] = useState('8 weeks')
	const [roadmap, setRoadmap] = useState(null)
	const [rmLoading, setRmLoading] = useState(false)
	const [rmError, setRmError] = useState('')

	const demoSuggestion = {
		summary: 'Based on your interest in Frontend, focus on web fundamentals, a modern framework, and projects.',
		roles: ['Frontend Developer', 'UI Developer', 'React Developer'],
		skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
		steps: [
			'Learn HTML, CSS, and JavaScript basics',
			'Build 2–3 small projects (landing page, todo app, portfolio)',
			'Learn React fundamentals (components, hooks, state management)',
			'Create a polished portfolio and apply to internships/junior roles',
		],
	}

	const demoResources = [
		{
			title: 'React JS Crash Course',
			videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
			thumbnail: 'https://i.ytimg.com/vi/w7ejDZ8SWv8/hqdefault.jpg',
			channel: 'Traversy Media',
		},
		{
			title: 'JavaScript for Beginners',
			videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
			thumbnail: 'https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg',
			channel: 'Mosh Hamedani',
		},
		{
			title: 'CSS Flexbox in 20 Minutes',
			videoUrl: 'https://www.youtube.com/watch?v=JJSoEo8JSnc',
			thumbnail: 'https://i.ytimg.com/vi/JJSoEo8JSnc/hqdefault.jpg',
			channel: 'Web Dev Simplified',
		},
	]

	useEffect(() => {
		if (!answers?.desiredField) return
		setResLoading(true)
		setResError('')
		;(async () => {
			try {
				const data = await careerAPI.resources(answers.desiredField)
				setResources(data)
			} catch (e) {
				setResError(e.message || 'Failed to load resources')
			} finally {
				setResLoading(false)
			}
		})()
	}, [answers?.desiredField])

	async function onGenerate(e) {
		e.preventDefault()
		setRmError('')
		setRmLoading(true)
		try {
			const data = await careerAPI.generateRoadmap({ topic, duration })
			setRoadmap(data)
		} catch (e) {
			setRmError(e.message || 'Failed to generate roadmap')
		} finally {
			setRmLoading(false)
		}
	}

	const allRoles = (() => {
		const data = suggestion ?? demoSuggestion
		return Array.isArray(data?.roles) && data.roles.length ? data.roles : ['Web Developer', 'Graphic Designer', 'UI/UX Designer']
	})()

	function scrollToId(id) {
		const el = document.getElementById(id)
		if (el) el.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<>
			<section className="hero">
				<div className="hero-content">
					<h1 className="hero-title">
						Career
						<span className="gradient-text"> Guidance</span>
					</h1>
					<p className="hero-subtitle">
						Personalized suggestions based on your responses
					</p>
				</div>
			</section>

			{/* Actions + Suggested Skills */}
			<section className="features">
				<div className="container">
					<div className="features-grid">
						<div className="feature-card">
							<h3>Quick Actions</h3>
							<div className="question-actions" style={{ gap: 12 }}>
								<button className="btn-primary" type="button" onClick={() => scrollToId('resources')}>View Resources</button>
								<button className="btn-gradient" type="button" onClick={() => scrollToId('guidance')}>View Guidance</button>
							</div>
						</div>
						<div className="feature-card">
							<h3>Suggested Skills / Roles</h3>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
								{allRoles.map((role, i) => (
									<button
										key={i}
										type="button"
										className="btn-secondary"
										style={{ padding: '6px 10px' }}
										onClick={() => { setTopic(role); scrollToId('resources') }}
									>
										{role}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="features" id="guidance">
				<div className="container">
					<h2 className="section-title">Your Guidance</h2>
					{(() => {
						const data = suggestion ?? demoSuggestion
						return (
							<div className="feature-card">
								{typeof data === 'string' ? (
									<pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{data}</pre>
								) : (
									<div>
										<h3>Summary</h3>
										<p>{data.summary}</p>
										<h3>Suitable Roles</h3>
										<ul>
											{data.roles?.map((r, i) => (<li key={i}>{r}</li>))}
										</ul>
										<h3>Core Skills</h3>
										<ul>
											{data.skills?.map((s, i) => (<li key={i}>{s}</li>))}
										</ul>
										<h3>Suggested Steps</h3>
										<ol>
											{data.steps?.map((s, i) => (<li key={i}>{s}</li>))}
										</ol>
									</div>
								)}
							</div>
						)
					})()}

					{answers?.desiredField && (
						<div className="feature-card">
							<h3>Next Steps</h3>
							<p>Explore resources for: {answers.desiredField}</p>
							<Link to="/fresher" className="btn-primary">Refine Answers</Link>
						</div>
					)}

					<h2 className="section-title">Recommended Resources</h2>
					<div id="resources" />
					{resLoading && <div className="feature-card"><p>Loading resources...</p></div>}
					{resError && <div className="feature-card"><p className="error-text" role="alert">{resError}</p></div>}
					{!resLoading && !resError && (
						<div className="features-grid">
							{(resources?.length ? resources : demoResources).map((r, idx) => (
								<a key={idx} href={r.videoUrl} target="_blank" rel="noreferrer" className="feature-card">
									<img src={r.thumbnail} alt={r.title} style={{ width: '100%', borderRadius: '8px' }} />
									<h4>{r.title}</h4>
									<p>{r.channel}</p>
								</a>
							))}
						</div>
					)}

					<h2 className="section-title">Generate Roadmap</h2>
					<form onSubmit={onGenerate} className="question-card fresher-card">
						<label htmlFor="topic">Topic</label>
						<input id="topic" type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required />
						<label htmlFor="duration">Duration</label>
						<input id="duration" type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 8 weeks" required />
						<div className="question-actions">
							<button type="submit" className="btn-gradient" disabled={rmLoading}>{rmLoading ? 'Generating...' : 'Generate'}</button>
						</div>
					</form>
					{rmError && <p className="error-text" role="alert">{rmError}</p>}
					{roadmap && (
						<div className="feature-card">
							<pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{typeof roadmap === 'string' ? roadmap : JSON.stringify(roadmap, null, 2)}</pre>
						</div>
					)}
				</div>
			</section>
		</>
	)
}
