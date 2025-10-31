import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'

type Project = { id: number; title: string; description?: string; creationDate: string }

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const load = async () => {
    const data = await api.get('/api/projects')
    setProjects(data)
  }

  useEffect(() => { load() }, [])

  const createProject = async () => {
    if (!name.trim()) return
    await api.post('/api/projects', { title: name, description })
    setName(''); setDescription('')
    await load()
  }

  const del = async (id: number) => {
    await api.del(`/api/projects/${id}`)
    await load()
  }

  return (
    <div>
      <h2>Projects</h2>
      <div style={{ display:'grid', gap: 8, maxWidth: 480, marginBottom: 16 }}>
        <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <button onClick={createProject}>Create Project</button>
      </div>
      <ul>
        {projects.map(p => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <Link to={`/projects/${p.id}`}>{p.title}</Link>
            <button style={{ marginLeft: 8 }} onClick={()=>del(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}




