export default {
  input: 'index.js',
  output: [
    {
      file: 'es/index.js',
      format: 'es'
    },
    {
      file: 'lib/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'useMediaQuery'
    }
  ]
};
