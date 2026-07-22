<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/tasks.store";

import TaskCard from "../components/Task.vue";
import AddTaskButton from "../components/AddTaskBtn.vue";
import SearchBar from "../components/SearchBar.vue";
import StatusFilter from "../components/StatusInput.vue";

const taskStore = useTaskStore();
const { tasks, loading, error } = storeToRefs(taskStore);

const search = ref("");
const status = ref("All");

onMounted(() => {
    taskStore.fetchTasks();
});
</script>

<template>
    <section class="mx-auto max-w-7xl p-6">

        <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 class="text-3xl font-bold text-primary">
                My Tasks
            </h1>

            <div class="flex flex-col gap-3 sm:flex-row md:w-auto">
                <SearchBar v-model="search" class="sm:w-72" />

                <StatusFilter v-model="status" class="sm:w-52" />
            </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <TaskCard v-for="task in tasks" :key="task.id" :task="task" @delete="taskStore.removeTask" />
        </div>

        <AddTaskButton />
    </section>
</template>