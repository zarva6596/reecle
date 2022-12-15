import eslintPlugin from 'vite-plugin-eslint';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        // eslint-disable-next-line max-len
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap' },
      ],
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@formkit/nuxt', '@pinia/nuxt', 'nuxt-icons', 'nuxt-icon'],
  css: [
    '@/assets/scss/main.scss',
  ],
  vite: {
    plugins: [eslintPlugin()],
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/scss/main.scss"',
        },
      },
    },
  },
  typescript: {
    strict: true,
  },
});
