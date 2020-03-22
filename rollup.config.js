import nodeResolve from 'rollup-plugin-node-resolve';

import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

import commonjs from 'rollup-plugin-commonjs';

import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/app.js',
  output: [
    {
      file: 'dist/js/app.js',
      format: 'iife',
      sourcemap: 'inline'
    },
    {
      file: 'dist/js/app.min.js',
      format: 'iife'
    },
  ],
  plugins: [
    globals(),
    nodeResolve({ browser: true }),
    commonjs(),
    builtins(),
    terser({
      include:  [/^.+\.min\.js$/]
    })
  ]
}
