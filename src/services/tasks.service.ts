import type { Task } from "../types/task";

const STORAGE_KEY = "tasks";
const RES_TIME = 500;

function getStoredTasks(): Task[] {
  const tasks = localStorage.getItem(STORAGE_KEY);

  if (!tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }

  return JSON.parse(tasks);
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export async function getTasks(): Promise<Task[]> {
    try {
        let  tasks: Task[] = [];
        
        await new Promise<void>(resolve => setTimeout(() => {
            tasks = getStoredTasks();
            resolve();
        }, RES_TIME))
        
        return tasks;
    } catch(err) {
        throw new Error("Error while fetching tasks.");
    }
}

export async function createTask(task: Omit<Task, "id">): Promise<Task> {
    const newTask: Task = {
        id: crypto.randomUUID(),
        ...task,
    };
    
    try {
        const tasks = getStoredTasks();

        await new Promise<void>(resolve => setTimeout(() => {
            tasks.push(newTask);
            saveTasks(tasks);

            resolve();
        }, RES_TIME));

        return newTask;
    } catch (err) {
        throw new Error("Error while saving task.");
    }

}

export async function updateTask(updatedTask: Task): Promise<Task> {
    const tasks = getStoredTasks();

    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);

    if (taskIndex == -1)
        throw new Error("Task not found.");

    try {
        await new Promise<void>(resolve => setTimeout(() => {
            tasks[taskIndex] = updatedTask;
            saveTasks(tasks);

            resolve();
        }, RES_TIME));
    } catch (err) {
        throw new Error("Error while updating task.");
    }

    return updatedTask;
}

export async function deleteTask(id: string): Promise<Task[]> {
    const tasks = getStoredTasks().filter(task => task.id !== id);

    try {
        await new Promise<void>(resolve => setTimeout(() => {
            saveTasks(tasks);
            resolve();
        }, RES_TIME));
    } catch (err) {
        throw new Error("Error while deleting task.");
    }

    return tasks;
}