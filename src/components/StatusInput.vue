<script setup lang="ts">
defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const options = [
    "Pending",
    "In Progress",
    "Done",
];
</script>

<template>
    <select :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="$attrs"
        class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-sky-100">
        <option selected hidden disabled value="">
            Select status
        </option>

        <slot></slot>

        <option v-for="option in options" :key="option" :value="option">
            {{ option }}
        </option>
    </select>
</template>