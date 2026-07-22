import { ref, watch, type Ref } from "vue";

export function useDebounce<T>(input: Ref<T>, delay = 300) {
    const debouncedValue = ref(input.value) as Ref<T>;

    let timeout: ReturnType<typeof setTimeout>;

    watch(input, newValue => {
        clearTimeout(timeout);

        timeout = setTimeout(() => debouncedValue.value = newValue, delay);
    });

    return debouncedValue;
}