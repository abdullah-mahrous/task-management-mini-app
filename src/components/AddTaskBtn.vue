<script setup lang="ts">
import PlusIcon from "../assets/icons/PlusIcon.vue";
</script>

<template>
    <router-link :to="{ name: 'addTask' }"
        class="fixed bottom-6 right-6 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg smooth-transition hover:scale-110 hover:bg-sky-700 hover:shadow-xl">
        <PlusIcon class="h-7 w-7" />
    </router-link>
</template>