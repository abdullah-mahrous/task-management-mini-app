<script setup lang="ts">
defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
    <input :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="$attrs"
        class="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
</template>