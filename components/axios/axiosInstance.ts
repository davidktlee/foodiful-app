import axios from 'axios'

const BASE_URL =
  process.env.ENVIRONMENT === 'production' ? process.env.API_URL : 'http://localhost:5002'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  withCredentials: true,
})

api.interceptors.response.use((response) => {
  return response.data
})
