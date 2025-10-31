import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function LoginRegister() {
  const { login, register, token } = useAuth()
  const nav = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (token) nav('/projects')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (isLogin) await login(email, password)
      else await register(username, email, password)
      nav('/projects')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed')
    }
  }

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
        {!isLogin && (
          <input placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required={!isLogin} minLength={3} />
        )}
        <input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required minLength={6} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button style={{ marginTop: 8 }} onClick={()=>setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
    </div>
  )
}




