import type { Task } from "../../types/task";

type TaskValidationErrors = {
    title: string;
    dueDate: string;
}

// validation creteria: title and due date are required, and due date must be in the future
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
        // get current date and compare it to due date to validate it is in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (new Date(task.dueDate) <= today)
            errors.dueDate = "Due date must be in the future.";
    }

    return errors;
}