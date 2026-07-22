import type { Task } from "../../types/task";

type TaskValidationErrors = {
    title: string;
    dueDate: string;
}

export function validateTask(task: Task): TaskValidationErrors {
    const errors: TaskValidationErrors = {
        title: "",
        dueDate: "",
    };

    if (!task.title.trim())
        errors.title = "Title is required.";

    if (!task.dueDate) {
        errors.dueDate = "Due date is required.";
    } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (new Date(task.dueDate) <= today)
            errors.dueDate = "Due date must be in the future.";
    }

    return errors;
}