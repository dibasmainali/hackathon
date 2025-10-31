import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../utils/api'

export default function LoginPage() {
	const navigate = useNavigate()
	const [form, setForm] = useState({ email: '', password: '' })
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			const data = await authAPI.login(form.email, form.password)
			if (data.token) localStorage.setItem('cb_token', data.token)
			navigate('/')
		} catch (err) {
			setError(err.message || 'Login failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
					{/* Header */}
					<div className="text-center space-y-2">
						<h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
						<p className="text-gray-600">Sign in to your CareerBridge account</p>
					</div>

					{/* Error Message */}
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
							{error}
						</div>
					)}

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
								Email
							</label>
							<input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={form.email}
								onChange={(e) => setForm({ ...form, email: e.target.value })}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
								Password
							</label>
							<input
								id="password"
								type="password"
								placeholder="••••••••"
								value={form.password}
								onChange={(e) => setForm({ ...form, password: e.target.value })}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
						>
							{loading ? 'Signing in...' : 'Sign In'}
						</button>
					</form>

					{/* Sign Up Link */}
					<div className="text-center pt-4 border-t border-gray-200">
						<p className="text-gray-600 text-sm">
							Don't have an account?{' '}
							<Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

