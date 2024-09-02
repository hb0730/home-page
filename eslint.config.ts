import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
  },
  rules: {
    // 允许使用未定义变量
    'no-undef': 'off',
    // 允许使用console
    'no-console': 'off',
    // 允许使用process
    'node/prefer-global/process': 'off',
  },
}, {
  ignores: [
    '.github',
    'dist',
    'node_modules',
  ],
})