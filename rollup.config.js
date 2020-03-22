import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js']
const version = process.env.VERSION || require('./package.json').version
const banner =
  `/**
 * Magna v${version} (https://github.com/coredna/magna)
 * Copywrite ${new Date().getFullYear()} Andrew Fountain
 * Released under the MIT license 
 */`
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/magna.umd.js',
      format: 'iife',
      name: 'magna',
      sourcemap: true,
      exports: 'named',
      banner,
    },
    {
      file: 'dist/magna.umd.min.js',
      format: 'iife',
      name: 'magna',
      exports: 'named',
      banner,
      plugins: [
        terser()
      ]
    },
    {
      file: 'dist/magna.common.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    {
      file: 'dist/magna.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
      banner,
    },
  ],
  external: [],
  plugins: [
    resolve({
      extensions,
      preferBuiltIns: true,
    }),
    cleanup(),
    babel({
      extensions,
      exclude: ['node_modules/**']
    }),
    commonjs(),
  ]
};
