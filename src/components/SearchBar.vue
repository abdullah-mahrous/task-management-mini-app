<script setup lang="ts">
defineProps<{
    modelValue: string;
    placeholder?: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
    <div class="w-full">
        <input :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            :placeholder="placeholder ?? 'Search tasks...'" type="text"
            class="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-sky-100" />
    </div>
</template>