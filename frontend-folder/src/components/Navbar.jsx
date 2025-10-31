import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
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
	)
}
