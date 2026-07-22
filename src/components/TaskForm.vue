<script setup lang="ts">
import { reactive } from "vue";

import type { Task } from "../types/task";
import { validateTask } from "../utils/validation/task.validation";

import BaseBtn from "./BaseBtn.vue";
import StatusInput from "./StatusInput.vue";
import BaseInput from "./BaseInput.vue";

const props = withDefaults(
    defineProps<{
        initialValues?: Task;
        submitText?: string;
        loading?: boolean;
    }>(),
    {
        submitText: "Save Task",
        loading: false,
    }
);

const emit = defineEmits<{
    (e: "submit", task: Task): void;
}>();

const form = reactive({
    id: props.initialValues?.id ?? crypto.randomUUID(),
    title: props.initialValues?.title ?? "",
    description: props.initialValues?.description ?? "",
    dueDate: props.initialValues?.dueDate ?? "",
    status: props.initialValues?.status ?? "Pending",
});

let acceptedDate = new Date().toISOString().split('T')[0];

const errors = reactive({
    title: "",
    dueDate: "",
});

function saveTask() {
    Object.assign(errors, validateTask(form));

    const hasErrors = Object.values(errors).some(Boolean);

    if (hasErrors)
        return;

    emit("submit", { ...form });
}
</script>

<template>
    <section class="min-h-screen w-screen flex items-center align-center bg-[#f8f9fc] p-6">
        <form @submit.prevent="saveTask"
            class="sm:mx-auto w-full max-w-3xl rounded-2xl border border-gray-200 p-6 shadow-sm sm:p-8">

            <h2 class="text-4xl font-semibold text-center text-primary mb-8">
                Add New Task
            </h2>

            <div class="space-y-6">

                <!-- Title -->
                <div>
                    <label for="title" class="mb-2 block text-lg font-medium text-gray-700">
                        Title
                    </label>

                    <base-input id="title" v-model.trim="form.title" type="text" required maxlength="100"
                        placeholder="Enter task title" class="w-full bg-white" />

                    <p v-if="errors.title" class="text-danger text-sm text-left mt-2">
                        {{ errors.title }}
                    </p>
                </div>

                <!-- Description -->
                <div>
                    <label for="description" class="mb-2 block text-lg font-medium text-gray-600">
                        Description
                    </label>

                    <textarea id="description" v-model.trim="form.description" rows="5"
                        placeholder="Describe the task..."
                        class="w-full bg-white rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
                </div>

                <!-- Date + Status -->
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <div>
                        <label for="due-date" class="mb-2 block text-lg font-medium text-gray-600">
                            Due Date
                        </label>

                        <base-input id="due-date" v-model="form.dueDate" type="date" required :min="acceptedDate"
                            class="w-full bg-white" />

                        <p v-if="errors.dueDate" class="text-danger text-sm text-left mt-2">
                            {{ errors.dueDate }}
                        </p>
                    </div>

                    <div>
                        <label for="status" class="mb-2 block text-lg font-medium text-gray-600">
                            Status
                        </label>

                        <status-input v-model="form.status" />
                    </div>

                </div>

                <!-- Submit -->
                <div class="flex justify-end pt-2">
                    <base-btn type="submit" :disabled="loading"
                        class="disabled:cursor-not-allowed disabled:opacity-60 bg-primary text-white hover:bg-sky-700">
                        {{ loading ? "Saving..." : submitText }}
                    </base-btn>
                </div>

            </div>
        </form>
    </section>
</template>