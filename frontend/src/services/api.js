import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
})

/**
 * Analyze a waste item via the Flask backend.
 * @param {string} item - Waste item name
 * @returns {Promise<object>} Analysis result
 */
export async function analyzeWasteItem(item) {
  const response = await api.post('/api/analyze', { item })
  return response.data
}

export default api
