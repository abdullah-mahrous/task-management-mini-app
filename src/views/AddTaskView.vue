<script setup lang="ts">
import { useRouter } from "vue-router";

import { useTaskStore } from "../stores/tasks.store";
import type { Task } from "../types/task";

import TaskForm from "../components/TaskForm.vue";


const router = useRouter();
const taskStore = useTaskStore();

async function createTask(task: Task) {
    await taskStore.addTask(task);

    router.push({ name: 'home' });
}
</script>

<template>
    <TaskForm submit-text="Create Task" :loading="taskStore.loading" @submit="createTask" />
</template>