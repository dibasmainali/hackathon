// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { authAPI } from '../utils/api'

// export default function SignupPage() {
// 	const navigate = useNavigate()
// 	const [form, setForm] = useState({ name: '', email: '', password: '' })
// 	const [loading, setLoading] = useState(false)
// 	const [error, setError] = useState('')

// 	async function handleSubmit(e) {
// 		e.preventDefault()
// 		setError('')
// 		setLoading(true)
// 		try {
// 			const data = await authAPI.signup(form)
// 			if (data.token) localStorage.setItem('cb_token', data.token)
// 			navigate('/')
// 		} catch (err) {
// 			setError(err.message || 'Signup failed. Please try again.')
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	return (
// 		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
// 			<div className="w-full max-w-md">
// 				<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
// 					{/* Header */}
// 					<div className="text-center space-y-2">
// 						<h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
// 						<p className="text-gray-600">Join CareerBridge and start your career journey</p>
// 					</div>

// 					{/* Error Message */}
// 					{error && (
// 						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
// 							{error}
// 						</div>
// 					)}

// 					{/* Form */}
// 					<form onSubmit={handleSubmit} className="space-y-5">
// 						<div>
// 							<label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
// 								Full Name
// 							</label>
// 							<input
// 								id="name"
// 								type="text"
// 								placeholder="Sita Sharma"
// 								value={form.name}
// 								onChange={(e) => setForm({ ...form, name: e.target.value })}
// 								required
// 								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
// 							/>
// 						</div>

// 						<div>
// 							<label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
// 								Email
// 							</label>
// 							<input
// 								id="email"
// 								type="email"
// 								placeholder="you@example.com"
// 								value={form.email}
// 								onChange={(e) => setForm({ ...form, email: e.target.value })}
// 								required
// 								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
// 							/>
// 						</div>

// 						<div>
// 							<label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
// 								Password
// 							</label>
// 							<input
// 								id="password"
// 								type="password"
// 								placeholder="Create a strong password"
// 								value={form.password}
// 								onChange={(e) => setForm({ ...form, password: e.target.value })}
// 								required
// 								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
// 							/>
// 						</div>

// 						<button
// 							type="submit"
// 							disabled={loading}
// 							className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
// 						>
// 							{loading ? 'Creating Account...' : 'Create Account'}
// 						</button>
// 					</form>

// 					{/* Sign In Link */}
// 					<div className="text-center pt-4 border-t border-gray-200">
// 						<p className="text-gray-600 text-sm">
// 							Already have an account?{' '}
// 							<Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
// 								Sign in
// 							</Link>
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../utils/api'

export default function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    skills: '',
    description: '',
    experience: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // Convert comma-separated skills string to array
      const formattedForm = {
        ...form,
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      }

      const data = await authAPI.signup(formattedForm)
      if (data.token) localStorage.setItem('cb_token', data.token)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600">Join CareerBridge and start your career journey</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="col-span-1">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Sita Sharma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="col-span-1">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="col-span-1">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div className="col-span-1">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                placeholder="+977 9812345678"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Kathmandu, Nepal"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Skills */}
            <div className="col-span-2">
              <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-2">
                Skills <span className="text-gray-500 text-sm">(comma-separated)</span>
              </label>
              <input
                id="skills"
                type="text"
                placeholder="React, Node.js, MongoDB"
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Experience */}
            <div className="col-span-2">
              <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                Experience
              </label>
              <input
                id="experience"
                type="text"
                placeholder="2 years in web development"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                About You
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Write a short bio or description about yourself..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
