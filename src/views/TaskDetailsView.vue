<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useTaskStore } from "../stores/tasks.store";

import BaseBtn from "../components/BaseBtn.vue";
import DeleteModal from "../components/DeleteModal.vue";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const showDeleteModal = ref(false);

onMounted(async () => {
    if (taskStore.tasks.length == 0)
        await taskStore.fetchTasks();

    if (!task.value)
        router.replace({ name: "notFound" });
});

const task = computed(() => taskStore.tasks.find(task => task.id === route.params.id));

const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Done: "bg-green-100 text-green-700",
};

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
    }).format(new Date(date));
}

async function deleteTask() {
    await taskStore.removeTask(route.params.id as string);

    router.replace({ name: "home" });
}
</script>

<template>
    <section v-if="task" class="mx-auto max-w-4xl p-6">
        <!-- Breadcrumb -->
        <button @click="router.push({ name: 'home' })"
            class="mb-8 inline-flex items-center gap-2 font-medium text-primary transition cursor-pointer hover:underline">
            ← Back
        </button>

        <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <!-- Header -->
            <div class="flex flex-col gap-6 border-b border-gray-100 p-8 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 class="sm:text-3xl xs:text-2xl text-lg font-bold text-primary">
                        {{ task.title }}
                    </h1>

                    <p class="mt-3 text-gray-500 xs:text-base text-sm">
                        Task details and progress
                    </p>
                </div>

                <span :class="statusClasses[task.status]"
                    class="rounded-full px-4 py-2 text-sm font-semibold flex justify-center align-center">
                    {{ task.status }}
                </span>
            </div>

            <!-- Body -->
            <div class="space-y-8 p-8">

                <div>
                    <h2 class="mb-2 text-lg font-semibold text-gray-900">
                        Description
                    </h2>

                    <p class="leading-7 whitespace-pre-line text-gray-600 xs:text-base text-sm">
                        {{ task.description || "No description provided." }}
                    </p>
                </div>

                <div>
                    <p class="mb-2 text-lg font-semibold text-gray-900">
                        Due Date
                    </p>

                    <p class="leading-7 whitespace-pre-line text-gray-600 xs:text-base text-sm">
                        {{ formatDate(task.dueDate) }}
                    </p>
                </div>

                <!-- Actions -->
                <div class="flex flex-col gap-4 border-t border-gray-100 pt-8 sm:flex-row sm:justify-end">
                    <base-btn class="text-white bg-danger hover:bg-red-700" @click="showDeleteModal = true">
                        Delete Task
                    </base-btn>

                    <base-btn class="text-white bg-primary hover:bg-sky-700"
                        @click="router.push({ name: 'editTask', params: { id: route.params.id } })">
                        Edit Task
                    </base-btn>
                </div>

                <delete-modal :open="showDeleteModal" :task-title="task.title" :loading="taskStore.loading"
                    @cancel="showDeleteModal = false" @confirm="deleteTask" />
            </div>
        </div>
    </section>
</template>