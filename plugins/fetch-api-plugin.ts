import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin({
  setup() {
    const baseApiProvider = $fetch.create({
      baseURL: '/data-api',
    });

    return {
      provide: {
        api: baseApiProvider,
      },
    };
  },
});
