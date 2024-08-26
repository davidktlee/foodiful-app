import axios from 'axios'

const BASE_URL = process.env.API_URL

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  withCredentials: true,
})

api.interceptors.response.use((response) => {
  return response.data
})
