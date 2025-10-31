import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { careerAPI } from '../utils/api'

export default function ResourcesPage() {
	const location = useLocation()
	const field = new URLSearchParams(location.search).get('field') || 'Frontend'
	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		setLoading(true)
		setError('')
		;(async () => {
			try {
				const data = await careerAPI.resources(field)
				setItems(data)
			} catch (e) {
				setError(e.message || 'Failed to load resources')
			} finally {
				setLoading(false)
			}
		})()
	}, [field])

	return (
		<section className="features">
			<div className="container" style={{ maxWidth: 900, margin: '24px auto' }}>
				<h1 className="section-title">Resources for {field}</h1>
				{loading && <div className="feature-card"><p>Loading...</p></div>}
				{error && <div className="feature-card"><p className="error-text" role="alert">{error}</p></div>}
				{!loading && !error && (
					<div className="features-grid">
						{(items?.length ? items : []).map((r, idx) => (
							<a key={idx} href={r.videoUrl} target="_blank" rel="noreferrer" className="feature-card">
								<img src={r.thumbnail} alt={r.title} style={{ width: '100%', borderRadius: '8px' }} />
								<h4>{r.title}</h4>
								<p>{r.channel}</p>
							</a>
						))}
						{!items?.length && (
							<div className="feature-card"><p>No resources found.</p></div>
						)}
					</div>
				)}
			</div>
		</section>
	)
}
