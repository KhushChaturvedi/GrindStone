import Link from "next/link";

export default function Sidebar() {
    return(
        <nav>
            <Link href="/">Today's Task</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/add-task">Add Tasks</Link>
        </nav>
    )
}