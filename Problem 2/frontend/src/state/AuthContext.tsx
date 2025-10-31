import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../utils/api'

type AuthContextType = {
  token: string | null
  user: string | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'))

  useEffect(() => {
    api.setToken(token)
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await api.post('/api/auth/login', { email, password })
    setToken(res.token)
    setUser(res.username)
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', res.username)
  }

  const register = async (username: string, email: string, password: string) => {
    const res = await api.post('/api/auth/register', { username, email, password })
    setToken(res.token)
    setUser(res.username)
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', res.username)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const value = useMemo(() => ({ token, user, login, register, logout }), [token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}




