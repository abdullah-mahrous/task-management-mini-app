import { ref, watch, type Ref } from "vue";

// a normal debounce method nothing fancy
export function useDebounce<T>(input: Ref<T>, delay = 300) {
    const debouncedValue = ref(input.value) as Ref<T>;

    let timeout: ReturnType<typeof setTimeout>;

    watch(input, newValue => {
        clearTimeout(timeout);

        timeout = setTimeout(() => debouncedValue.value = newValue, delay);
    });

    return debouncedValue;
}