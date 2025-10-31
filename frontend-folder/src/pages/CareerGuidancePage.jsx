import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { careerAPI } from '../utils/api'

export default function CareerGuidancePage() {
	const location = useLocation()
	const navigate = useNavigate()
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
		summary: 'You’re likely drawn to careers in technology, innovation, and problem‑solving. Focus on fundamentals, a modern framework, and portfolio projects.',
		roles: ['Computer Science', 'Data Science', 'Product Design'],
		skills: ['HTML/CSS', 'JavaScript', 'React', 'Git/GitHub', 'Problem solving'],
		steps: [
			'Learn HTML, CSS, and JavaScript basics',
			'Build 2–3 small projects (landing page, todo app, portfolio)',
			'Learn React fundamentals (components, hooks, state management)',
			'Create a polished portfolio and apply to internships/junior roles',
		],
	}

	const demoFields = [
		{
			name: 'Computer Science',
			desc: 'Develops software, algorithms, and systems that drive innovation and technological advancements.',
			growth: 'High demand, 13% growth rate by 2030',
		},
		{
			name: 'Data Science',
			desc: 'Analyzes complex data to inform business decisions and drive growth.',
			growth: 'High demand, 14% growth rate by 2030',
		},
		{
			name: 'Product Design',
			desc: 'Creates user‑centered products and experiences that balance form and function.',
			growth: 'Growing demand, 10% growth rate by 2030',
		},
	]

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



	return (
		<>
			<section className="features" id="guidance">
				<div
					className="container"
					style={{
						maxWidth: '780px',
						margin: '24px auto',
						background: '#fff',
						border: '1px solid #e5e7eb',
						borderRadius: 16,
						boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
						padding: 24,
					}}
				>
					<h1 className="section-title" style={{ fontSize: '28px' }}>Your Career Insight Summary</h1>
					<p className="hero-subtitle">A personalized analysis of your strengths, goals, and next steps.</p>

					{/* Key Insights */}
					<h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>💬 Key Insights</h3>
					<div className="feature-card" style={{ border: '1px solid #e5e7eb' }}>
						<p style={{ margin: 0 }}>{(suggestion && typeof suggestion === 'string') ? suggestion : (suggestion?.summary || demoSuggestion.summary)}</p>
					</div>

					{/* Recommended Career Fields */}
					<h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>🎯 Recommended Career Fields</h3>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
						{(demoFields).map((f, idx) => (
							<div key={idx} className="feature-card" style={{ border: '1px solid #e5e7eb' }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
									<div style={{ flex: 1, minWidth: 0 }}>
										<h4 style={{ marginTop: 0 }}>{f.name}</h4>
										<p style={{ margin: '6px 0' }}>{f.desc}</p>
										<small style={{ color: '#6b7280' }}>{f.growth}</small>
									</div>
									<div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
										<button
											className="btn-secondary"
											type="button"
											onClick={() => {
												navigate('/field-guidance', { state: { field: f.name } })
											}}
										>
											View Guidance
										</button>
										<button
											className="btn-primary"
											type="button"
											onClick={() => {
												navigate(`/resources?field=${encodeURIComponent(f.name)}`)
											}}
										>
											View Resources
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Next Steps */}
					<h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>🚀 Next Steps</h3>
					<ul className="feature-card" style={{ border: '1px solid #e5e7eb', listStyle: 'disc', padding: '16px 24px' }}>
						{(suggestion?.steps || demoSuggestion.steps).map((s, i) => (<li key={i} style={{ margin: '6px 0' }}>{s}</li>))}
					</ul>

					{/* Skills to Develop */}
					<h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>🧠 Skills to Develop</h3>
					<div className="feature-card" style={{ border: '1px solid #e5e7eb' }}>
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
							{(suggestion?.skills || demoSuggestion.skills).map((sk, i) => (
								<span key={i} className="btn-secondary" style={{ padding: '6px 10px' }}>{sk}</span>
							))}
						</div>
					</div>

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

					<h2 className="section-title" id="roadmap">Generate Roadmap</h2>
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
