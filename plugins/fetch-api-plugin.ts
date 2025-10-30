import { defineNuxtPlugin, useRuntimeConfig } from '#app';

export default defineNuxtPlugin({
  setup() {
    const baseApiProvider = $fetch.create({
      // baseURL: useRuntimeConfig().public.baseUrl ?? '/api',
      baseURL: '/data-api',
    });

    return {
      provide: {
        api: baseApiProvider,
      },
    };
  },
});
