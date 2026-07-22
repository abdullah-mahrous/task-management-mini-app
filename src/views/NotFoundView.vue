<script setup lang="ts">
import { useRouter } from "vue-router";

import BaseBtn from "../components/BaseBtn.vue";

const router = useRouter();

function goHome() {
    router.push({ name: "home" });
}
</script>

<template>
    <section class="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl items-center justify-center px-6">
        <div
            class="flex max-w-xl flex-col items-center rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <!-- 404 -->
            <h1 class="text-6xl font-extrabold tracking-tight text-primary">
                404
            </h1>

            <h2 class="mt-4 text-2xl font-semibold text-gray-800">
                Page Not Found
            </h2>

            <p class="mt-3 max-w-md text-gray-500">
                Sorry, the page you're looking for doesn't exist or may have
                been moved.
            </p>

            <base-btn @click="goHome"
                class="mt-8 p-3 bg-primary text-white hover:-translate-y-0.5 hover:shadow-lg hover:bg-sky-700 active:translate-y-0">
                Back to Home
            </base-btn>
        </div>
    </section>
</template>