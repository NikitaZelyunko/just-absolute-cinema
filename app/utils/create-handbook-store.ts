import { useAsyncData } from '#app';
import { defineStore } from 'pinia';
import { computed, ref, type ComputedRef, type Ref } from 'vue';

export function createHandbookStore<T extends { oid: string }, N extends string>({
  getHandbookValues,
  handbookName,
}: {
  getHandbookValues: () => Promise<T[]>;
  handbookName: N;
}) {
  type Values = Record<N, Ref<T[]>>;
  type ValuesMap = Record<`${N}Map`, ComputedRef<Map<string, T>>>;
  type GetAsyncValues = Record<`getAsync${Capitalize<N>}`, () => Promise<ComputedRef<Map<string, T>>>>;

  type ReturnStoreValue = Values & ValuesMap & GetAsyncValues;
  return defineStore<`${N}-store`, ReturnStoreValue>(`${handbookName}-store`, () => {
    const handbookValues = ref<T[]>([]) as Ref<T[]>;

    async function initHandbookValues() {
      try {
        const { data: valuesResponse } = await useAsyncData(() => getHandbookValues());
        handbookValues.value = valuesResponse.value ?? [];
      } catch {
        handbookValues.value = [];
      }
    }

    const handbookValuesMap = computed(() => {
      return handbookValues.value.reduce((acc, item) => {
        acc.set(item.oid, item as T);
        return acc;
      }, new Map<string, T>());
    });

    async function getHandbookValuesMap() {
      if (!handbookValues.value.length) {
        await initHandbookValues();
      }

      return handbookValuesMap;
    }

    let handbookValuesInitPromise: ReturnType<typeof getHandbookValuesMap> | undefined;

    async function getAsyncHandbookValuesMap() {
      if (!handbookValuesInitPromise) {
        handbookValuesInitPromise = getHandbookValuesMap();
      }

      return handbookValuesInitPromise;
    }

    const capitalizedHandbookName = `${handbookName[0].toUpperCase()}${handbookName.slice(1)}` as Capitalize<N>;

    // TODO вот так лучше не делать, видимо typescript пока не готов, стоит использовать обычные абстрактные названия
    const result: ReturnStoreValue = {
      [handbookName]: handbookValues,
      [`${handbookName}Map`]: handbookValuesMap,
      [`getAsync${capitalizedHandbookName}`]: getAsyncHandbookValuesMap,
    } as ReturnStoreValue;

    return result;
  });
}
