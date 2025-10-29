import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseUrl: import.meta.env.BASE_URL,
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
    tsConfig: {
      compilerOptions: {
        strict: true,
        allowJs: false,
      },
    },
  },
  imports: {
    scan: false,
    autoImport: false,
  },

  components: {
    dirs: [],
  },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  css: ['/app/assets/css/main.css'],
  ui: {
    fonts: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    routeRules: {
      '/api/**': {
        proxy: `${import.meta.env.BASE_URL}/**`,
      },
    },
  },
});
