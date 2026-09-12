'use client'

import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

type Task = {
  id: string
  date: string
  taskName: string
  color: string
  isDone: boolean
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editColor, setEditColor] = useState('#FF0000')

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    const res = await fetch('/api/tasks')
    const data = await res.json()
    setTasks(data)
  }

  async function toggleTask(task: Task) {
    await fetch('/api/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: task.id,
        taskName: task.taskName,
        color: task.color,
        isDone: !task.isDone,
      }),
    })
    fetchTasks()
  }

  async function deleteTask(taskId: string) {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId }),
    })
    fetchTasks()
  }

  function startEditing(task: Task) {
    setEditingId(task.id)
    setEditName(task.taskName)
    setEditColor(task.color)
  }

  async function saveEdit(task: Task) {
    await fetch('/api/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: task.id,
        taskName: editName,
        color: editColor,
        isDone: task.isDone,
      }),
    })
    setEditingId(null)
    fetchTasks()
  }

  const pieData = tasks.map((task) => ({
    name: task.taskName,
    value: 1,
  }))

  return (
    <div>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-wide mb-10">
        TODAY'S TASKS
      </h1>

      <div className="flex flex-col gap-3 mb-14">
        {tasks.length === 0 && (
          <p className="text-muted">No tasks yet. Add one to start today's grind.</p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 bg-surface border border-border px-5 py-4"
          >
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => toggleTask(task)}
              className="w-5 h-5 accent-ember"
            />

            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="bg-ink border border-border px-3 py-2 flex-1 text-text"
                />
                <input
                  type="color"
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                  className="w-10 h-9 bg-transparent border border-border"
                />
                <button
                  onClick={() => saveEdit(task)}
                  className="border border-ember text-ember px-4 py-2 hover:bg-ember hover:text-ink transition-colors"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  style={{ color: task.color }}
                  className="flex-1 font-medium"
                >
                  {task.taskName}
                </span>
                <button
                  onClick={() => startEditing(task)}
                  className="border border-steel text-steel px-4 py-2 hover:bg-steel hover:text-ink transition-colors"
                >
                  Edit
                </button>
              </>
            )}

            <button
              onClick={() => deleteTask(task.id)}
              className="border border-danger text-danger px-4 py-2 hover:bg-danger hover:text-ink transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {tasks.length > 0 && (
        <div className="bg-surface border border-border p-8">
          <p className="text-sm tracking-wide text-muted mb-4">TODAY'S SPLIT</p>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name">
              {tasks.map((task) => (
                <Cell
                  key={task.id}
                  fill={task.isDone ? task.color : '#3a362f'}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      )}
    </div>
  )
}