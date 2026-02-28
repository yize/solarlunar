export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: '> 0.25%, not dead',
          node: '14'
        },
        modules: false
      }
    ]
  ]
};