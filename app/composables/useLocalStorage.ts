import { onUnmounted, ref, watch } from 'vue';

export function useLocalStorage<T extends { toString(): string }>(key: string, initialValue: T) {
  function changeStorage(newValue: T) {
    window.localStorage.setItem(key, JSON.stringify(newValue));
  }

  function getParsedValue(serializedValue: string | null): T | null {
    if (serializedValue === null) {
      return null;
    }
    try {
      const parsedValue = JSON.parse(serializedValue);
      return parsedValue;
    } catch {
      return null;
    }
  }

  function getValueFromStorage() {
    const currentValue = window.localStorage.getItem(key);
    return getParsedValue(currentValue);
  }

  const innerValue = ref(initialValue);

  function changeInnerValue(newValue: T | null) {
    innerValue.value = newValue ?? initialValue;
  }

  function initInnerValue() {
    const valueFromStorage = getValueFromStorage();
    if (valueFromStorage === null) {
      changeStorage(initialValue);
    }
    changeInnerValue(valueFromStorage);
  }

  let changeFromStorageEvent = false;
  watch(
    innerValue,
    () => {
      if (changeFromStorageEvent) {
        changeFromStorageEvent = false;
        return;
      }
      changeStorage(innerValue.value);
    },
    { deep: true },
  );

  function storageChange(event: StorageEvent) {
    const parsedValue = getParsedValue(event.newValue ?? '');
    changeFromStorageEvent = true;
    changeInnerValue(parsedValue);
  }

  if (window) {
    initInnerValue();
    window.addEventListener('storage', storageChange);
  }

  onUnmounted(() => {
    window.removeEventListener('storage', storageChange);
  });

  return innerValue;
}
