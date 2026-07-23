<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useTaskStore } from "../stores/tasks.store";
import type { Task } from "../types/task";

import TaskForm from "../components/TaskForm.vue";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

let task = ref<Task | undefined>(undefined);

onMounted(async () => {
    // fetch tasks if the store tasks is empty (ofcourse if there is a real api i would implement getTaskById and get it already -_-)
    if (taskStore.tasks.length == 0)
        await taskStore.fetchTasks();

    task.value = taskStore.tasks.find(existingTask => existingTask.id == route.params.id);

    // redirecting to 404 page if not found
    if (!task.value)
        router.replace({ name: 'notFound' });
})

async function updateTask(updatedTask: Task) {
    await taskStore.editTask(updatedTask);

    // redirecting to home after editing
    router.push("/");
}
</script>

<template>
    <TaskForm v-if="task" :initial-values="task" :loading="taskStore.loading" submit-text="Update"
        @submit="updateTask" />
</template>