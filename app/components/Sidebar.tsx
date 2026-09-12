import Link from 'next/link'

export default function Sidebar() {
  return (
    <nav className="w-64 min-h-screen bg-surface-2 border-r border-border flex flex-col p-8">
      <h2 className="font-[family-name:var(--font-heading)] text-2xl tracking-wide text-ember mb-12">
        GRINDSTONE
      </h2>
      <div className="flex flex-col gap-1">
        <Link
          href="/"
          className="px-4 py-3 text-muted hover:text-text border-l-2 border-transparent hover:border-ember transition-colors"
        >
          Today's Tasks
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-3 text-muted hover:text-text border-l-2 border-transparent hover:border-ember transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/add-task"
          className="px-4 py-3 text-muted hover:text-text border-l-2 border-transparent hover:border-ember transition-colors"
        >
          Add Task
        </Link>
      </div>
    </nav>
  )
}