-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "taskName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
