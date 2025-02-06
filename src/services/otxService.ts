import axios from 'axios'
const API_BASE_URL = 'https://otx.alienvault.com/api/v1'
const API_KEY = import.meta.env.VITE_OTX_API_KEY

// Define a type for the API response
export interface OTXResponse {
  pulse_info: { count: number }
  reputation?: number // Number, not string
  malware_count?: number
}

export const fetchThreatsByIP = async (ipAddress: string): Promise<OTXResponse | null> => {
  try {
    const response = await axios.get<OTXResponse>(
      `${API_BASE_URL}/indicators/IPv4/${ipAddress}/general`,
      {
        headers: { 'X-OTX-API-KEY': API_KEY },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error fetching threat data:', error)
    return null
  }
}
