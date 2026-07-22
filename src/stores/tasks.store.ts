import { ref } from "vue";
import { defineStore } from "pinia";
import type { Task } from "../types/task";
import { getTasks, createTask, updateTask, deleteTask } from "../services/tasks.service";

export const useTaskStore = defineStore("tasks", () => {
    const tasks = ref<Task[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchTasks() {
        loading.value = true;
        error.value = null;

        try {
            tasks.value = await getTasks();
        } catch (err) {
            error.value =
                err instanceof Error
                    ? err.message
                    : "Something went wrong while getting your tasks.";
        } finally {
            loading.value = false;
        }
    }

    async function addTask(task: Omit<Task, "id">) {
        loading.value = true;
        error.value = null;

        try {
            const newTask = await createTask(task);

            tasks.value.push(newTask);
        } catch (err) {
            error.value =
                err instanceof Error
                    ? err.message
                    : "Something went wrong while creating your tasks.";
        } finally {
            loading.value = false;
        }
    }

    async function editTask(task: Task) {
        loading.value = true;
        error.value = null;

        try {
            const updatedTask = await updateTask(task);

            const index = tasks.value.findIndex(existingTask => existingTask.id === updatedTask.id);

            if (index !== -1)
                tasks.value[index] = updatedTask;
        } catch (err) {
            error.value =
                err instanceof Error
                    ? err.message
                    : "Something went wrong while updating your tasks.";
        } finally {
            loading.value = false;
        }
    }

    async function removeTask(id: string) {
        loading.value = true;
        error.value = null;

        try {
            tasks.value = await deleteTask(id);
        } catch (err) {
            error.value =
                err instanceof Error
                    ? err.message
                    : "Something went wrong while deleting your tasks.";
        } finally {
            loading.value = false;
        }
    }

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        updateTask,
        removeTask,
    };
});