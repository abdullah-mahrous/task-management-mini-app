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
import DeleteModal from "../components/DeleteModal.vue";
import TasksError from "../assets/icons/TasksError.vue";
import Clipbourd from "../assets/icons/Clipbourd.vue";

const taskStore = useTaskStore();
const { loading, error } = storeToRefs(taskStore);

const searchText = ref("");
const status = ref("All");
const filteredTasks = ref<Task[]>([]);
const showDeleteModal = ref(false);
const selectedTask = ref<Task | null>(null);

onMounted(async () => {
    await taskStore.fetchTasks();
    // so the filteredTasks get initialized with all data and reset all filters
    filterTasks();
});

// i tried react but vue is the best
const debouncedSearch = useDebounce(searchText, 300);

async function deleteTask(id: string) {
    await taskStore.removeTask(id);

    // to remove deleted task from the rendered tasks
    filteredTasks.value = filteredTasks.value.filter(task => task.id !== id)
}

function filterTasks() {
    const query = debouncedSearch.value.trim().toLowerCase();

    filteredTasks.value = taskStore.tasks.filter((task) => {
        const matchesSearch = !query || task.title.toLowerCase().includes(query);

        const matchesStatus = status.value === "All" || task.status === status.value;

        // combining both filter and search if applicable
        return matchesSearch && matchesStatus;
    });
}

function openDeleteModal(task: Task) {
    selectedTask.value = task;
    showDeleteModal.value = true
}

async function confirmDelete() {
    if (!selectedTask.value)
        return;

    await deleteTask(selectedTask.value.id);

    showDeleteModal.value = false;
    selectedTask.value = null;
}

function closeDeleteModal() {
    showDeleteModal.value = false;
    selectedTask.value = null;
}

// watching them closely
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
        <div v-if="loading" class="flex min-h-88 flex-col items-center justify-center gap-5">
            <!-- a cool feature in vue *_- -->
            <div class="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />

            <p class="text-lg font-medium text-gray-600">
                Loading tasks...
            </p>
        </div>

        <!-- Error -->
        <div v-else-if="error"
            class="flex min-h-88 flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

            <tasks-error class="mb-4 size-14 text-red-500" />

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

                <clipbourd class="mb-5 size-14 text-gray-400" />

                <h2 class="text-2xl font-semibold text-gray-700">
                    No tasks found
                </h2>

                <p class="mt-2 max-w-md text-gray-500">
                    We couldn't find any tasks. Try to create a new task.
                </p>
            </div>

            <!-- Tasks -->
            <div v-else class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" @delete="openDeleteModal(task)" />
            </div>

        </template>

        <delete-modal :open="showDeleteModal" :task-title="selectedTask?.title" :loading="loading"
            @cancel="closeDeleteModal" @confirm="confirmDelete" />

        <AddTaskButton />
    </section>
</template>