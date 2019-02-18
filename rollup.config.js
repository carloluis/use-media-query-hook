export default {
  input: 'index.js',
  output: [
    // ES
    {
      file: 'es/index.js',
      format: 'esm'
    },
    // CommonJS
    {
      file: 'lib/index.js',
      format: 'cjs'
    },
    // UMD
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'useMediaQuery',
      globals: {
        react: 'React'
      }
    },
  ],
  external: ['react']
};
