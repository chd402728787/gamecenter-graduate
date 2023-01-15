module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    //'@vue/standard',
    //'@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "indent": 0,
    'no-multiple-empty-lines': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "vue/no-unused-components":"off",
    "vue/require-v-for-key":"off",
    "vue/no-unused-vars":"off",
    "indent": ['off', 2],
    'semi': 0,
    "space-before-function-paren": 0
  }
}
