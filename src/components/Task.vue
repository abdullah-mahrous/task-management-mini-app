<script setup lang="ts">
import { useRouter } from "vue-router";

import type { Task } from "../types/task";

import BaseBtn from "./BaseBtn.vue";

defineProps<{
    task: Task;
}>();

const router = useRouter();

const emit = defineEmits<{
    (e: "delete"): void;
    (e: "edit", task: Task): void;
}>();

const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Done: "bg-green-100 text-green-700",
};
</script>

<template>
    <div
        class="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm smooth-transition hover:-translate-y-1 hover:shadow-lg">

        <RouterLink :to="`/tasks/${task.id}`" class="text-xl font-semibold text-sky-700 hover:underline">
            {{ task.title }}
        </RouterLink>

        <p class="mt-3 flex-1 text-gray-600 line-clamp-2">
            {{ task.description }}
        </p>

        <div class="mt-5 space-y-2 text-sm">
            <p>
                <span class="font-medium">Due:</span>
                {{ task.dueDate }}
            </p>

            <span class="inline-flex rounded-full mt-2 px-3 py-1 text-xs font-semibold"
                :class="statusClasses[task.status]">
                {{ task.status }}
            </span>
        </div>

        <div class="mt-4 flex gap-3">
            <base-btn class="hover:bg-sky-700 bg-primary text-white"
                @click="router.push({ name: 'editTask', params: { id: task.id } })">
                Edit
            </base-btn>

            <base-btn class="hover:bg-red-700 bg-danger text-white" @click="emit('delete')">
                Delete
            </base-btn>
        </div>
    </div>
</template>
