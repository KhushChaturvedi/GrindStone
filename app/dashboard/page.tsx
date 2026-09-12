'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

type Task = {
  id: string
  date: string
  taskName: string
  color: string
  isDone: boolean
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    const res = await fetch('/api/tasks')
    const data = await res.json()
    setTasks(data)
  }

  const uniqueDates = Array.from(
    new Set(tasks.map((task) => task.date.split('T')[0]))
  )

  const dailyStats = uniqueDates.map((date) => {
    const dayTasks = tasks.filter((task) => task.date.split('T')[0] === date)
    const doneCount = dayTasks.filter((task) => task.isDone).length
    const percent = Math.round((doneCount / dayTasks.length) * 100)
    return { date, percent }
  })

  const sortedStats = [...dailyStats].sort((a, b) => (a.date < b.date ? 1 : -1))

  let streak = 0
  for (const day of sortedStats) {
    if (day.percent >= 50) {
      streak++
    } else {
      break
    }
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-wide mb-10">
        DASHBOARD
      </h1>

      <div className="bg-surface border border-border px-8 py-6 mb-10 inline-flex items-baseline gap-3">
        <span className="font-[family-name:var(--font-heading)] text-5xl text-ember">
          {streak}
        </span>
        <span className="text-muted tracking-wide">
          {streak === 1 ? 'DAY STREAK' : 'DAY STREAK'}
        </span>
      </div>

      <div className="bg-surface border border-border p-8">
        <p className="text-sm tracking-wide text-muted mb-4">LAST 30 DAYS</p>
        <BarChart width={650} height={320} data={dailyStats}>
          <XAxis dataKey="date" stroke="#9c948a" />
          <YAxis stroke="#9c948a" />
          <Bar dataKey="percent" fill="#e2632b" />
        </BarChart>
      </div>
    </div>
  )
}