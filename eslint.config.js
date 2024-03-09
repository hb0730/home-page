import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: true,
    html: true,
  },
  typescript: true,
  vue: true,
  rules: {
    'eslint-comments/no-unused-enable': 1,
  },
})
