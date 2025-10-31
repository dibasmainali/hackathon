import { useLocation } from 'react-router-dom'

export default function FieldGuidancePage() {
	const location = useLocation()
	const field = location.state?.field || new URLSearchParams(location.search).get('field') || 'Selected Field'

	const demo = {
		summary: `A focused path to get started with ${field}. Build strong fundamentals, complete a mini-project, and showcase your work.`,
		why: [
			`High demand for ${field} roles across industries`,
			`Clear progression from beginner to junior within months`,
			`Plenty of beginner-friendly learning paths and projects`,
		],
		steps: [
			`Week 1–2: Learn ${field} fundamentals and terminology`,
			`Week 3–4: Build 1–2 mini projects related to ${field}`,
			`Week 5–6: Create a portfolio/readme and refine resumes`,
			`Week 7–8: Apply for internships/junior roles, network and iterate`,
		],
		skills: ['Fundamentals', 'Problem solving', 'Portfolio', 'Git/GitHub'],
	}

	return (
		<section className="features">
			<div className="container" style={{ maxWidth: 780, margin: '24px auto' }}>
				<div className="feature-card" style={{ padding: 24 }}>
					<h1 className="section-title" style={{ fontSize: 24 }}>{field} Guidance</h1>
					<p className="hero-subtitle" style={{ marginBottom: 16 }}>{demo.summary}</p>

					<h3>Why {field}?</h3>
					<ul style={{ paddingLeft: 18 }}>
						{demo.why.map((w, i) => (<li key={i} style={{ margin: '6px 0' }}>{w}</li>))}
					</ul>

					<h3 style={{ marginTop: 16 }}>Suggested 8-week plan</h3>
					<ol style={{ paddingLeft: 18 }}>
						{demo.steps.map((s, i) => (<li key={i} style={{ margin: '6px 0' }}>{s}</li>))}
					</ol>

					<h3 style={{ marginTop: 16 }}>Core skills</h3>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
						{demo.skills.map((s, i) => (<span key={i} className="btn-secondary" style={{ padding: '6px 10px' }}>{s}</span>))}
					</div>
				</div>
			</div>
		</section>
	)
}
