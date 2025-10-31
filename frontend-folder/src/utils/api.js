/**
 * API utility for making backend requests
 * Handles base URL, credentials, and error handling
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Make an API request with proper configuration
 * @param {string} endpoint - API endpoint (e.g., '/auth/login')
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise<Response>}
 */
export async function apiRequest(endpoint, options = {}) {
	const url = `${API_BASE_URL}${endpoint}`;
	
	const defaultOptions = {
		credentials: 'include', // Important for cookies
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
		...options,
	};

	try {
		const response = await fetch(url, defaultOptions);
		return response;
	} catch (error) {
		console.error('API Request Error:', error);
		throw new Error('Network error. Please check your connection.');
	}
}

/**
 * Parse API response and handle errors
 * @param {Response} response - Fetch response object
 * @returns {Promise<Object>}
 */
export async function parseResponse(response) {
	const data = await response.json();
	
	if (!response.ok) {
		throw new Error(data.message || `HTTP error! status: ${response.status}`);
	}
	
	return data;
}

/**
 * Auth API functions
 */
export const authAPI = {
	async login(email, password) {
		const response = await apiRequest('/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		});
		return parseResponse(response);
	},

	async signup(userData) {
		const response = await apiRequest('/auth/signup', {
			method: 'POST',
			body: JSON.stringify(userData),
		});
		return parseResponse(response);
	},

	async getCurrentUser() {
		const response = await apiRequest('/auth/me', {
			method: 'GET',
		});
		return parseResponse(response);
	},
};

