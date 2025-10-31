import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
})

let authToken: string | null = null

instance.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = config.headers ?? {}
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
})

export const api = {
  setToken: (token: string | null) => {
    authToken = token
  },
  async get(path: string) {
    const r = await instance.get(path)
    return r.data
  },
  async post(path: string, body?: any) {
    const r = await instance.post(path, body)
    return r.data
  },
  async put(path: string, body?: any) {
    const r = await instance.put(path, body)
    return r.data
  },
  async del(path: string) {
    const r = await instance.delete(path)
    return r.data
  }
}




