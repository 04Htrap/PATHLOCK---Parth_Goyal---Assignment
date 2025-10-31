import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../utils/api'

type Task = { id: number; title: string; completionStatus: boolean }

export default function ProjectDetails() {
  const { id } = useParams()
  const projectId = Number(id)
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const load = async () => {
    const project = await api.get(`/api/projects/${projectId}`)
    setTasks(project.tasks)
  }

  useEffect(() => { if (projectId) load() }, [projectId])

  const add = async () => {
    if (!title.trim()) return
    await api.post(`/api/projects/${projectId}/tasks`, { title })
    setTitle(''); setDescription('')
    await load()
  }

  const toggle = async (task: Task) => {
    await api.put(`/api/tasks/${task.id}`, { title: task.title, completionStatus: !task.completionStatus })
    await load()
  }

  const del = async (taskId: number) => {
    await api.del(`/api/tasks/${taskId}`)
    await load()
  }

  return (
    <div>
      <h2>Project #{projectId}</h2>
      <Link to="/projects">Back</Link>
      <div style={{ display:'grid', gap: 8, maxWidth: 480, margin: '16px 0' }}>
        <input placeholder="Task title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <button onClick={add}>Add Task</button>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            <label>
              <input type="checkbox" checked={t.completionStatus} onChange={()=>toggle(t)} />
              <span style={{ marginLeft: 8 }}>{t.title}</span>
            </label>
            <button style={{ marginLeft: 8 }} onClick={()=>del(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}




