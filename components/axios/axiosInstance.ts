import axios from 'axios'
import { Platform } from 'react-native'
import Constants from 'expo-constants'

// android의 로컬 서버로의 api 요청을 위한 ip 주소 get 로직
const HOST = Constants.expoConfig?.hostUri?.split(':').shift()

const BASE_URL =
  process.env.ENVIRONMENT === 'production'
    ? process.env.API_URL
    : Platform.OS === 'android'
    ? `http://${HOST}:5002`
    : 'http://localhost:5002'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  withCredentials: true,
})

api.interceptors.response.use((response) => {
  return response.data
})
