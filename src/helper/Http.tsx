import axios from 'axios'
import { ENV_CONFIG } from '../EnvConfig'

export default axios.create({
  baseURL: `${ENV_CONFIG.DOGS_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': `${ENV_CONFIG.API_KEY}`,
  },
})
