export type TaskStatus = "Pending" | "In Progress" | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}