'use client'

import { useState } from 'react'

export default function AddTaskPage() {
  const [taskName, setTaskName] = useState('')
  const [color, setColor] = useState('#FF0000')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: new Date().toISOString(),
        taskName: taskName,
        color: color,
      }),
    })

    setTaskName('')
    setColor('#FF0000')
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-wide mb-10">
        ADD TASK
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-border p-8 flex flex-col gap-6 max-w-md"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm tracking-wide text-muted">TASK NAME</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="e.g. DSA, React, System Design"
            className="bg-ink border border-border px-4 py-3 text-text focus:outline-none focus:border-ember"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm tracking-wide text-muted">COLOR</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-10 bg-transparent border border-border"
          />
        </div>

        <button
          type="submit"
          className="bg-ember text-ink font-[family-name:var(--font-heading)] tracking-wide px-5 py-3 hover:bg-ember-dim transition-colors"
        >
          ADD TASK
        </button>
      </form>
    </div>
  )
}