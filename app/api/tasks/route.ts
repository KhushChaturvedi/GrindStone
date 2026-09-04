import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    const tasks = await prisma.task.findMany()
    return NextResponse.json(tasks)
}

export async function POST(request: Request){
    const body = await request.json()
    const newTask = await prisma.task.create({
        data: {
            date: new Date(body.date),
            taskName: body.taskName,
            color: body.color,
        },
    })
    return NextResponse.json(newTask)
}

export async function PATCH(request: Request){
    const body =  await request.json()
    const updatedTask = await prisma.task.update({
        where: {id: body.id},
        data: {
            taskName: body.taskName,
            color: body.color,
            isDone: body.isDone,
        },
    })
    return NextResponse.json(updatedTask)
}


export async function DELETE(request: Request){
    const body = await request.json()
    await prisma.task.delete({
        where: { id: body.id},
    })
    return NextResponse.json({message: "Task deleted"})
}