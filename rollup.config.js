import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const isProd = process.env.BUILD === 'production';

export default [
  // Browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'solarLunar',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [resolve(), commonjs(), isProd && terser()].filter(Boolean),
  },

  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [resolve(), commonjs()],
  },

  // ES module build
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs()],
  },
];
