<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";

import { useTaskStore } from "../stores/tasks.store";
import { useDebounce } from "../composables/debounce";

import type { Task } from "../types/task";

import TaskCard from "../components/Task.vue";
import AddTaskButton from "../components/AddTaskBtn.vue";
import StatusFilter from "../components/StatusInput.vue";
import BaseInput from "../components/BaseInput.vue";

const taskStore = useTaskStore();
const { loading, error } = storeToRefs(taskStore);

const searchText = ref("");
const status = ref("All");
const filteredTasks = ref<Task[]>([]);

onMounted(async () => {
    await taskStore.fetchTasks();
    filterTasks();
});

const debouncedSearch = useDebounce(searchText, 300);

async function deleteTask(id: string) {
    await taskStore.removeTask(id);

    filteredTasks.value = filteredTasks.value.filter(task => task.id !== id)
}

function filterTasks() {
    const query = debouncedSearch.value.trim().toLowerCase();

    filteredTasks.value = taskStore.tasks.filter((task) => {
        const matchesSearch = !query || task.title.toLowerCase().includes(query);

        const matchesStatus = status.value === "All" || task.status === status.value;

        return matchesSearch && matchesStatus;
    });
}

watch(debouncedSearch, filterTasks);
watch(status, filterTasks);
</script>

<template>
    <section class="mx-auto max-w-7xl p-6">

        <!-- Header -->
        <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 class="text-3xl font-bold text-primary">
                My Tasks
            </h1>

            <div class="flex flex-col gap-3 sm:flex-row">
                <BaseInput v-model="searchText" placeholder="Search by title" :disabled="loading" class="sm:w-72" />

                <StatusFilter v-model="status" :disabled="loading" class="sm:w-52">
                    <option value="All">All</option>
                </StatusFilter>
            </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex min-h-[22rem] flex-col items-center justify-center gap-5">
            <div class="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />

            <p class="text-lg font-medium text-gray-600">
                Loading tasks...
            </p>
        </div>

        <!-- Error -->
        <div v-else-if="error"
            class="flex min-h-[22rem] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="mb-4 h-14 w-14 text-red-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01M10.29 3.86l-8 14A1 1 0 003.14 19h17.72a1 1 0 00.85-1.14l-8-14a1 1 0 00-1.72 0z" />
            </svg>

            <h2 class="text-2xl font-semibold text-red-700">
                Failed to load tasks
            </h2>

            <p class="mt-2 text-gray-600">
                {{ error }}
            </p>

            <button class="mt-6 rounded-xl bg-primary px-5 py-3 font-medium text-white transition hover:opacity-90"
                @click="taskStore.fetchTasks">
                Try Again
            </button>
        </div>

        <!-- Success -->
        <template v-else>
            <!-- Empty -->
            <div v-if="!filteredTasks.length"
                class="flex min-h-88 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="mb-5 h-14 w-14 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>

                <h2 class="text-2xl font-semibold text-gray-700">
                    No tasks found
                </h2>

                <p class="mt-2 max-w-md text-gray-500">
                    We couldn't find any tasks matching your current search or
                    filter. Try adjusting the filters or create a new task.
                </p>
            </div>

            <!-- Tasks -->
            <div v-else class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" @delete="deleteTask" />
            </div>
        </template>

        <AddTaskButton />
    </section>
</template>