import axios from 'axios'

const API_BASE_URL = 'https://otx.alienvault.com/api/v1'
const API_KEY = '814fc6b075a7182cd3ccfb146d4131bb7d28e4df1e85fd694e2470002ec634f5'

export const fetchThreatsByIP = async (ipAddress) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/indicators/IPv4/${ipAddress}/general`, {
      headers: { 'X-OTX-API-KEY': API_KEY },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching threat data:', error)
    return null
  }
}
