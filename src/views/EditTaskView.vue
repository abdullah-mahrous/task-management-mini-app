<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useTaskStore } from "../stores/tasks.store";
import type { Task } from "../types/task";

import TaskForm from "../components/TaskForm.vue";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

let task = ref<Task | undefined>(undefined);

onMounted(async () => {
    if (taskStore.tasks.length == 0)
        await taskStore.fetchTasks();

    task.value = taskStore.tasks.find(existingTask => existingTask.id == route.params.id);

    if (!task.value)
        router.replace({ name: 'notFound' });
})

async function updateTask(updatedTask: Task) {
    await taskStore.editTask(updatedTask);

    router.push("/");
}
</script>

<template>
    <TaskForm v-if="task" :initial-values="task" :loading="taskStore.loading" submit-text="Update"
        @submit="updateTask" />
</template>