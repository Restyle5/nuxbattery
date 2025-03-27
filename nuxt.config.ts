// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  // This would be a better way to handle route rules for production
  app: {
    head: {
      link: [
        // Bootstrap CSS
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'
        }
      ],
      script: [
        // Bootstrap JS (including Popper.js)
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',
          type: 'text/javascript',
          defer: true
        }
      ]
    },
  },

  // runtimeConfig is correctly placed here for environment variables
  runtimeConfig: {
    
    apiSecret: '',
    public: {
      apiBase: '/api'
    }
  },
})
