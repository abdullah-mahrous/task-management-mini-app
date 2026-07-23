import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

import { useTaskStore } from "../stores/tasks.store";
import { getTasks, createTask, updateTask, deleteTask } from "../services/tasks.service";
import type { Task } from "../types/task";

// mocking store functions so it wont affect data or invoke http request (if there were any)
vi.mock("../services/tasks.service", () => ({
    getTasks: vi.fn(),
    createTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
}));

const mockTasks: Task[] = [
    {
        id: "1",
        title: "Vue",
        description: "Learn Vue",
        dueDate: "2030-01-01",
        status: "Pending",
    },
    {
        id: "2",
        title: "React",
        description: "Learn React",
        dueDate: "2030-01-02",
        status: "Done",
    },
];

describe("Task Store", () => {
    beforeEach(() => {
        setActivePinia(createPinia());

        vi.clearAllMocks();
    });

    it("fetches tasks successfully", async () => {
        vi.mocked(getTasks).mockResolvedValue(mockTasks);

        const store = useTaskStore();

        await store.fetchTasks();

        expect(getTasks).toHaveBeenCalledOnce();

        expect(store.tasks).toEqual(mockTasks);

        expect(store.loading).toBe(false);

        expect(store.error).toBeNull();
    });

    it("sets error when fetching tasks fails", async () => {
        vi.mocked(getTasks).mockRejectedValue(
            new Error("Network Error")
        );

        const store = useTaskStore();

        await store.fetchTasks();

        expect(store.tasks).toEqual([]);

        expect(store.error).toBe("Network Error");

        expect(store.loading).toBe(false);
    });

    it("adds a task", async () => {
        const newTask: Task = {
            id: "3",
            title: "Pinia",
            description: "",
            dueDate: "2030-01-03",
            status: "Pending",
        };

        vi.mocked(createTask).mockResolvedValue(newTask);

        const store = useTaskStore();

        await store.addTask({
            title: newTask.title,
            description: newTask.description,
            dueDate: newTask.dueDate,
            status: newTask.status,
        });

        expect(createTask).toHaveBeenCalledOnce();

        expect(store.tasks).toContainEqual(newTask);
    });

    it("updates a task", async () => {
        const store = useTaskStore();

        store.tasks = [...mockTasks];

        const updatedTask = {
            ...mockTasks[0],
            title: "Vue 3",
        };

        vi.mocked(updateTask).mockResolvedValue(updatedTask);

        await store.editTask(updatedTask);

        expect(updateTask).toHaveBeenCalledWith(updatedTask);

        expect(store.tasks[0].title).toBe("Vue 3");
    });

    it("removes a task", async () => {
        const store = useTaskStore();

        store.tasks = [...mockTasks];

        vi.mocked(deleteTask).mockResolvedValue([mockTasks[1]]);

        await store.removeTask("1");

        expect(deleteTask).toHaveBeenCalledWith("1");

        expect(store.tasks).toHaveLength(1);

        expect(store.tasks[0].id).toBe("2");
    });

    it("sets loading while fetching", async () => {
        let resolve!: (value: typeof mockTasks) => void;

        vi.mocked(getTasks).mockImplementation(() => new Promise(r => resolve = r)
        );

        const store = useTaskStore();

        const promise = store.fetchTasks();

        expect(store.loading).toBe(true);

        resolve(mockTasks);

        await promise;

        expect(store.loading).toBe(false);
    });
});