<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import BaseBtn from "./BaseBtn.vue";

interface Props {
    open: boolean;
    taskTitle?: string;
    loading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
    (e: "confirm"): void;
    (e: "cancel"): void;
}>();

function handleEscape(e: KeyboardEvent) {
    if (e.key === "Escape") {
        emit("cancel");
    }
}

onMounted(() => {
    window.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleEscape);
});
</script>

<template>
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            @click.self="$emit('cancel')">
            <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100" leave-active-class="transition duration-150 ease-in"
                leave-from-class="scale-100 opacity-100" leave-to-class="scale-95 opacity-0">
                <div v-if="open" role="dialog" aria-modal="true" aria-labelledby="delete-title"
                    class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                    <!-- Icon -->
                    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01M10.29 3.86l-8 14A1 1 0 003.14 19h17.72a1 1 0 00.85-1.14l-8-14a1 1 0 00-1.72 0z" />
                        </svg>
                    </div>

                    <!-- Title -->
                    <h2 id="delete-title" class="mt-5 text-center text-2xl font-bold text-gray-900">
                        Delete Task
                    </h2>

                    <!-- Description -->
                    <p class="mt-3 text-center leading-6 text-gray-600">
                        Are you sure you want to delete
                        <span v-if="taskTitle" class="font-semibold text-gray-900">
                            "{{ taskTitle }}"
                        </span>
                        <span v-else>
                            this task
                        </span>
                        ?
                    </p>

                    <p class="mt-2 text-center text-sm text-gray-500">
                        This action cannot be undone.
                    </p>

                    <!-- Actions -->
                    <div class="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <BaseBtn
                            class=" text-yellow-500 hover:bg-yellow-500 hover:text-white outline-yellow-500 outline-2"
                            :disabled="loading" @click="$emit('cancel')">
                            Cancel
                        </BaseBtn>

                        <base-btn
                            class="text-danger hover:bg-danger hover:text-white outline-2 outline-danger disabled:cursor-not-allowed disabled:opacity-60"
                            :disabled="loading" @click="$emit('confirm')">
                            {{ loading ? "Deleting..." : "Delete Task" }}
                        </base-btn>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>