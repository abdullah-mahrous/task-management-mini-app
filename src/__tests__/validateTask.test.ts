import { describe, expect, it } from "vitest";

import { validateTask } from "../utils/validation/task.validation";
import type { Task } from "../types/task";

// to create a new task and run validation tests on it
function createTask(overrides: Partial<Task> = {}): Task {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
        id: "1",
        title: "Complete assignment",
        description: "Task description",
        dueDate: tomorrow.toISOString(),
        status: "Pending",
        ...overrides,
    };
}

describe("validateTask", () => {
    it("returns no validation errors for a valid task", () => {
        const errors = validateTask(createTask());

        expect(errors.title).toBe("");
        expect(errors.dueDate).toBe("");
    });

    it("returns an error when title is empty", () => {
        const errors = validateTask(
            createTask({
                title: "",
            })
        );

        expect(errors.title).toBe("Title is required.");
    });

    it("returns an error when title contains only spaces", () => {
        const errors = validateTask(
            createTask({
                title: "     ",
            })
        );

        expect(errors.title).toBe("Title is required.");
    });

    it("returns an error when due date is missing", () => {
        const errors = validateTask(
            createTask({
                dueDate: "",
            })
        );

        expect(errors.dueDate).toBe("Due date is required.");
    });

    it("returns an error when due date is today", () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const errors = validateTask(
            createTask({
                dueDate: today.toISOString(),
            })
        );

        expect(errors.dueDate).toBe("Due date must be in the future.");
    });

    it("returns an error when due date is in the past", () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const errors = validateTask(
            createTask({
                dueDate: yesterday.toISOString(),
            })
        );

        expect(errors.dueDate).toBe("Due date must be in the future.");
    });
});