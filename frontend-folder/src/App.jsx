 
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import FresherPage from './pages/FresherPage'
import CareerGuidancePage from './pages/CareerGuidancePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import JobSeekerPage from './pages/JobSeekerPage'

function App() {
	return (
		<div className="App">
			{/* Navigation */}
			<Navbar />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/job" element={<JobSeekerPage />} />
				<Route path="/fresher" element={<FresherPage />} />
				<Route path="/career-guidance" element={<CareerGuidancePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
			</Routes>

			{/* Footer */}
			<Footer />
		</div>
	)
}

export default App
